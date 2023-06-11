import type { Template } from '../../models';

export const tailwindcssStarter: Template = {
  name: 'tailwindcss',
  title: 'Tailwind CSS Starter',
  thumbnail: 'assets/templates/tailwindcss.svg',
  activeEditor: 'markup',
  markup: {
    language: 'html',
    content: `
<div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div class="relative py-3 sm:max-w-xl sm:mx-auto">
    <div class="back-card"></div>
    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <div class="max-w-md mx-auto">
        <div>
          <img src="{{ __livecodes_baseUrl__ }}assets/templates/tailwindplay.svg" class="h-7 sm:h-8" />
        </div>
        <div class="divide-y divide-gray-200">
          <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <p class="prose md:prose-xl">A template based on <a href="https://play.tailwindcss.com/" class="text-cyan-600 hover:text-cyan-700" target="_blank">Tailwind CSS playground</a>. Here you can do things like:</p>
            <ul class="list-disc space-y-2">
              <li class="flex items-start">
                <span class="h-6 flex items-center sm:h-7">
                  <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </span>
                <p class="ml-2">
                  Customizing configuration in
                  <code class="text-sm font-bold text-gray-900">menu → Custom Settings</code>
                </p>
              </li>
              <li class="flex items-start">
                <span class="h-6 flex items-center sm:h-7">
                  <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </span>
                <p class="ml-2">
                  Extracting classes with
                  <code class="text-sm font-bold text-gray-900">@apply</code>
                </p>
              </li>
              <li class="flex items-start">
                <span class="h-6 flex items-center sm:h-7">
                  <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </span>
                <p class="ml-2">Viewing generated CSS code (in <code class="text-sm font-bold text-gray-900">Compiled</code> pane below)</p>
              </li>
            </ul>
            <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
          </div>
          <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <p>Want to dig deeper into Tailwind?</p>
            <p>
              <a href="https://tailwindcss.com/docs" class="text-cyan-600 hover:text-cyan-700" target="_blank"> Read the docs &rarr; </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
@tailwind base;
@tailwind components;
@tailwind utilities;

.back-card {
  @apply absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl;
}
`.trimStart(),
  },
  script: {
    language: 'javascript',
    content: '',
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  processors: ['tailwindcss'],
  imports: {},
  types: {},
  customSettings: {
    tailwindcss: {
      plugins: [
        '@tailwindcss/forms',
        '@tailwindcss/typography',
        '@tailwindcss/aspect-ratio',
        '@tailwindcss/line-clamp',
      ],
      theme: {
        extend: {
          colors: {
            sky: {
              '50': '#f0f9ff',
              '100': '#e0f2fe',
              '200': '#bae6fd',
              '300': '#7dd3fc',
              '400': '#38bdf8',
              '500': '#0ea5e9',
              '600': '#0284c7',
              '700': '#0369a1',
              '800': '#075985',
              '900': '#0c4a6e',
            },
            cyan: {
              '50': '#ecfeff',
              '100': '#cffafe',
              '200': '#a5f3fc',
              '300': '#67e8f9',
              '400': '#22d3ee',
              '500': '#06b6d4',
              '600': '#0891b2',
              '700': '#0e7490',
              '800': '#155e75',
              '900': '#164e63',
            },
          },
        },
      },
    },
  },
};
