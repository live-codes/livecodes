export const reactNativeRuntime = `
import { AppRegistry } from "react-native";
import App from "./script";
(() => {
  const isReactComponent = (c) => typeof c === "function" && (/return\\s+\\(?\\s*(_jsx|React\\.createElement)/g.test(String(c)) || Boolean(c.prototype.isReactComponent));
  if (!isReactComponent(App)) return;
  const rootTag = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement("div"));
  AppRegistry.registerComponent("App", () => App);
  AppRegistry.runApplication("App", { rootTag });
})();
`;
