import { logsMessages } from "../assets/logsMessages";

export const startServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("./sw.js").then(registration => {
                console.log(logsMessages.succes, registration.scope);
            }).catch((error: string) => {
                console.log(logsMessages.fail, error);
            });
        });
    }
  }
