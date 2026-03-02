"use client";

import { useEffect, useState, useCallback } from "react";
import { loadRecaptchaScript, executeRecaptcha, isRecaptchaEnabled } from "@/lib/recaptcha";

interface UseRecaptchaReturn {
  isReady: boolean;
  isEnabled: boolean;
  getToken: (action: string) => Promise<string | null>;
}

export function useRecaptcha(): UseRecaptchaReturn {
  const [isReady, setIsReady] = useState(false);
  const isEnabled = isRecaptchaEnabled();

  useEffect(() => {
    if (!isEnabled) {
      setIsReady(true);
      return;
    }

    loadRecaptchaScript()
      .then(() => setIsReady(true))
      .catch((err) => {
        console.error("Failed to load reCAPTCHA:", err);
        setIsReady(true); // Allow form submission even if reCAPTCHA fails
      });
  }, [isEnabled]);

  const getToken = useCallback(async (action: string): Promise<string | null> => {
    if (!isEnabled) return null;
    return executeRecaptcha(action);
  }, [isEnabled]);

  return { isReady, isEnabled, getToken };
}
