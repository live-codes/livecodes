import { runOutsideWorker as diagrams } from '../languages/diagrams';
import { runOutsideWorker as duckdb } from '../languages/duckdb';
import { runOutsideWorker as mdx } from '../languages/mdx';
import { runOutsideWorker as ocamlJs } from '../languages/ocaml-js';
import { runOutsideWorker as postgresql } from '../languages/postgresql';
import { runOutsideWorker as rescript } from '../languages/rescript';

(window as any).compilers = {
  rescript,
  reason: rescript,
  ocaml: rescript,
  'ocaml-js': ocamlJs,
  mdx,
  diagrams,
  postgresql,
  duckdb,
};
