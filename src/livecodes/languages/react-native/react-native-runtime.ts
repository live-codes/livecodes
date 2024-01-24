// eslint-disable-next-line import/no-internal-modules
import { checkIsReact } from '../jsx/react-runtime';

export const reactNativeRuntime = `
import { AppRegistry } from "react-native";
import App from "./script";
(() => {
${checkIsReact('App')}
const rootTag = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement("div"));
AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag });
})();
`;
