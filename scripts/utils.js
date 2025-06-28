const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const pkg = require('../package.json');

/** @param {string} dir */
function mkdir(dir) {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir));
  }
}
/** @param {ArrayBuffer | Uint8Array} uint8array */
function uint8arrayToString(uint8array) {
  return Buffer.from(uint8array).toString('utf-8');
}
/** @param {string} code */
function iife(code) {
  return '(function(){' + code.trim() + '\n})();\n';
}

/**
 * @param {Record<string,string>} acc
 * @param {string} cur
 */
function arrToObj(acc, cur) {
  const custom = {
    'src/lib/livecodes.ts': 'livecodes.esm',
    'src/livecodes/templates/starter/index.ts': 'templates',
  };
  const path = cur.split('/');
  const out = cur in custom ? custom[cur] : path[path.length - 1].replace('.ts', '');
  return {
    ...acc,
    [out]: cur,
  };
}

const getFileNames = async (dir) =>
  (await fs.promises.readdir(dir)).filter((name) => !fs.statSync(dir + name).isDirectory());

const getVars = (/** @type {boolean} */ devMode) => {
  const appVersion = pkg.appVersion;
  const sdkVersion = require('../src/sdk/package.sdk.json').version;
  const gitCommit = childProcess
    .execSync('git rev-parse --short=7 HEAD')
    .toString()
    .replace(/\n/g, '');
  let repoUrl = pkg.repository.url;
  if (repoUrl.endsWith('/')) {
    repoUrl = repoUrl.slice(0, -1);
  }
  const docsBaseUrl =
    process.env.DOCS_BASE_URL === 'null'
      ? 'https://livecodes.io/docs/'
      : process.env.DOCS_BASE_URL || (devMode ? 'http://localhost:3000/docs/' : '/docs/');
  const CI = process.env.CI || false;
  const selfHosted = String(process.env.SELF_HOSTED) === 'true';
  const selfHostedShare = String(process.env.SELF_HOSTED_SHARE) === 'true';
  const selfHostedBroadcast = String(process.env.SELF_HOSTED_BROADCAST) === 'true';
  const selfHostedBroadcastPort = Number(process.env.BROADCAST_PORT) || 3030;
  const selfHostedSandboxHostName = process.env.SANDBOX_HOST_NAME || 'localhost';
  const selfHostedSandboxPort = Number(process.env.SANDBOX_PORT) || 8090;
  const firebaseConfig = process.env.FIREBASE_CONFIG || 'null';
  return {
    appVersion,
    sdkVersion,
    gitCommit,
    repoUrl,
    docsBaseUrl,
    CI,
    selfHosted,
    selfHostedShare,
    selfHostedBroadcast,
    selfHostedBroadcastPort,
    firebaseConfig,
    selfHostedSandboxHostName,
    selfHostedSandboxPort,
  };
};

const getEnvVars = (/** @type {boolean} */ devMode) => {
  const {
    appVersion,
    sdkVersion,
    gitCommit,
    repoUrl,
    docsBaseUrl,
    CI,
    selfHosted,
    selfHostedShare,
    selfHostedBroadcast,
    selfHostedBroadcastPort,
    firebaseConfig,
    selfHostedSandboxHostName,
    selfHostedSandboxPort,
  } = getVars(devMode);
  return {
    'process.env.VERSION': `"${appVersion || ''}"`,
    'process.env.SDK_VERSION': `"${sdkVersion || ''}"`,
    'process.env.GIT_COMMIT': `"${gitCommit || ''}"`,
    'process.env.REPO_URL': `"${repoUrl || ''}"`,
    'process.env.DOCS_BASE_URL': `"${docsBaseUrl}"`,
    'process.env.CI': `${CI}`,
    'process.env.SELF_HOSTED': `${selfHosted}`,
    'process.env.SELF_HOSTED_SHARE': `${selfHostedShare}`,
    'process.env.SELF_HOSTED_BROADCAST': `${selfHostedBroadcast}`,
    'process.env.BROADCAST_PORT': `${selfHostedBroadcastPort}`,
    'process.env.SANDBOX_HOST_NAME': `"${selfHostedSandboxHostName}"`,
    'process.env.SANDBOX_PORT': `${selfHostedSandboxPort}`,
    'process.env.FIREBASE_CONFIG': `${firebaseConfig}`,
    define: 'undefined', // prevent using AMD (e.g. in lz-string),
  };
};

module.exports = { arrToObj, mkdir, uint8arrayToString, iife, getFileNames, getEnvVars };
