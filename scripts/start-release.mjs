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
const originalAppVersion = appPkg.appVersion;
const sdkPkg = require(sdkPkgPath);
const originalSDKVersion = sdkPkg.version;

let releaseTarget;

const stringify = (obj) => JSON.stringify(obj, null, 2) + '\n';

const confirmCancel = async (continueFn) => {
  if (await confirm({ message: 'Do you want to cancel release and discard all changes?' })) {
    execSync(`git reset --hard`);
    console.log('Release cancelled!');
    process.exit(1);
  }
  return continueFn();
};

const checkIsDevelop = () => {
  const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\n/g, '');
  if (gitBranch !== 'develop') {
    console.log('A release can only be started from the branch: develop');
    process.exit(1);
  }
};

const checkIsClean = () => {
  const gitStatus = execSync('git status -s').toString().replace(/\n/g, '').trim();
  if (gitStatus) {
    console.log('Please commit changes before starting a release.');
    process.exit(1);
  }
};

const performChecks = async () => {
  checkIsDevelop();
  checkIsClean();
};

const selectReleaseTarget = async () => {
  releaseTarget = await select({
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
  if (releaseTarget === 'cancel') {
    return confirmCancel(selectReleaseTarget);
  }
};

const bumpSDKVersion = (oldSDKVersion, sdkBump) => {
  if (!sdkBump) return;
  let [major, minor, patch] = oldSDKVersion.split('.');
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

const specifyAppVersion = () =>
  input({
    message: 'Please specify the new App version:',
    validate(value) {
      const version = value.startsWith('v') ? value.slice(1) : value;
      if (isNaN(Number(version))) return false;
      return Number(version) > Number(originalAppVersion);
    },
  });

const specifySDKVersion = () =>
  input({
    message: 'Please specify the new SDK version:',
    validate(value) {
      const version = value.startsWith('v')
        ? value.slice(1)
        : value.startsWith('sdk-v')
          ? value.slice(5)
          : value;
      const parts = version.split('.');
      if (parts.length !== 3) return false;
      for (const part of parts) {
        if (isNaN(Number(part))) return false;
      }
      const originalVersionParts = originalSDKVersion.split('.');
      if (Number(parts[0]) > Number(originalVersionParts[0])) return true;
      if (Number(parts[1]) > Number(originalVersionParts[1])) return true;
      if (Number(parts[2]) > Number(originalVersionParts[2])) return true;
      return false;
    },
  });

const getAppBump = async () => {
  const suggestedBump = String(Number(originalAppVersion) + 1);
  const bump = await select({
    message: `App version upgrade: (current: ${originalAppVersion})`,
    default: suggestedBump,
    choices: [
      {
        name: suggestedBump,
        value: suggestedBump,
      },
      {
        name: 'Specify version',
        value: 'specify',
      },
      {
        name: 'Cancel',
        value: 'cancel',
      },
    ],
  });
  if (bump === 'cancel') {
    return confirmCancel(getAppBump);
  }
  return bump;
};

const getSDKBump = async (releaseNotes) => {
  const suggestedBump = releaseNotes.includes('### BREAKING CHANGES')
    ? 'major'
    : releaseNotes.includes('### Features')
      ? 'minor'
      : 'patch';
  const hint =
    suggestedBump === 'major'
      ? ' (has breaking changes!)'
      : suggestedBump === 'minor'
        ? ' (includes new feature(s))'
        : '';

  const bump = await select({
    message: `Library version upgrade:${hint}`,
    default: suggestedBump,
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
      {
        name: 'Cancel',
        value: 'cancel',
      },
    ],
  });
  if (bump === 'cancel') {
    return confirmCancel(() => getSDKBump(releaseNotes));
  }
  return bump;
};

const changeAppVersion = async (releaseNotes) => {
  const bump = await getAppBump();
  const selectedVersion = bump === 'specify' ? await specifyAppVersion() : bump;
  const version = selectedVersion?.startsWith('v') ? selectedVersion.slice(1) : selectedVersion;
  const versionName = 'v' + version;
  appPkg.appVersion = version;
  if (!(await confirm({ message: `Creating App version: ${versionName}\nProceed?` }))) {
    return confirmCancel(() => changeAppVersion(releaseNotes));
  }
  fs.writeFileSync(new URL(appPkgPath, import.meta.url), stringify(appPkg), 'utf8');
  return releaseNotes;
};

const changeSDKVersion = async (releaseNotes) => {
  const bump = await getSDKBump(releaseNotes);
  const selectedVersion =
    bump === 'specify' ? await specifySDKVersion() : bumpSDKVersion(originalSDKVersion, bump);
  const version = selectedVersion?.startsWith('v')
    ? selectedVersion.slice(1)
    : selectedVersion?.startsWith('sdk-v')
      ? selectedVersion.slice(5)
      : selectedVersion;
  const versionName = 'sdk-v' + version;
  sdkPkg.version = version;
  if (!(await confirm({ message: `Creating SDK version: ${versionName}\nProceed?` }))) {
    return confirmCancel(() => changeSDKVersion(releaseNotes));
  }
  fs.writeFileSync(new URL(sdkPkgPath, import.meta.url), stringify(sdkPkg), 'utf8');
  return releaseNotes;
};

const changeVersion = async (releaseNotes) =>
  releaseTarget === 'app' ? changeAppVersion(releaseNotes) : changeSDKVersion(releaseNotes);

const streamToString = (stream) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
};

const getReleaseNotes = async () =>
  streamToString(
    conventionalChangelog({
      preset: 'angular',
    }),
  );

const writeChangelog = async (releaseNotes) => {
  const version = releaseTarget === 'sdk' ? 'sdk-v' + sdkPkg.version : 'v' + appPkg.appVersion;
  const changelog = fs.readFileSync(new URL(changelogPath, import.meta.url), 'utf8');
  const changelogSeparator = '\n---';
  const [changelogHeader, ...prevLogs] = changelog.split(changelogSeparator);
  const releaseChangelog =
    '\n\n#' + releaseNotes.replace('[0.0.0]', `[${version}]`).replace('v0.0.0', `${version}`);
  const newChangelog = [changelogHeader, releaseChangelog, ...prevLogs].join(changelogSeparator);
  fs.writeFileSync(new URL(changelogPath, import.meta.url), newChangelog, 'utf8');

  const waitForApproval = async () => {
    if (!(await confirm({ message: `Change log added to ./CHANGELOG.md\nProceed?` }))) {
      return confirmCancel(waitForApproval);
    }
    return version;
  };
  return waitForApproval();
};

const pushReleaseBranch = (version) => {
  if (!version) {
    console.log('Invalid version. Aborting.');
    process.exit(1);
  }
  const branchName = 'releases/' + version;
  execSync(`git checkout -b ${branchName}`);
  execSync(`git add -A && git commit -m "release: ${version}"`);
  execSync(`git push -u origin ${branchName}`);
};

const run = async () => {
  performChecks()
    .then(selectReleaseTarget)
    .then(getReleaseNotes)
    .then(changeVersion)
    .then(writeChangelog)
    .then(pushReleaseBranch);
};

run();
