import { atomvmWasmBaseUrl } from '../../vendors';
import { BEAM_PRELUDE } from '../beam-wasm/prelude';
import { createBeamRuntime, parseTaggedResult, type ParsedResult } from '../beam-wasm/runtime';

const BUNDLE_URL = `${atomvmWasmBaseUrl}bundle.avm`;
const SCRIPT_TYPE = 'text/erlang-wasm';

const erlangEscapes: Record<string, string> = {
  '\\': '\\\\',
  '"': '\\"',
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t',
};

// An Erlang string literal is a charlist; `:livecodes_io.start/1` normalizes it.
const escapeErlangString = (value: string) =>
  value.replace(/[\\"\n\r\t]/g, (char) => erlangEscapes[char] ?? char);

const stripTrailingDot = (code: string) => code.replace(/\.(\s*(?:%[^\n]*)?\s*)$/, '$1');

const wrapErlang = (code: string, input: string) => {
  // `erlang:halt/1` is a NIF this build does not have, so route it through the
  // shared device. A bare `halt/0-1` is rewritten too, as in upstream Popcorn.
  // The final expression dot is removed so the code can be spliced into `try`.
  const source = code
    .replace(/\berlang:halt\(/g, 'livecodes_io:halt(')
    .replace(/(?<![\w.:])halt\(/g, 'livecodes_io:halt(');
  return `LcGL = group_leader(),
LcDev = livecodes_io:start("${escapeErlangString(input)}"),
group_leader(LcDev, self()),
LcValue = try
${stripTrailingDot(source)}
catch throw:{lc_exit, LcStatus} -> {lc_exit, LcStatus}; LcKind:LcReason -> {lc_error, {LcKind, LcReason}} end,
group_leader(LcGL, self()),
livecodes_io:stop(LcDev),
LcValue.`;
};

// Erlang modules are compiled and loaded as written, so they stay callable in
// later runs; expressions are wrapped for stdin, exit codes and error handling.
const actionFor = (code: string) =>
  code.startsWith('-module(') ? 'eval_erlang_module' : 'eval_erlang';

const parseErlangResult = (text: string): ParsedResult => parseTaggedResult(text, 'Erlang error');

createBeamRuntime({
  apiKey: 'erlang',
  apiAlias: 'erlang-wasm',
  label: 'Erlang',
  scriptType: SCRIPT_TYPE,
  bundleUrl: BUNDLE_URL,
  prelude: BEAM_PRELUDE,
  buildCall: (code, stdin) => {
    const action = actionFor(code);
    return [action, action === 'eval_erlang_module' ? code : wrapErlang(code, stdin)];
  },
  parseResult: parseErlangResult,
  parsePreludeResult: (text) => parseTaggedResult(text, 'Elixir prelude error'),
  // Unlike the Elixir wrapper, the Erlang wrapper does not append a newline.
  stripTrailingNewline: false,
  // The runtime returns the inspected term as a string; keep it as-is.
  normalizeResult: (data) => (data == null ? '' : String(data)),
});
