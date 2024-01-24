export const reactRuntime = `
import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import App from "./script";
(() => {
  if (typeof App !== "function") return;
  const root = createRoot(document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement("div")));
  root.render(_jsx(App, {}));
})();
`;
