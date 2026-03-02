"use client";

// reCAPTCHA v3 site key - set in environment variable
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

// Check if reCAPTCHA is enabled
export const isRecaptchaEnabled = (): boolean => {
  return Boolean(RECAPTCHA_SITE_KEY);
};

// Load reCAPTCHA script
export const loadRecaptchaScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!isRecaptchaEnabled()) {
      resolve();
      return;
    }

    // Check if already loaded
    if (typeof window !== "undefined" && window.grecaptcha) {
      resolve();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(
      `script[src*="recaptcha/api.js"]`
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () => reject(new Error("Failed to load reCAPTCHA")));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
    document.head.appendChild(script);
  });
};

// Execute reCAPTCHA and get token
export const executeRecaptcha = async (action: string): Promise<string | null> => {
  if (!isRecaptchaEnabled()) {
    return null;
  }

  try {
    await loadRecaptchaScript();

    if (typeof window === "undefined" || !window.grecaptcha) {
      console.warn("reCAPTCHA not available");
      return null;
    }

    return new Promise((resolve) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action })
          .then((token: string) => resolve(token))
          .catch((err: Error) => {
            console.error("reCAPTCHA execution failed:", err);
            resolve(null);
          });
      });
    });
  } catch (error) {
    console.error("reCAPTCHA error:", error);
    return null;
  }
};

// TypeScript declaration for window.grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}
