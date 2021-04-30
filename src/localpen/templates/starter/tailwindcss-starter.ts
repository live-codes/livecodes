import { Template } from '../../models';

export const tailwindcssStarter: Template = {
  title: 'Tailwind CSS Starter',
  thumbnail: 'assets/templates/tailwindcss.svg',
  language: 'html',
  markup: {
    language: 'html',
    content: `
<div class="bg-gray-100 font-sans leading-normal tracking-normal">
  <nav id="header" class="fixed w-full z-10 top-0">
    <div
      id="progress"
      class="h-1 z-20 top-0"
      style="background:linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0);"
    ></div>

    <div
      class="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3"
    >
      <div class="pl-4">
        <a
          class="text-gray-900 text-base no-underline hover:no-underline font-extrabold text-xl"
          href="#"
        >
          Minimal Blog
        </a>
      </div>

      <div class="block lg:hidden pr-4">
        <button
          id="nav-toggle"
          class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-green-500 appearance-none focus:outline-none"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-gray-100 md:bg-transparent z-20"
        id="nav-content"
      >
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-3">
            <a
              class="inline-block py-2 px-4 text-gray-900 font-bold no-underline"
              href="#"
              >Active</a
            >
          </li>
          <li class="mr-3">
            <a
              class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4"
              href="#"
              >link</a
            >
          </li>
          <li class="mr-3">
            <a
              class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4"
              href="#"
              >link</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!--Container-->
  <div class="container w-full md:max-w-3xl mx-auto pt-20">
    <div
      class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
      style="font-family:Georgia,serif;"
    >
      <!--Title-->
      <div class="font-sans">
        <p class="text-base md:text-sm text-green-500 font-bold">
          &lt;
          <a
            href="#"
            class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
            >BACK TO BLOG</a
          >
        </p>
        <h1
          class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl"
        >
          Welcome to Minimal Blog
        </h1>
        <p class="text-sm md:text-base font-normal text-gray-600">
          Published 19 February 2019
        </p>
      </div>

      <!--Post Content-->

      <!--Lead Para-->
      <p class="py-6">
        👋 Welcome fellow
        <a
          class="text-green-500 no-underline hover:underline"
          href="https://www.tailwindcss.com"
          target="_blank"
          >Tailwind CSS</a
        >
        and miminal monochrome blog fan. This starter template provides a
        starting point to create your own minimal monochrome blog using Tailwind
        CSS and vanilla Javascript.
      </p>

      <p class="py-6">
        The basic blog page layout is available and all using the default
        Tailwind CSS classes (although there are a few hardcoded style tags). If
        you are going to use this in your project, you will want to convert the
        classes into components.
      </p>

      <h1 class="py-2 font-sans">Heading 1</h1>
      <h2 class="py-2 font-sans">Heading 2</h2>
      <h3 class="py-2 font-sans">Heading 3</h3>
      <h4 class="py-2 font-sans">Heading 4</h4>
      <h5 class="py-2 font-sans">Heading 5</h5>
      <h6 class="py-2 font-sans">Heading 6</h6>

      <p class="py-6">
        Sed dignissim lectus ut tincidunt vulputate. Fusce tincidunt lacus
        purus, in mattis tortor sollicitudin pretium. Phasellus at diam posuere,
        scelerisque nisl sit amet, tincidunt urna. Cras nisi diam, pulvinar ut
        molestie eget, eleifend ac magna. Sed at lorem condimentum, dignissim
        lorem eu, blandit massa. Phasellus eleifend turpis vel erat bibendum
        scelerisque. Maecenas id risus dictum, rhoncus odio vitae, maximus
        purus. Etiam efficitur dolor in dolor molestie ornare. Aenean pulvinar
        diam nec neque tincidunt, vitae molestie quam fermentum. Donec ac
        pretium diam. Suspendisse sed odio risus. Nunc nec luctus nisi. Class
        aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Duis nec nulla eget sem dictum elementum.
      </p>

      <ol>
        <li class="py-3">
          Maecenas accumsan lacus sit amet elementum porta. Aliquam eu libero
          lectus. Fusce vehicula dictum mi. In non dolor at sem ullamcorper
          venenatis ut sed dui. Ut ut est quam. Suspendisse quam quam, commodo
          sit amet placerat in, interdum a ipsum. Morbi sit amet tellus
          scelerisque tortor semper posuere.
        </li>
        <li class="py-3">
          Morbi varius posuere blandit. Praesent gravida bibendum neque eget
          commodo. Duis auctor ornare mauris, eu accumsan odio viverra in. Proin
          sagittis maximus pharetra. Nullam lorem mauris, faucibus ut odio
          tempus, ultrices aliquet ex. Nam id quam eget ipsum luctus hendrerit.
          Ut eros magna, eleifend ac ornare vulputate, pretium nec felis.
        </li>
        <li class="py-3">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia Curae; Nunc vitae pretium elit. Cras leo mauris,
          tristique in risus ac, tristique rutrum velit. Mauris accumsan tempor
          felis vitae gravida. Cras egestas convallis malesuada. Etiam ac ante
          id tortor vulputate pretium. Maecenas vel sapien suscipit, elementum
          odio et, consequat tellus.
        </li>
      </ol>

      <blockquote class="border-l-4 border-green-500 italic my-8 pl-8 md:pl-12">
        Example of blockquote - Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet
        ligula.
      </blockquote>

      <p class="py-6">Example code block:</p>
      <pre
        class="bg-gray-900 rounded text-white font-mono text-base p-2 md:p-4"
      >
        <code class="break-words whitespace-pre-wrap">
&lt;header class="site-header outer"&gt;
&lt;div class="inner"&gt;
{{&gt; "site-nav"}}
&lt;/div&gt;
&lt;/header&gt;
        </code>
      </pre>

      <!--/ Post Content-->
    </div>

    <!--Tags -->
    <div class="text-base md:text-sm text-gray-500 px-4 py-6">
      Tags:
      <a
        href="#"
        class="text-base md:text-sm text-green-500 no-underline hover:underline"
        >Link</a
      >
      .
      <a
        href="#"
        class="text-base md:text-sm text-green-500 no-underline hover:underline"
        >Link</a
      >
    </div>

    <!--Divider-->
    <hr class="border-b-2 border-gray-400 mb-8 mx-4" />

    <!--Subscribe-->
    <div class="container px-4">
      <div
        class="font-sans bg-gradient-to-b from-green-100 to-gray-100 rounded-lg shadow-xl p-4 text-center"
      >
        <h2 class="font-bold break-normal text-xl md:text-3xl">
          Subscribe to my Newsletter
        </h2>
        <h3 class="font-bold break-normal text-gray-600 text-sm md:text-base">
          Get the latest posts delivered right to your inbox
        </h3>
        <div class="w-full text-center pt-4">
          <form action="#">
            <div class="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
              <input
                type="email"
                placeholder="youremail@example.com"
                class="flex-1 mt-4 appearance-none border border-gray-400 rounded shadow-md p-3 text-gray-600 mr-2 focus:outline-none"
              />
              <button
                type="submit"
                class="flex-1 mt-4 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-green-400"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- /Subscribe-->

    <!--Author-->
    <div class="flex w-full items-center font-sans px-4 py-12">
      <img
        class="w-10 h-10 rounded-full mr-4"
        src="http://i.pravatar.cc/300"
        alt="Avatar of Author"
      />
      <div class="flex-1 px-2">
        <p class="text-base font-bold text-base md:text-xl leading-none mb-2">
          Jo Bloggerson
        </p>
        <p class="text-gray-600 text-xs md:text-base">
          Minimal Blog Tailwind CSS template by
          <a
            class="text-green-500 no-underline hover:underline"
            href="https://www.tailwindtoolbox.com"
            target="_blank"
            >TailwindToolbox.com</a
          >
        </p>
      </div>
      <div class="justify-end">
        <button
          class="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full"
        >
          Read More
        </button>
      </div>
    </div>
    <!--/Author-->

    <!--Divider-->
    <hr class="border-b-2 border-gray-400 mb-8 mx-4" />

    <!--Next & Prev Links-->
    <div class="font-sans flex justify-between content-center px-4 pb-12">
      <div class="text-left">
        <span class="text-xs md:text-sm font-normal text-gray-600"
          >&lt; Previous Post</span
        ><br />
        <p>
          <a
            href="#"
            class="break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
            >Blog title</a
          >
        </p>
      </div>
      <div class="text-right">
        <span class="text-xs md:text-sm font-normal text-gray-600"
          >Next Post &gt;</span
        ><br />
        <p>
          <a
            href="#"
            class="break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
            >Blog title</a
          >
        </p>
      </div>
    </div>

    <!--/Next & Prev Links-->
  </div>
  <!--/container-->

  <footer class="bg-white border-t border-gray-400 shadow">
    <div class="container max-w-4xl mx-auto flex py-8">
      <div class="w-full mx-auto flex flex-wrap">
        <div class="flex w-full md:w-1/2">
          <div class="px-8">
            <h3 class="font-bold text-gray-900">About</h3>
            <p class="py-4 text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              vel mi ut felis tempus commodo nec id erat. Suspendisse
              consectetur dapibus velit ut lacinia.
            </p>
          </div>
        </div>

        <div class="flex w-full md:w-1/2">
          <div class="px-8">
            <h3 class="font-bold text-gray-900">Social</h3>
            <ul class="list-reset items-center text-sm pt-3">
              <li>
                <a
                  class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1"
                  href="#"
                  >Add social link</a
                >
              </li>
              <li>
                <a
                  class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1"
                  href="#"
                  >Add social link</a
                >
              </li>
              <li>
                <a
                  class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1"
                  href="#"
                  >Add social link</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'javascript',
    content: `
/* Progress bar */
//Source: https://alligator.io/js/progress-bar-javascript-css-variables/
var h = document.documentElement,
  b = document.body,
  st = "scrollTop",
  sh = "scrollHeight",
  progress = document.querySelector("#progress"),
  scroll;
var scrollpos = window.scrollY;
var header = document.getElementById("header");
var navcontent = document.getElementById("nav-content");

document.addEventListener("scroll", function () {
  /*Refresh scroll % width*/
  scroll = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
  progress.style.setProperty("--scroll", scroll + "%");

  /*Apply classes for slide in bar*/
  scrollpos = window.scrollY;

  if (scrollpos > 10) {
    header.classList.add("bg-white");
    header.classList.add("shadow");
    navcontent.classList.remove("bg-gray-100");
    navcontent.classList.add("bg-white");
  } else {
    header.classList.remove("bg-white");
    header.classList.remove("shadow");
    navcontent.classList.remove("bg-white");
    navcontent.classList.add("bg-gray-100");
  }
});

//Javascript to toggle the menu
document.getElementById("nav-toggle").onclick = function () {
  document.getElementById("nav-content").classList.toggle("hidden");
};
`.trimStart(),
  },
  stylesheets: ['https://unpkg.com/tailwindcss/dist/tailwind.min.css'],
  scripts: [],
  cssPreset: '',
  modules: [],
};
