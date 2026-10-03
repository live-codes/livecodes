import type { Template } from '../../models';

export const assemblyWasmStarter: Template = {
  name: 'assembly-wasm',
  aliases: ['asm', 'x86'],
  title: window.deps.translateString('templates.starter.assembly-wasm', 'Assembly (Wasm) Starter'),
  thumbnail: 'assets/templates/assembly.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/assembly.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.assemblyWasm.input = "-1";

  addEventListener("load", async () => {
    const button = document.querySelector("#counter-button");

    try {
      // wait till the assembler and the emulator have been downloaded
      await livecodes.assemblyWasm.loaded;
    } catch (error) {
      // surface the boot error instead of crashing on a null output
      button.innerText = "Error";
      console.error(error);
      return;
    }

    // get initial output
    show(livecodes.assemblyWasm.output, livecodes.assemblyWasm.error);

    button.onclick = async () => {
      button.disabled = true;
      // The current count is the program's standard input, so every run is a fresh
      // program that reads it, adds one and prints the result.
      const { output, error } = await livecodes.assemblyWasm.run(window.count);
      show(output, error);
    };

    // surface a program that does not assemble instead of crashing on a null output
    function show(output, error) {
      if (error != null || output == null) {
        button.innerText = "Error";
        console.error(error);
        return;
      }
      update(output);
    }

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split("\\n");

      if (!isNaN(Number(count))) {
        window.count = Number(count);
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
      button.innerText = "Click me";
      button.disabled = false;
    }
  });
</script>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'assembly-wasm',
    content: `
; Reads a number on standard input, increments it and prints the result.
; The page passes the current count as input, so every run is a fresh program.

    xor rax, rax           ; read(0, inbuf, 16)
    xor rdi, rdi
    lea rsi, [rip + inbuf]
    mov rdx, 16
    syscall

    lea rsi, [rip + inbuf] ; parse the number, which may be negative
    xor rbx, rbx
    mov r8, 1
    movzx rcx, byte ptr [rsi]
    cmp cl, 45             ; '-'
    jne parse
    mov r8, -1
    inc rsi
parse:
    movzx rcx, byte ptr [rsi]
    sub cl, 48
    cmp cl, 9
    ja parsed
    imul rbx, rbx, 10
    add rbx, rcx
    inc rsi
    jmp parse
parsed:
    imul rbx, r8           ; apply the sign
    inc rbx                ; this run's count

    mov rax, 1             ; write(1, title, 9)
    mov rdi, 1
    lea rsi, [rip + title]
    mov rdx, 9
    syscall

    lea rdi, [rip + outbuf + 16]
    mov byte ptr [rdi], 10 ; trailing newline
    mov rax, rbx
    mov r10, 10
tostring:
    xor rdx, rdx
    div r10
    add dl, 48
    dec rdi
    mov byte ptr [rdi], dl
    test rax, rax
    jnz tostring

    lea rdx, [rip + outbuf + 17]
    sub rdx, rdi           ; the digits and the newline
    mov rsi, rdi
    mov rax, 1             ; write(1, digits, length)
    mov rdi, 1
    syscall

    mov rax, 60            ; exit(0)
    xor rdi, rdi
    syscall

title:
    .ascii "Assembly"
    .byte 10
inbuf:
    .zero 16
outbuf:
    .zero 17
`.trimStart(),
  },
};
