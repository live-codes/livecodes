export const reactRuntime = `
import React from "react";
import { createRoot } from "react-dom/client";
import App from './script';
const root = createRoot(document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div')));
root.render(React.createElement(App, null));
`;

export const hasCustomJsxRuntime = (code: string) => new RegExp(/\/\*\*[\s\*]*@jsx\s/g).test(code);

export const hasDefaultExport = (code: string) => new RegExp(/export\s*default\s/).test(code);
