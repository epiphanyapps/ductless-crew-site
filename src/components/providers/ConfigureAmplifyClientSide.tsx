"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";

/**
 * Configures Amplify for the browser at MODULE SCOPE.
 *
 * This deliberately does not run inside an effect and renders nothing. The
 * previous provider awaited configuration in `useEffect` and returned `null`
 * until it resolved, which meant React discarded the entire server-rendered
 * DOM on hydration — every page shipped empty HTML to crawlers and paid a
 * full re-render. Configuration must never gate rendering.
 */
Amplify.configure(outputs, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}
