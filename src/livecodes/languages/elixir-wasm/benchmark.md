# Elixir (Wasm) performance notes

These measurements were taken while fixing the Elixir (Wasm) runtime. They are
representative numbers for this machine, not a cross-device benchmark suite.
The browser-level lifecycle and performance assertions live in
`e2e/specs/elixir-wasm.spec.ts`.

## Environment

- Linux, AMD Ryzen 5 4600G (6 cores / 12 threads), 13 GiB RAM.
- Google Chrome for Testing 148.0.7778.96, headless, `--enable-precise-memory-info`.
- AtomVM runtime: Elixir 1.17.3 on OTP 27, AtomVM 0.7.0-dev (32-bit), pinned to
  `live-codes/elixir-browser-eval@6b354dab35fb7454ba2812f935b52b398ca1bec8`.
- Popcorn comparison: `@swmansion/popcorn@0.4.0-next.9` (the same version as
  Hex `popcorn 0.4.0-next.9`), Elixir 1.20.4 on OTP 29.0.6, full BEAM.
- App and sandbox were served locally with COOP/COEP isolation headers.

## Before and after

The old bridge recreated the runtime iframe for every run. A code edit therefore
downloaded and initialized the VM again and recompiled the Elixir prelude.

| Measurement                            |                        Before |                         After |
| -------------------------------------- | ----------------------------: | ----------------------------: |
| Cold start, navigation to first result |                        ~8.8 s | ~8.8-9.5 s (network variance) |
| Warm run (`livecodes.elixir.run()`)    | ~6.0 s (new iframe + VM boot) |       ~119 ms (reuses worker) |
| Edit, including LiveReload and result  |                         ~64 s |                       ~200 ms |
| Three edits while a 3 s run was active |                       ~63.6 s |                       ~3.29 s |

The cold start is still dominated by the one-time prelude compile. The worker
removes that cost from edits, but it does not hide it on first boot. Cold-start
variation is mostly network and app startup; the Elixir-specific portion was
about 5.3 s in the final run. This change does not claim a cold-start win: the
first boot still compiles the same prelude, and the measured range overlaps the
old baseline. It removes the repeated compile from edit iterations.

### Final cold-start breakdown

Measured from the result-page script evaluation:

| Phase                                                       |   Time |
| ----------------------------------------------------------- | -----: |
| Asset fetch / module load until the worker's `init` message | 1.23 s |
| AtomVM WASM initialization                                  | 281 ms |
| Elixir prelude compile                                      | 3.57 s |
| First user evaluation                                       | 121 ms |
| Total from result script to first completed run             | ~5.3 s |

Another ~4.2 s before the result-page script runs is LiveCodes app startup; it is
not part of the Elixir runtime. The 3.57 s prelude compile happens once per
worker boot. A normal edit reuses the booted worker, which is why the edit path
drops from tens of seconds to ~200 ms.

### Rapid edits

While a `Process.sleep(3000)` evaluation is active, three further edits are
coalesced to the latest one. The final result appears after the active run (or
after the 10 s supersede timeout), with one worker boot. This avoids building a
queue of stale evaluations and prevents a newer edit from being blocked behind a
hung one.

## AtomVM vs Popcorn OTP/BEAM

Both runtimes were measured in minimal pages with a single worker, after boot
and warm evaluation, so app-level LiveCodes work is excluded from the
worker-level numbers.

| Metric                             |                       AtomVM (production) |                        Popcorn OTP/BEAM |
| ---------------------------------- | ----------------------------------------: | --------------------------------------: |
| Runtime                            |                    Elixir 1.17.3 / OTP 27 |              Elixir 1.20.4 / OTP 29.0.6 |
| First-load transfer                |                           ~3.48 MB Brotli |                 ~7.88 MB (local server) |
| Decoded runtime assets             |                                  ~7.88 MB |                     ~30 MB build output |
| Init time, local assets            |                                    266 ms |                                  574 ms |
| First direct evaluation            |                                   29.3 ms |                                 31.2 ms |
| Warm direct evaluation             |                                    4.4 ms |                              1.0-1.1 ms |
| Total memory after warm evaluation |                                   32.9 MB |                                101.2 MB |
| Worker memory only                 |                                   31.9 MB |                                100.0 MB |
| Isolation headers tested           | COOP `same-origin`, COEP `credentialless` | COOP `same-origin`, COEP `require-corp` |

Notes:

- The AtomVM transfer figure is the actual Brotli-compressed CDN response:
  `AtomVM.mjs` 35.8 KB, `AtomVM.wasm` 248 KB, and `bundle.avm` 3.36 MB. The
  decoded sizes are 150 KB, 997 KB, and 7.11 MB.
- The Popcorn local benchmark server compressed the OTP tarballs but left
  `beam.wasm` and the JS modules uncompressed. A static host with Brotli enabled
  could reduce that transfer further.
- Popcorn's ~30 MB cook output is a build-time artifact, not all of it is
  downloaded by the browser. It shows the packaging cost of shipping a complete
  OTP/BEAM image.
- The direct warm-evaluation numbers are worker calls. A LiveCodes `run()` takes
  ~119 ms end-to-end because it also parses the wrapper with
  `Code.string_to_quoted/1`, evaluates it with `Code.eval_string/2`, and decodes
  the tagged result. That overhead is common to both runtimes in the app; it is
  not the VM call itself.
- Memory was measured with
  `performance.measureUserAgentSpecificMemory()` in an isolated page after one
  boot and two or three evaluations. It includes the page, worker, and shared
  memory; it excludes the browser process, GPU process, and page cache. The
  numbers are representative single runs and should be treated as approximate.

Popcorn is not a drop-in replacement for the production runtime. It uses the
full BEAM, has broader OTP compatibility, but requires Mix build-time packaging
and a substantially larger download and memory footprint. The AtomVM runtime
keeps the current pinned artifact and the persistent-worker architecture. Any
future migration should be justified by a compatibility need that cannot be
fixed in the AtomVM runtime, not by the benchmark alone.
