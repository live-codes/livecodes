// eslint-disable-next-line import/no-internal-modules
import { runOutsideWorker as rescript } from '../languages/lang-rescript';

(window as any).compilers = {
  rescript,
  reason: rescript,
  ocaml: rescript,
};
