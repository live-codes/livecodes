import pkg from '../package.json';
import { languages } from '../src/livecodes/languages/languages';
import { processors } from '../src/livecodes/languages/processors';

process.env.VERSION = pkg.appVersion;
(window as any).deps = { languages, processors };
