export const reactNativeRuntime = `
import { AppRegistry } from "react-native";
import App from "./script";
(() => {
  if (typeof App !== "function") return;
  const rootTag = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement("div"));
  AppRegistry.registerComponent("App", () => App);
  AppRegistry.runApplication("App", { rootTag });
})();
`;
