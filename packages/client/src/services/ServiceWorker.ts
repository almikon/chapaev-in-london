export const startServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("./sw.js").then(registration => {
                console.log("ServiceWorker registration successful with scope: ", registration.scope);
            }).catch((error: string) => {
                console.log("ServiceWorker registration failed: ", error);
            });
        });
    }
  }
