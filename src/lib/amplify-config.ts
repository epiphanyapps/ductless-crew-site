"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs, {
  ssr: true,
});

export default function configureAmplify() {
  // This function is called to ensure Amplify is configured
  return true;
}
