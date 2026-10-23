// AtomVM compiles this module on first boot, and compile time is the dominant
// cold-start cost. Keep it small; the worker keeps the compiled module alive
// across LiveReload edits. The device is shared by Elixir and Erlang.
export const BEAM_PRELUDE = `defmodule :livecodes_io do
  def start(stdin) do
    lines =
      stdin
      |> to_string()
      |> String.split("\\n", trim: true)
      |> Enum.map(&(&1 <> "\\n"))

    spawn(fn -> loop(lines) end)
  end

  def stop(dev), do: send(dev, :lc_stop)

  def halt, do: throw({:lc_exit, 0})
  def halt(status), do: throw({:lc_exit, status})

  defp loop(lines) do
    receive do
      :lc_stop -> :ok
      {:io_request, from, reply_as, req} ->
        {reply, rest} = handle(req, lines)
        send(from, {:io_reply, reply_as, reply})
        loop(rest)
    end
  end

  defp handle({:get_line, _enc, _prompt}, [line | rest]), do: {line, rest}
  defp handle({:get_line, _enc, _prompt}, []), do: {:eof, []}
  defp handle({:put_chars, _enc, chars}, lines) do
    IO.write(chars)
    {:ok, lines}
  end
  defp handle({:put_chars, chars}, lines) do
    IO.write(chars)
    {:ok, lines}
  end
  defp handle(other, lines), do: {{:error, {:enotsup, other}}, lines}
end`;
