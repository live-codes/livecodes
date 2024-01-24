export const solidRuntime = `
import { render, createComponent } from "solid-js/web";
import App from "./script";
(() => {
  if (typeof App !== "function") return;
  const root = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement("div"));
  render(() => createComponent(App, {}), root);
})();
`;
