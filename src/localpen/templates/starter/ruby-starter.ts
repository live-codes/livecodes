import { Template } from '../../models';

export const rubyStarter: Template = {
  name: 'ruby',
  title: 'Ruby Starter',
  thumbnail: 'assets/templates/ruby.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img src="{{ __localpen_baseUrl__ }}assets/templates/ruby.svg" class="logo" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
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
    language: 'ruby',
    content: `
title = 'Ruby'
$$.document.querySelector('#title').innerHTML = title

$counter = 0
$counter_element = $$.document.querySelector('#counter')

def increment
    $counter += 1
    $counter_element.innerHTML = "You clicked %d times." % [$counter]
end

$$.document.querySelector('button').onclick = -> {increment()}

# check console
current_time = Time.now.hour
if current_time < 12
    puts "Good morning"
elsif 12 <= current_time and current_time < 18
    puts "Good afternoon"
else
    puts "Good evening"
end
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
