"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

// Create a typed client for Amplify Data operations
export const client = generateClient<Schema>();

// Export the Schema type for use in components
export type { Schema };
