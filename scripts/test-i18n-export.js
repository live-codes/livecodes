// Runs `npm run i18n-export -- --save-temp` and compare the output in src/livecodes/i18n/locales/tmp with src/livecodes/i18n/locales/en.
// Basically check all files with same name in both directories and compare their content.
// If any of them are different, it should fail and throw an error.
// Or, if any file is missing in one of the directories, it should also fail and throw an error.

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const prettier = require('prettier');
const { prettierConfig } = require('./i18n-export');

const tmpDir = path.resolve('src/livecodes/i18n/locales/tmp');
const enDir = path.resolve('src/livecodes/i18n/locales/en');

const compareDirectories = async (dir1, dir2) => {
    const filesDir1 = await fs.promises.readdir(dir1);
    const filesDir2 = await fs.promises.readdir(dir2);

    const checkMissing = (dir1, dir2) => {
        const missing = dir1.filter(file => !dir2.includes(file));
        if (missing.length > 0) {
            throw new Error(`Missing files: ${missing.join(', ')} in ${dir2}`);
        }
    }

    // Check for missing files in either directory
    checkMissing(filesDir1, filesDir2);
    checkMissing(filesDir2, filesDir1);

    /** @type {Record<string, (content: string) => Promise<string>} */
    const formatters = {
        '.json': async (content) => JSON.stringify(JSON.parse(content), null, 2),
        '.ts': async (content) => await prettier.format(content, { ...prettierConfig, parser: 'typescript' })
    };

    // Compare file contents
    for (const file of filesDir1) {
        const fileType = path.extname(file);
        const formatter = formatters[fileType];

        const filePath1 = path.join(dir1, file);
        const filePath2 = path.join(dir2, file);

        const content1 = await fs.promises.readFile(filePath1, 'utf8');
        const content2 = await fs.promises.readFile(filePath2, 'utf8');

        const formatted1 = await formatter(content1);
        const formatted2 = await formatter(content2);

        if (formatted1 !== formatted2) {
            throw new Error(`File contents do not match for ${file}`);
        }
    };
}

const runTest = async () => {
    let exitCode = 0;
    try {
        execSync('npm run i18n-export -- --save-temp', { stdio: 'pipe' });
        await compareDirectories(tmpDir, enDir);
        console.log('All files match. Test passed.');
    } catch (error) {
        exitCode = 1;
        console.error(`Test failed: ${error.message}`);
    } finally {
        // Clean up
        await fs.promises.rm(tmpDir, { recursive: true });
    }
    process.exit(exitCode);
}

if (require.main === module) {
    runTest();
}
