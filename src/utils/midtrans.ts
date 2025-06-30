export const loadMidtransScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.snap) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Midtrans script"));
    document.head.appendChild(script);
  });
};
