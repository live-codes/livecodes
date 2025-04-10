// Java Web Worker implementation
console.log('Java Worker initializing');

// Global configuration
const CONFIG = {
  TIMEOUT: {
    COMPILATION: 120000, // 2 minutes
    EXECUTION: 120000,   // 2 minutes
  },
  ESSENTIAL_JARS: [
    'lib/doppio.jar',
    'lib/rt.jar',
    'lib/tools.jar',
  ],
  OPTIONAL_JARS: [
    'lib/charsets.jar',
    'lib/jce.jar',
    'lib/currency.data',
  ],
  JAR_PATH_OPTIONS: [
    'http://127.0.0.1:8080/livecodes/assets/release/vendor/java_home/',
    'https://livecodes-sandbox.pages.dev/livecodes/assets/release/vendor/java_home/',
    'livecodes/assets/release/vendor/java_home/',
    '/livecodes/assets/release/vendor/java_home/'
  ]
};

// Debug logging helper
function debugLog(...args) {
  console.log('[JAVA-WORKER-DEBUG]', ...args);
}

// Load required libraries
async function loadScript(url) {
  try {
    debugLog(`Loading script: ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}: ${response.statusText}`);
    const content = await response.text();
    // Safe to eval in a Worker context
    eval(content);
    debugLog(`Successfully loaded script: ${url}`);
    return true;
  } catch (error) {
    debugLog(`Error loading script ${url}:`, error);
    return false;
  }
}

// Initialize the filesystem
async function initFS() {
  debugLog('Initializing filesystem');
  
  // Install BrowserFS global
  BrowserFS.install(self);
  
  // Create mountable filesystem
  const mfs = new BrowserFS.FileSystem.MountableFileSystem();
  
  // Initialize with mountable filesystem as root
  BrowserFS.initialize(mfs);
  
  // Mount temporary and release directories
  mfs.mount('/tmp', new BrowserFS.FileSystem.InMemory());
  mfs.mount('/release', new BrowserFS.FileSystem.InMemory());
  
  // Get filesystem module
  const fs = BrowserFS.BFSRequire('fs');
  
  // Create necessary directories
  createDirectories(fs, [
    '/release/vendor',
    '/release/vendor/java_home',
    '/release/vendor/java_home/lib',
    '/release/vendor/natives'
  ]);
  
  // Copy Java home files
  await copyJavaHomeToBrowserFS(fs);
  
  return fs;
}

// Create directories recursively
function createDirectories(fs, paths) {
  for (const path of paths) {
    try {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
        debugLog(`Created directory: ${path}`);
      }
    } catch (e) {
      debugLog(`Error creating directory ${path}:`, e);
    }
  }
}

// Download and copy Java files
async function copyJavaHomeToBrowserFS(fs) {
  debugLog('Copying Java files to BrowserFS');
  
  const baseUrl = await findWorkingBaseUrl();
  if (!baseUrl) {
    throw new Error('Could not find a working base URL for JAR files');
  }
  
  // Copy essential JAR files
  let essentialJarsLoaded = 0;
  for (const jar of CONFIG.ESSENTIAL_JARS) {
    const success = await copyFile(fs, `${baseUrl}${jar}`, `/release/vendor/java_home/${jar}`);
    if (success) essentialJarsLoaded++;
  }
  
  if (essentialJarsLoaded !== CONFIG.ESSENTIAL_JARS.length) {
    throw new Error(`Failed to load all essential JAR files. Only loaded ${essentialJarsLoaded}/${CONFIG.ESSENTIAL_JARS.length}`);
  }
  
  // Copy optional JAR files
  for (const jar of CONFIG.OPTIONAL_JARS) {
    await copyFile(fs, `${baseUrl}${jar}`, `/release/vendor/java_home/${jar}`, false);
  }
  
  debugLog('Java files copied successfully');
  return true;
}

// Find a working base URL for JAR files
async function findWorkingBaseUrl() {
  for (const baseUrl of CONFIG.JAR_PATH_OPTIONS) {
    try {
      debugLog(`Trying base URL: ${baseUrl}`);
      const response = await fetch(`${baseUrl}${CONFIG.ESSENTIAL_JARS[0]}`);
      if (response.ok) {
        debugLog(`Found working base URL: ${baseUrl}`);
        return baseUrl;
      }
    } catch (e) {
      debugLog(`Base URL ${baseUrl} failed:`, e);
    }
  }
  return null;
}

