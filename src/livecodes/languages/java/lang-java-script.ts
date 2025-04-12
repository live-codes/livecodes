// @ts-nocheck
/* eslint-disable no-console */

import { createWorkerFromContent } from '../../utils/utils';
import { doppioJvmBaseUrl, browserfsUrl } from '../../vendors';

const doppioJvmUrl = doppioJvmBaseUrl + 'doppio.js';
const doppioJvmJarsUrl = doppioJvmBaseUrl + 'java_home/';

// Java Worker Source
const getWorkerSrc = () => `
      var window = self;

      // overriding annoying ZipFS warnings
      const originalWarn = console.warn;
      console.warn = function(message) {
        if (message && message.includes("ZipFS")) {
          return;
        }
        originalWarn.apply(console, arguments);
      };
      const originalLog = console.log;
      console.log = function(message) {
        if (message && message.includes("@stu")) {
          return;
        }
        originalLog.apply(console, arguments);
      };

      // loading BrowserFS
      importScripts('${browserfsUrl}');
      importScripts('${doppioJvmUrl}');

      function createDir(fs, path) {
        const parts = path.split('/').filter(Boolean);
        let current = '';
        for (const part of parts) {
          current += \`/\${part}\`;
          if (!fs.existsSync(current)) fs.mkdirSync(current);
        }
      }

      async function initFS() {
        BrowserFS.install(self);
        const mfs = new BrowserFS.FileSystem.MountableFileSystem();
        BrowserFS.initialize(mfs);
        mfs.mount('/tmp', new BrowserFS.FileSystem.InMemory());
        mfs.mount('/release', new BrowserFS.FileSystem.InMemory());

        const fs = BrowserFS.BFSRequire('fs');
        self.javaFS = { fs };

        createDir(fs, '/release/vendor/java_home/lib');
        createDir(fs, '/release/vendor/natives');

        // load essential JAR files
        const jarBaseUrl = '${doppioJvmJarsUrl}';
        const jars = ['doppio.jar', 'rt.jar', 'tools.jar', 'jce.jar', 'charsets.jar', 'currency.data'];
        await Promise.all(jars.map(async jar => {
          try {
            const response = await fetch(\`\${jarBaseUrl}\${jar}\`);
            if (!response.ok) throw new Error(\`Failed to fetch \${jar}: \${response.status}\`);
            const buffer = await response.arrayBuffer();
            fs.writeFileSync(\`/release/vendor/java_home/lib/\${jar}\`, Buffer.from(buffer));
            // console.log(\`loaded \${jar}\`);
          } catch (e) {
            console.error(\`error loading \${jar}: \${e.message}\`);
          }
        }));
      }

      const initialize = initFS();
      initialize.then(() => {
        postMessage({ initialized: true });
      });

      // Run Java code
      let lastCode = null;
      let lastClassName = null;

      const runCode = async (code, input) => {
        let output = null;
        let error = null;
        let exitCode = 0;

        try {
          await initialize;

          const fs = self.javaFS.fs;
          const process = BrowserFS.BFSRequire('process');

          const className = (code.match(/public\\s+class\\s+(\\w+)/)?.[1]) || 'Main';
          const filePath = \`/tmp/\${className}.java\`;
          const classFilePath = \`/tmp/\${className}.class\`;

          const shouldCompile = lastCode !== code || lastClassName !== className || !fs.existsSync(classFilePath);

          if (shouldCompile) {
            if (fs.existsSync('/tmp')) fs.readdirSync('/tmp').forEach(f => fs.unlinkSync(\`/tmp/\${f}\`));
            // console.log('Cleared /tmp directory');

            fs.writeFileSync(filePath, code);
            // console.log(\`Wrote source to \${filePath}\`);
            // console.log('Files in /tmp after writing:', fs.readdirSync('/tmp'));

            const classpath = '/release/vendor/java_home/lib/doppio.jar:/release/vendor/java_home/lib/rt.jar:/release/vendor/java_home/lib/tools.jar:/release/vendor/java_home/lib/jce.jar:/release/vendor/java_home/lib/charsets.jar';
            let compileOutput = '';

            process.stdout.removeAllListeners('data');
            process.stderr.removeAllListeners('data');
            process.stdout.on('data', data => compileOutput += data.toString());
            process.stderr.on('data', data => compileOutput += data.toString());

            const compileExitCode = await new Promise(resolve => {
              self.Doppio.VM.CLI(
                ['-classpath', classpath, 'com.sun.tools.javac.Main', filePath],
                {
                  doppioHomePath: '/release',
                  javaHomePath: '/release/vendor/java_home',
                  nativeClasspath: ['/release/vendor/natives'],
                },
                resolve
              );
            });

            // console.log('Compilation exit code:', compileExitCode);
            // console.log('Compilation output:', compileOutput);
            // console.log('files in /tmp after compilation:', fs.readdirSync('/tmp'));

            if (compileExitCode !== 0) {
              throw new Error(\`Compilation failed with exit code \${compileExitCode}. Output: \${compileOutput}\`);
            }

            if (!fs.existsSync(classFilePath)) {
              throw new Error(\`class file \${classFilePath} not found after compilation\`);
            }

            lastCode = code;
            lastClassName = className;
          } else {
            // console.log('Skipping compilation: Code unchanged and .class file exists');
          }

          let output = '';
          process.stdout.removeAllListeners('data');
          process.stderr.removeAllListeners('data');
          process.stdout.on('data', data => {
            output += data.toString();
          });
          process.stderr.on('data', data => {
            output += data.toString();
          });
          if (input) {
            process.stdin.write(input);
          }

          const runExitCode = await new Promise(resolve => {
            self.Doppio.VM.CLI(
              ['-classpath', '/tmp', className],
              {
                doppioHomePath: '/release',
                javaHomePath: '/release/vendor/java_home',
                nativeClasspath: ['/release/vendor/natives'],
              },
              resolve
            );
          });

          // console.log('Run exit code:', runExitCode);
          // console.log('Final output:', output);
          return { input, output, error, exitCode: runExitCode };
        } catch (err) {
          error = err.message ?? err;
          exitCode = err.code ?? 1;
          return { input, output, error, exitCode };
        }
      };

      addEventListener('message', async (e) => {
        const code = e.data.code;
        const input = e.data.input;
        const result = code.trim() ? await runCode(code, input) : {};
        postMessage(result);
      });

      postMessage({ loaded: true });
    `;

