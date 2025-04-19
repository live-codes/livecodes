import { csharpWasm } from '../../vendors';

interface BlazorAPI {
  [key: string]: any;
  start: (options: any) => Promise<void>;
}

declare global {
  interface Window {
    DotNet: any;
    Blazor: BlazorAPI;
    livecodes: any;
    csharpInitialized?: boolean;
  }
}

// simple logger impl to avoid eslint issues
class LogService {
  public warn(...args: any[]): void { window.console.warn(...args); }
  public info(...args: any[]): void { window.console.log(...args); }
  public error(...args: any[]): void { window.console.error(...args); }
}
const logger = new LogService();

if (!window.livecodes) window.livecodes = {};

livecodes.csharp = livecodes.csharp || {};
livecodes.csharp.blazorReady = false;
livecodes.csharp.initializationPromise = null;
livecodes.csharp.loadedResources = [];
livecodes.csharp.input = '';
livecodes.csharp.output = null;

const INIT_FLAG_KEY = 'csharp_wasm_initialized';
const hasInitializedBefore = () => {
  try {
    return localStorage.getItem(INIT_FLAG_KEY) === 'true';
  } catch (e) {
    return window.csharpInitialized === true;
  }
};

const markAsInitialized = () => {
  try {
    localStorage.setItem(INIT_FLAG_KEY, 'true');
  } catch (e) {
    window.csharpInitialized = true;
  }
};

function waitFor(condition: () => boolean, timeout = 10000): Promise<boolean> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const check = () => {
      if (condition()) resolve(true);
      else if (Date.now() - startTime > timeout) resolve(false);
      else setTimeout(check, 100);
    };
    check();
  });
}

// check if blazor is started
function isBlazorStarted(): boolean {
  if (!window.Blazor) return false;
  
  try {
    const internal = window.Blazor.internal || 
      window.Blazor[Object.getOwnPropertyNames(window.Blazor)
        .find(p => p === 'internal' || p === '_internal') || ''];
        
    return !!(internal && (
      typeof internal.invokeJSFromDotNet === 'function' || 
      typeof internal.attachDispatcher === 'function'
    ));
  } catch {
    return false;
  }
}

async function initializeBlazor() {
  if (livecodes.csharp.initializationPromise) {
    return livecodes.csharp.initializationPromise;
  }

  const isFirstInit = !hasInitializedBefore();
  livecodes.csharp.initializationPromise = (async () => {
    if (livecodes.csharp.blazorReady) return;

    try {
      if (isFirstInit) {
        logger.info('Initializing C# environment...');
      }

      const originalFetch = window.fetch;
      window.fetch = (resource, init = {}) => 
        originalFetch(resource, { ...init, credentials: 'omit' as RequestCredentials });

      if (!window.Blazor) {
        await loadBlazorScript();
      }
      
      if (!window.Blazor) {
        throw new Error('Blazor failed to load properly');
      }


      if (!isBlazorStarted()) {
        try {
          await window.Blazor.start({
            loadBootResource(_type: string, name: string) {
              const resourceUrl = `${csharpWasm}_framework/${name}`;
              livecodes.csharp.loadedResources.push({ name, url: resourceUrl });
              return resourceUrl;
            },
          });
        } catch (err) {
          if (!((err as Error).message || '').includes('already started')) {
            throw err;
          }
        }
      }

      // wait for DOTNET
      if (!await waitFor(() => window.DotNet && typeof window.DotNet.invokeMethodAsync === 'function')) {
        throw new Error('Timeout waiting for DotNet to be ready');
      }

      await new Promise(resolve => setTimeout(resolve, 300));

      if (isFirstInit) {
        logger.info('C# environment initialized successfully');
      }
      
      livecodes.csharp.blazorReady = true;
      markAsInitialized();
    } catch (err) {
      logger.error('Failed to initialize C# environment:', err);
      livecodes.csharp.blazorReady = false;
      livecodes.csharp.initializationPromise = null;
      throw err;
    }
  })();

  return livecodes.csharp.initializationPromise;
}

function loadBlazorScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="blazor.webassembly.js"]')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `${csharpWasm}_framework/blazor.webassembly.js`;
    script.setAttribute('autostart', 'false');
    script.onload = () => resolve();
    script.onerror = (err) => reject(new Error(`Failed to load Blazor script: ${err}`));
    document.head.appendChild(script);
  });
}

async function runCSharpCode(code: string, input = '') {
  try {
    await initializeBlazor();
    if (!livecodes.csharp.blazorReady) {
      throw new Error('C# environment is not ready yet');
    }
    
    const result = await window.DotNet.invokeMethodAsync('MyRunnyApp', 'RunCode', code, input);
    const output = result.output || result.errors || '';
    
    if (output) {
      logger.info(output);
    }
    
    livecodes.csharp.output = output;
    return output;
  } catch (err) {
    const errorMsg = 'Error: ' + (err as Error).message;
    logger.error('Error running C# code:', errorMsg);
    return errorMsg;
  }
}

livecodes.csharp.run = async (customInput?: string) => {
  let code = '';
  document.querySelectorAll('script[type="text/csharp-wasm"]')
    .forEach(script => code += script.innerHTML + '\n');

  const input = customInput !== undefined ? customInput : livecodes.csharp.input;
  const result = await runCSharpCode(code, input);
  
  return { output: result, error: null, exitCode: 0 };
};

// tracking loaded state
livecodes.csharp.loaded = new Promise<void>(resolve => {
  const interval = setInterval(() => {
    if (livecodes.csharp.blazorReady) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  
  try {
    let code = '';
    document.querySelectorAll('script[type="text/csharp-wasm"]')
      .forEach(script => code += script.innerHTML + '\n');
      
    if (code.trim()) {
      await livecodes.csharp.run(livecodes.csharp.input);
      livecodes.csharp.ready = true;
    }
  } catch (err) {
    logger.error('Error running C# code:', err);
  } finally {
    parent.postMessage({ type: 'loading', payload: false }, '*');
  }
});
