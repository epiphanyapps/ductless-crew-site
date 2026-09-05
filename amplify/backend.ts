import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { storage } from "./storage/resource";

export const backend = defineBackend({
  auth,
  data,
  storage,
});

/**
 * Admin accounts are created by an administrator, never self-registered.
 *
 * `defineAuth` has no first-class switch for this, so we reach for the
 * underlying CFN resource. Without it the Cognito SignUp API is open to the
 * public: anyone could create an account and reach whatever `authenticated()`
 * grants. Hiding the sign-up tab in the UI is not sufficient on its own,
 * because the API is reachable directly.
 */
backend.auth.resources.cfnResources.cfnUserPool.adminCreateUserConfig = {
  allowAdminCreateUserOnly: true,
};