// Java API
livecodes.java = livecodes.java || {};
livecodes.java.run =
  livecodes.java.run ||
  ((input = '') =>
    new Promise((resolve) => {
      let code = '';
      livecodes.java.input = input;
      livecodes.java.output = null;
      const scripts = document.querySelectorAll('script[type="text/java"]');
      scripts.forEach((script) => (code += script.innerHTML + '\n'));
      livecodes.java.worker.onmessage = function (e) {
        if (e.data.loaded) {
          livecodes.java.worker.loaded = true;
          return;
        }
        if (e.data.initialized) {
          console.log('Java environment initialized successfully.');
          return;
        }
        const result = e.data;
        if (result.error != null) {
          console.error(result.error);
        } else if (result.output != null) {
          console.log(result.output);
        }
        livecodes.java.input = result.input;
        livecodes.java.output = result.output;
        livecodes.java.error = result.error;
        livecodes.java.exitCode = result.exitCode;
        livecodes.java.ready = true;
        resolve(result);
      };

      livecodes.java.worker.postMessage({ code, input: `${String(input ?? '')}\n` });
    }));

livecodes.java.loaded = new Promise<void>(async function (resolve) {
  const i = setInterval(() => {
    if (livecodes.java.ready) {
      clearInterval(i);
      return resolve();
    }
  }, 50);
});

// initialize and run
window.addEventListener('load', async () => {
  livecodes.java.ready = false;
  parent.postMessage({ type: 'loading', payload: true }, '*');
  const workerSrc = await getWorkerSrc();
  const init = () => {
    if (livecodes.java.worker) return;
    console.log('Initializing Java environment...');
    livecodes.java.worker = createWorkerFromContent(workerSrc);
  };
  init();
  const result = await livecodes.java.run(livecodes.java.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
