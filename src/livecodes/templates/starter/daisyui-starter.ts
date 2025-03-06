import type { Template } from '../../models';

export const daisyuiStarter: Template = {
  name: 'daisyui',
  title: window.deps.translateString('templates.starter.daisyui', 'daisyUI Starter'),
  thumbnail: 'assets/templates/daisyui.svg',
  activeEditor: 'markup',
  markup: {
    language: 'html',
    content: `
<!-- based on https://daisyui.com/tailwindplay/ -->

<!-- theme controller -->
<div class="flex justify-end p-4">
  <label class="swap swap-rotate">
    <!-- this hidden checkbox controls the state -->
    <input type="checkbox" class="theme-controller" onchange="changeTheme()" />

    <!-- sun icon -->
    <svg class="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
    </svg>

    <!-- moon icon -->
    <svg class="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
    </svg>
  </label>
</div>

<!-- buttons -->
<div class="p-4">
  <button class="btn btn-primary">primary</button>
  <button class="btn btn-secondary">secondary</button>
  <button class="btn btn-accent">accent</button>
</div>

<!-- same buttons with another theme! -->
<div class="p-4" data-theme="abyss">
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-accent">Accent</button>
</div>
<div class="p-4" data-theme="purplewind">
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-accent">Accent</button>
</div>

<!-- tab -->
<div class="tabs tabs-lift p-4">
  <button class="tab">Tab 1</button>
  <button class="tab tab-active">Tab 2</button>
  <button class="tab">Tab 3</button>
  <button class="tab"></button>
</div>

<!-- toggle, checkbox, radio -->
<div class="p-4">
  <input type="checkbox" class="toggle" />
  <input type="checkbox" class="toggle toggle-primary" />
  <input type="checkbox" class="toggle toggle-secondary" />
  <input type="checkbox" class="toggle toggle-accent" />
  <br/>
  <input type="checkbox" class="checkbox" />
  <input type="checkbox" class="checkbox-primary checkbox" />
  <input type="checkbox" class="checkbox-secondary checkbox" />
  <input type="checkbox" class="checkbox-accent checkbox" />
  <br/>
  <input type="radio" name="radio" class="radio" />
  <input type="radio" name="radio" class="radio-primary radio" />
  <input type="radio" name="radio" class="radio-secondary radio" />
  <input type="radio" name="radio" class="radio-accent radio" />
</div>

<!-- card -->
<div class="card m-4 w-80 shadow-sm">
  <figure>
    <img src="{{ __livecodes_baseUrl__ }}assets/templates/daisyui-5.webp" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">DaisyUI 5.0</h2>
    <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus.</p>
  </div>
</div>

<!-- dropdown -->
<details class="dropdown m-4">
  <summary class="btn m-1">open/close dropdown</summary>
  <ul class="dropdown-content menu z-[2] w-52 rounded-box bg-base-200 p-2">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</details>

<!-- Open the modal using ID.showModal() method -->
<button class="btn" onclick="my_modal_1.showModal()">open modal</button>
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>

<!-- steps -->
<ul class="steps my-4 w-full">
  <li class="step step-primary">Register</li>
  <li class="step step-primary">Choose plan</li>
  <li class="step">Purchase</li>
  <li class="step">Receive Product</li>
</ul>

<!-- chat bubble -->
<div class="chat chat-start m-4">
  <div class="avatar chat-image">
    <div class="w-10 rounded-full">
      <img src="{{ __livecodes_baseUrl__ }}assets/templates/daisy-profile-picture.webp" />
    </div>
  </div>
  <div class="chat-bubble">see all components <a class="link" target="_blank" href="https://daisyui.com/components">Here</a></div>
</div>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
@import "tailwindcss";
@plugin "daisyui"{
  themes: light --default, dark --prefersdark, abyss;
}


/**
  A custom theme made with
  https://daisyui.com/theme-generator/
*/

@plugin "daisyui/theme" {
  name: "purplewind";
  default: false;
  prefersdark: false;
  color-scheme: "light";
  --color-base-100: oklch(96% 0.016 293.756);
  --color-base-200: oklch(94% 0.029 294.588);
  --color-base-300: oklch(89% 0.057 293.283);
  --color-base-content: oklch(38% 0.189 293.745);
  --color-primary: oklch(82% 0.12 346.018);
  --color-primary-content: oklch(28% 0.109 3.907);
  --color-secondary: oklch(82% 0.119 306.383);
  --color-secondary-content: oklch(29% 0.149 302.717);
  --color-accent: oklch(80% 0.105 251.813);
  --color-accent-content: oklch(28% 0.091 267.935);
  --color-neutral: oklch(38% 0.189 293.745);
  --color-neutral-content: oklch(96% 0.016 293.756);
  --color-info: oklch(54% 0.245 262.881);
  --color-info-content: oklch(97% 0.014 254.604);
  --color-success: oklch(60% 0.118 184.704);
  --color-success-content: oklch(98% 0.014 180.72);
  --color-warning: oklch(68% 0.162 75.834);
  --color-warning-content: oklch(98% 0.026 102.212);
  --color-error: oklch(58% 0.253 17.585);
  --color-error-content: oklch(96% 0.015 12.422);
  --radius-selector: 0.25rem;
  --radius-field: 0.25rem;
  --radius-box: 0.5rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 2px;
  --depth: 1;
  --noise: 1;
}
`.trimStart(),
  },
  script: {
    language: 'javascript',
    content: `
let theme = 'light';
const changeTheme = (selectedTheme) => {
  theme = selectedTheme ?? (theme === 'light' ? 'dark' : 'light');
  document.body.setAttribute('data-theme', theme);
}
changeTheme(theme);
`.trimStart(),
  },
  processors: ['tailwindcss'],
};
