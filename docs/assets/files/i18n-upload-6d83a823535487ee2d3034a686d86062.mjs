import{LokaliseApi as e}from"@lokalise/node-api";import o from"fs";import s from"path";import{exit as r}from"process";const i=s.resolve("src/livecodes/i18n/locales/en"),n=new e({apiKey:process.env.LOKALISE_API_TOKEN}),a=process.env.LOKALISE_PROJECT_ID,t={cleanup_mode:!0,replace_modified:!0,convert_placeholders:!1};(()=>{const e="true"===process.env.CI,c=process.argv.slice(2).includes("--force");e||c||(console.error("This script is intended to be run in CI mode or with --force flag."),r(1));const l=process.argv[2];l||(console.error("Branch name is required"),r(1)),o.existsSync(i)||(console.error(`Directory ${i} doesn't exist, please run i18n-export first`),r(1)),o.readdir(i,(async(e,c)=>{e&&(console.error(e),r(1));const p=c.filter((e=>e.endsWith(".lokalise.json"))).map((e=>({data:o.readFileSync(s.join(i,e)).toString("base64"),filename:e,lang_iso:"en"})));console.log(`Following files will be uploaded to Lokalise:\n${p.map((e=>e.filename)).join("\n")}`);(await n.branches().list({project_id:a})).items.some((e=>e.name===l))||(console.log(`Branch ${l} doesn't exist. Creating...`),await n.branches().create({name:l},{project_id:a}));const d=(await Promise.all(p.map((e=>n.files().upload(`${a}:${l}`,{...e,...t}))))).map((e=>e.process_id));console.log("Waiting for files to be processed...");const m=Date.now();for(;;){if((await Promise.all(d.map((e=>n.queuedProcesses().get(e,{project_id:`${a}:${l}`}))))).every((e=>"finished"===e.status)))break;Date.now()-m>6e4&&(console.error("Timeout exceeded. Aborting..."),r(1)),await new Promise((e=>setTimeout(e,2500)))}}))})();