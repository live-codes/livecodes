import { confirm, input, select } from '@inquirer/prompts';
import conventionalChangelog from 'conventional-changelog';

import fs from 'fs';
import { execSync } from 'child_process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const appPkgPath = '../package.json';
const sdkPkgPath = '../src/sdk/package.sdk.json';
const changelogPath = '../CHANGELOG.md';

const appPkg = require(appPkgPath);
const sdkPkg = require(sdkPkgPath);

const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\n/g, '');
if (gitBranch !== 'develop') {
  console.log('Can only start a release from branch: develop');
  process.exit(1);
}

const gitStatus = execSync('git status -s').toString().replace(/\n/g, '').trim();
if (gitStatus) {
  console.log('Please commit changes before starting a release.');
  process.exit(1);
}

const getSDKVersion = () =>
  input({
    message: 'Please specify the new SDK version:',
    validate(value) {
      const parts = value.split('.');
      if (parts.length !== 3) return false;
      for (const part of parts) {
        if (isNaN(Number(part))) return false;
      }
      return true;
    },
  });

const bumpSDKVersion = (sdkBump) => {
  if (!sdkBump) return;
  let [major, minor, patch] = sdkPkg.version.split('.');
  if (sdkBump === 'major') {
    major = String(Number(major) + 1);
    minor = '0';
    patch = '0';
  }
  if (sdkBump === 'minor') {
    minor = String(Number(minor) + 1);
    patch = '0';
  }
  if (sdkBump === 'patch') {
    patch = String(Number(patch) + 1);
  }
  return `${major}.${minor}.${patch}`;
};

const getReleaseTarget = () =>
  select({
    message: 'Create a release for:',
    choices: [
      {
        name: 'App',
        value: 'app',
      },
      {
        name: 'SDK',
        value: 'sdk',
      },
      {
        name: 'Cancel',
        value: 'cancel',
      },
    ],
  });

const getSDKBump = () =>
  select({
    message: 'SDK version upgrade:',
    choices: [
      {
        name: 'Major',
        value: 'major',
      },
      {
        name: 'Minor',
        value: 'minor',
      },
      {
        name: 'Patch',
        value: 'patch',
      },
      {
        name: 'Specify version',
        value: 'specify',
      },
    ],
  });

const stringify = (obj) => JSON.stringify(obj, null, 2) + '\n';

const cancelRelease = async () => {
  if (await confirm({ message: 'Cancelling release. Do you want to discard all changes?' })) {
    execSync(`git reset --hard && git clean -fxd`);
  }
  console.log('Release cancelled!');
  process.exit(1);
};

(async () => {
  const releaseTarget = await getReleaseTarget();

  if (releaseTarget === 'cancel') {
    await cancelRelease();
  }

  let version;
  if (releaseTarget === 'sdk') {
    const sdkBump = await getSDKBump();
    const sdkVersion = sdkBump === 'specify' ? await getSDKVersion() : bumpSDKVersion(sdkBump);
    sdkPkg.version = sdkVersion;
    if (!(await confirm({ message: `Creating SDK version: ${sdkVersion}\nProceed?` }))) {
      await cancelRelease();
    }
    fs.writeFileSync(new URL(sdkPkgPath, import.meta.url), stringify(sdkPkg), 'utf8');
    version = 'sdk-v' + sdkVersion;
  }

  if (releaseTarget === 'app') {
    const appVersion = String(Number(appPkg.appVersion) + 1);
    appPkg.appVersion = appVersion;
    if (!(await confirm({ message: `Creating App version: ${appVersion}\nProceed?` }))) {
      await cancelRelease();
    }
    fs.writeFileSync(new URL(appPkgPath, import.meta.url), stringify(appPkg), 'utf8');
    version = 'v' + appVersion;
  }

  const branchName = 'releases/' + version;

  const changelog = fs.readFileSync(new URL(changelogPath, import.meta.url), 'utf8');
  const changelogSeparator = '\n---';
  const [changelogHeader, ...prevLogs] = changelog.split(changelogSeparator);

  const releaseChangelog = await streamToString(
    conventionalChangelog({
      preset: 'angular',
    }),
  ).then((str) => {
    return '\n\n#' + str.replace('[0.0.0]', `[${version}]`).replace('v0.0.0', `${version}`);
  });

  const newChangelog = [changelogHeader, releaseChangelog, ...prevLogs].join(changelogSeparator);
  fs.writeFileSync(new URL(changelogPath, import.meta.url), newChangelog, 'utf8');

  if (!(await confirm({ message: `Change log added to ./CHANGELOG.md\nProceed?` }))) {
    await cancelRelease();
  }

  execSync(`git checkout -b ${branchName}`);
  execSync(`git add -A && git commit -m "release: ${version}"`);
  execSync(`git push -u origin ${branchName}`);
})();

function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}
