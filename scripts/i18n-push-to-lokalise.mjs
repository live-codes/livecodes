import { LokaliseApi } from '@lokalise/node-api';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('src/livecodes/i18n/locales/tmp');
const api = new LokaliseApi({ apiKey: process.env.LOKALISE_API_TOKEN });
const projectID = process.env.LOKALISE_PROJECT_ID;

const uploadParams = {
  // Since we're uploading files from Github where related history is stored, we can safely use cleanup_mode
  cleanup_mode: true,
};

const pushToLokalise = () => {
  fs.readdir(outDir, async (err, files) => {
    if (err) {
      console.error(err);
      return;
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

    // Upload files to Lokalise and store their process IDs
    const processes = (
      await Promise.all(
        data.map((file) =>
          api.files().upload(projectID, {
            ...file,
            ...uploadParams,
          }),
        ),
      )
    ).map((process) => process.process_id);

    // Wait until all files are processed using poll
    console.log('Waiting for files to be processed...');
    while (true) {
      const statuses = await Promise.all(
        processes.map((process_id) =>
          api.queuedProcesses().get(process_id, { project_id: projectID }),
        ),
      );
      const finished = statuses.every((status) => status.status === 'finished');

      if (finished) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 2500));
    }
  });
};

pushToLokalise();
