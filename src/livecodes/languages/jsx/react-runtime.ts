export const reactRuntime = `
import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import App from "./script";
(() => {
  const isReactComponent = (c) => typeof c === "function" && (/(return|=>)\\s+\\(?\\s*(_jsx|React\\.createElement)/g.test(String(c)) || Boolean(c.prototype?.isReactComponent));
  if (!isReactComponent(App)) return;
  const root = createRoot(document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement("div")));
  root.render(_jsx(App, {}));
})();
`;
