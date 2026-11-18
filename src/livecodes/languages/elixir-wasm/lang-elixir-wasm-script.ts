import { atomvmWasmBaseUrl } from '../../vendors';
import { BEAM_PRELUDE } from '../beam-wasm/prelude';
import { createBeamRuntime, parseTaggedResult, type ParsedResult } from '../beam-wasm/runtime';

const BUNDLE_URL = `${atomvmWasmBaseUrl}bundle.avm`;
const SCRIPT_TYPE = 'text/elixir-wasm';

const escapeElixirString = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/#{/g, '#\\{');

const wrapElixir = (code: string, input: string) => {
  // The user source is embedded as a string and parsed first with
  // Code.string_to_quoted/1: a syntax error becomes a tagged value instead of
  // an exception that would wedge (or kill) the VM with no reply.
  const source = escapeElixirString(code);
  const stdin = escapeElixirString(input);
  return `livecodes_input = "${stdin}"
livecodes_source = "${source}"
gl = Process.group_leader()
dev = :livecodes_io.start(livecodes_input)
Process.group_leader(self(), dev)
result =
  try do
    case Code.string_to_quoted(livecodes_source) do
      {:error, {meta, message, _token}} ->
        line = if is_list(meta), do: Keyword.get(meta, :line, 0), else: 0
        {:lc_error, :syntax, "SyntaxError: " <> to_string(message) <> " (line " <> to_string(line) <> ")", ""}
      {:error, err} ->
        {:lc_error, :syntax, "SyntaxError: " <> inspect(err), ""}
      {:ok, _} ->
        try do
          {value, _binding} = Code.eval_string(livecodes_source, livecodes_input: livecodes_input)
          {:lc_ok, value}
        rescue
          e -> {:lc_error, :error, inspect(e.__struct__) <> ": " <> Exception.message(e), ""}
        catch
          :throw, {:lc_exit, status} -> {:lc_exit, status}
          kind, other -> {:lc_error, kind, inspect(other), ""}
        end
    end
  after
    Process.group_leader(self(), gl)
    # Terminals are line buffered: a final newline flushes an IO.write/1 that
    # did not end in a newline. The main thread drops the resulting trailing
    # newline so the observable output does not change.
    IO.write("\\n")
  end
:livecodes_io.stop(dev)
case result do
  {:lc_ok, value} ->
    text = inspect(value)
    text = if byte_size(text) > 1500, do: binary_part(text, 0, 1500) <> "...", else: text
    "__LC_OK__" <> Base.encode64(text)
  {:lc_error, kind, message, _stack} ->
    message = if byte_size(message) > 1000, do: binary_part(message, 0, 1000) <> "...", else: message
    "__LC_ERROR__" <> Base.encode64(to_string(kind)) <> "|" <> Base.encode64(message)
  {:lc_exit, status} ->
    "__LC_EXIT__" <> Integer.to_string(status)
end`;
};

const parseElixirResult = (text: string): ParsedResult => parseTaggedResult(text, 'Elixir error');

createBeamRuntime({
  apiKey: 'elixir',
  apiAlias: 'elixir-wasm',
  label: 'Elixir',
  scriptType: SCRIPT_TYPE,
  bundleUrl: BUNDLE_URL,
  prelude: BEAM_PRELUDE,
  buildCall: (code, stdin) => ['eval_elixir', wrapElixir(code, stdin)],
  parseResult: parseElixirResult,
  parsePreludeResult: parseElixirResult,
});