// Copy a file from URL to BrowserFS
async function copyFile(fs, url, destination, required = true) {
  try {
    debugLog(`Attempting to fetch ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      if (required) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      } else {
        debugLog(`Optional file ${url} not available: ${response.statusText}`);
        return false;
      }
    }
    
    // Create parent directories if they don't exist
    const lastSlash = destination.lastIndexOf('/');
    if (lastSlash > 0) {
      const dir = destination.substring(0, lastSlash);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
    
    // Write file to BrowserFS
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(destination, Buffer.from(buffer));
    
    // Verify file was written
    const stats = fs.statSync(destination);
    debugLog(`File ${destination} size: ${stats.size} bytes`);
    
    return true;
  } catch (error) {
    debugLog(`Error copying file ${url} to ${destination}:`, error);
    if (required) {
      throw error;
    }
    return false;
  }
}

// Compile and run Java code
async function compileAndRun(code, input = '') {
  try {
    debugLog('Starting Java compilation and execution');
    
    // Initialize a fresh filesystem for this run
    const fs = await initFS();
    
    // Extract class name and package
    const packageMatch = code.match(/package\s+([\w.]+);/);
    const packageName = packageMatch ? packageMatch[1] : null;
    
    const classNameMatch = code.match(/public\s+(?:final\s+|abstract\s+)?class\s+(\w+)/);
    const className = classNameMatch ? classNameMatch[1] : 'Main';
    
    debugLog(`Class: ${className}, Package: ${packageName || 'none'}`);
    
    // Setup paths
    const packagePath = packageName ? packageName.replace(/\./g, '/') : null;
    const filePath = packagePath ? `/tmp/${packagePath}/${className}.java` : `/tmp/${className}.java`;
    
    // Create package structure if needed
    if (packagePath) {
      debugLog(`Creating package structure for ${packageName}`);
      const fullPackagePath = `/tmp/${packagePath}`;
      createDirectoryStructure(fs, fullPackagePath);
    }
    
    // Write source code to file
    debugLog(`Writing source code to ${filePath}`);
    fs.writeFileSync(filePath, code);
    
    // Verify file was written
    if (!fs.existsSync(filePath)) {
      throw new Error(`Failed to write source file to ${filePath}`);
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    debugLog(`Verified file contents: ${fileContents.length} bytes`);
    
    // Compile Java code
    debugLog('Compiling Java code');
    const classpath = [
      '/release/vendor/java_home/lib/doppio.jar',
      '/release/vendor/java_home/lib/rt.jar',
      '/release/vendor/java_home/lib/tools.jar'
    ].join(':');
    
    // Set up process for output capturing
    const process = BrowserFS.BFSRequire('process');
    let output = '';
    let errorOutput = '';
    
    // Set up stdout and stderr handlers
    process.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      debugLog(`[STDOUT] ${text}`);
    });
    
    process.stderr.on('data', (data) => {
      const text = data.toString();
      errorOutput += text;
      debugLog(`[STDERR] ${text}`);
    });
    
    // Write input if provided
    if (input) {
      process.stdin.write(input);
    }
    
    // Run the compiler
    const compileExitCode = await new Promise((resolve, reject) => {
      const compilationTimeout = setTimeout(() => {
        debugLog('Compilation timed out');
        reject(new Error('Compilation timed out after 2 minutes'));
      }, CONFIG.TIMEOUT.COMPILATION);
      
      try {
        debugLog('Starting compiler with classpath:', classpath);
        Doppio.VM.CLI(
          ['-classpath', classpath, 'com.sun.tools.javac.Main', filePath],
          {
            doppioHomePath: '/release',
            javaHomePath: '/release/vendor/java_home',
            nativeClasspath: ['/release/vendor/natives'],
          },
          (exitCode) => {
            clearTimeout(compilationTimeout);
            debugLog(`Compilation finished with exit code: ${exitCode}`);
            resolve(exitCode);
          }
        );
      } catch (error) {
        clearTimeout(compilationTimeout);
        debugLog('Compilation error:', error);
        reject(error);
      }
    });
    
    // Check compilation result
    if (compileExitCode !== 0) {
      debugLog('Compilation failed with exit code:', compileExitCode);
      return {
        output: errorOutput || 'Compilation failed',
        error: 'Compilation error',
        exitCode: compileExitCode
      };
    }
    
    // Verify class file was created
    const classFilePath = packagePath
      ? `/tmp/${packagePath}/${className}.class`
      : `/tmp/${className}.class`;
    
    const classFileExists = fs.existsSync(classFilePath);
    debugLog(`Class file exists at ${classFilePath}: ${classFileExists}`);
    
    if (!classFileExists) {
      debugLog('Class file not found after compilation');
      return {
        output: 'Compilation succeeded but class file not found',
        error: 'Class file not found after compilation',
        exitCode: 1
      };
    }
    
    // Find all class files
    const classFiles = findClassFiles(fs, className, packagePath);
    debugLog(`Found ${classFiles.length} class files:`, classFiles);
    
    // Check for main method
    const hasMainMethod = code.includes('public static void main(String');
    debugLog(`Has main method: ${hasMainMethod}`);
    
    if (!hasMainMethod) {
      debugLog('No main method found, cannot execute');
      return {
        output: `Class ${className} compiled successfully, but cannot be executed without a main method.`,
        error: null,
        exitCode: 0
      };
    }
    
    // Execute Java code
    debugLog('Executing Java code');
    const fullClassName = packageName ? `${packageName}.${className}` : className;
    
    // Reset output before execution
    output = '';
    errorOutput = '';
    
    // Run the class
    const runResult = await new Promise((resolve, reject) => {
      const executionTimeout = setTimeout(() => {
        debugLog('Execution timed out');
        reject(new Error('Execution timed out after 2 minutes'));
      }, CONFIG.TIMEOUT.EXECUTION);
      
      try {
        debugLog(`Running class: ${fullClassName}`);
        Doppio.VM.CLI(
          ['-classpath', '/tmp', fullClassName],
          {
            doppioHomePath: '/release',
            javaHomePath: '/release/vendor/java_home',
            nativeClasspath: ['/release/vendor/natives'],
          },
          (exitCode) => {
            clearTimeout(executionTimeout);
            debugLog(`Execution finished with exit code: ${exitCode}`);
            resolve({
              exitCode,
              output: output || 'Program executed successfully but produced no output.',
              error: errorOutput || null
            });
          }
        );
      } catch (error) {
        clearTimeout(executionTimeout);
        debugLog('Execution error:', error);
        reject(error);
      }
    });
    
    // Return the result
    return {
      output: runResult.output,
      error: runResult.error,
      exitCode: runResult.exitCode
    };
  } catch (error) {
    debugLog('Error:', error);
    return {
      output: '',
      error: error.message || String(error),
      exitCode: 1
    };
  }
}

// Create directory structure recursively
function createDirectoryStructure(fs, path) {
  const parts = path.split('/').filter(Boolean);
  let currentPath = '';
  
  for (const part of parts) {
    currentPath += '/' + part;
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
      debugLog(`Created directory: ${currentPath}`);
    }
  }
}

// Find all class files
function findClassFiles(fs, className, packagePath) {
  const basePath = packagePath ? `/tmp/${packagePath}` : '/tmp';
  if (!fs.existsSync(basePath)) {
    return [];
  }
  
  const classFiles = [];
  const files = fs.readdirSync(basePath);
  
  for (const file of files) {
    if (file.endsWith('.class')) {
      classFiles.push(`${basePath}/${file}`);
    }
  }
  
  return classFiles;
}

// Initialize the worker
(async function() {
  debugLog('Loading dependencies');
  
  // Load BrowserFS
  const browserFsLoaded = await loadScript('https://unpkg.com/browserfs@1.4.3/dist/browserfs.min.js');
  if (!browserFsLoaded) {
    self.postMessage({ error: 'Failed to load BrowserFS' });
    return;
  }
  
  // Load Doppio
  const doppioLoaded = await loadScript('https://unpkg.com/doppiojvm@0.4.2/dist/release/doppio.js');
  if (!doppioLoaded) {
    self.postMessage({ error: 'Failed to load Doppio JVM' });
    return;
  }
  
  debugLog('Dependencies loaded successfully');
  self.postMessage({ status: 'ready' });
})();

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
  const { code, input, action } = event.data;
  
  if (action === 'compile') {
    debugLog('Received compilation request');
    const result = await compileAndRun(code, input);
    self.postMessage({ action: 'result', ...result });
  }
}); 