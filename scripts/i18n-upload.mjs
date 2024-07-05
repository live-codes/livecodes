import { LokaliseApi } from '@lokalise/node-api';
import fs from 'fs';
import path from 'path';
import { exit } from 'process';

const outDir = path.resolve('src/livecodes/i18n/locales/en');
const api = new LokaliseApi({ apiKey: process.env.LOKALISE_API_TOKEN });
const projectID = process.env.LOKALISE_PROJECT_ID;

const uploadParams = {
  // Since we're uploading files from Github where related history is stored, we can safely use cleanup_mode
  cleanup_mode: true,
};

const pushToLokalise = () => {
  const ciMode = process.env.CI === 'true';
  const forceLocalMode = process.argv.slice(2).includes('--force');

  if (!ciMode && !forceLocalMode) {
    console.error('This script is intended to be run in CI mode or with --force flag.');
    exit(1);
  }

  const branchName = process.argv[2];

  if (!branchName) {
    console.error('Branch name is required');
    exit(1);
  }

  if (!fs.existsSync(outDir)) {
    console.error(`Directory ${outDir} doesn't exist, please run i18n-export first`);
    exit(1);
  }

  fs.readdir(outDir, async (err, files) => {
    if (err) {
      console.error(err);
      exit(1);
    }

    const data = files
      .filter((file) => file.endsWith('.lokalise.json'))
      .map((file) => {
        return {
          data: fs.readFileSync(path.join(outDir, file)).toString('base64'),
          filename: file,
          lang_iso: 'en',
        };
      });

    console.log(
      `Following files will be uploaded to Lokalise:\n${data.map((file) => file.filename).join('\n')}`,
    );

    // If branch doesn't exist, create it
    const branch = await api.branches().list({ project_id: projectID });
    if (!branch.items.some((b) => b.name === branchName)) {
      console.log(`Branch ${branchName} doesn't exist. Creating...`);
      await api.branches().create({ name: branchName }, { project_id: projectID });
    }

    // Upload files to Lokalise and store their process IDs
    const processes = (
      await Promise.all(
        data.map((file) =>
          api.files().upload(`${projectID}:${branchName}`, {
            ...file,
            ...uploadParams,
          }),
        ),
      )
    ).map((process) => process.process_id);

    // Wait until all files are processed using poll
    console.log('Waiting for files to be processed...');
    const timeout = 60000;
    const delay = 2500;
    const startTime = Date.now();

    while (true) {
      const statuses = await Promise.all(
        processes.map((process_id) =>
          api.queuedProcesses().get(process_id, { project_id: `${projectID}:${branchName}` }),
        ),
      );
      const finished = statuses.every((status) => status.status === 'finished');

      if (finished) {
        break;
      }

      if (Date.now() - startTime > timeout) {
        console.error('Timeout exceeded. Aborting...');
        exit(1);
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  });
};

if (require.main === module) {
  pushToLokalise();
}