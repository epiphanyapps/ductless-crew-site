"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { useEffect, useState } from "react";

export default function AmplifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    const configure = async () => {
      try {
        const outputs = await import("../../../amplify_outputs.json");
        Amplify.configure(outputs.default, { ssr: true });
        setConfigured(true);
      } catch (error) {
        // amplify_outputs.json doesn't exist yet (pre-deployment)
        console.log("Amplify not configured - outputs not available");
        setConfigured(true);
      }
    };
    configure();
  }, []);

  if (!configured) {
    return null;
  }

  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
