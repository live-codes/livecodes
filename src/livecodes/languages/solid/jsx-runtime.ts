export const solidRuntime = `
import { render, createComponent } from "solid-js/web";
import App from "./script";
(() => {
  const isSolidComponent = (c) => typeof c === "function" && /return\\s+\\(?\\s*function\\s+\\(\\)\\s+{/g.test(String(c));
  if (!isSolidComponent(App)) return;
  const root = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement("div"));
  render(() => createComponent(App, {}), root);
})();
`;
