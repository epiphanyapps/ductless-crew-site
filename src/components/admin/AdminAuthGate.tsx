"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { ReactNode } from "react";
import { AdminModeProvider } from "@/contexts";

/**
 * Cognito gate for every /admin route.
 *
 * The Amplify UI stylesheet (~339KB) is imported here rather than in the root
 * layout so it never ships on a public marketing page. `Authenticator.Provider`
 * is included because `AdminLayout` reads `useAuthenticator` for sign-out.
 */
/** Branded sign-in header. Previously only on /admin; now on every admin route. */
function AdminLoginHeader() {
  return (
    <div className="text-center mb-6 pt-8">
      <div className="h-16 w-16 rounded-xl bg-[var(--color-navy)] flex items-center justify-center mx-auto mb-4">
        <span className="text-white font-bold text-2xl">DC</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
      <p className="text-gray-600">Sign in to manage your website content</p>
    </div>
  );
}

export default function AdminAuthGate({ children }: { children: ReactNode }) {
  return (
    <Authenticator.Provider>
      <Authenticator hideSignUp components={{ Header: AdminLoginHeader }}>
        <AdminModeProvider>{children}</AdminModeProvider>
      </Authenticator>
    </Authenticator.Provider>
  );
}
