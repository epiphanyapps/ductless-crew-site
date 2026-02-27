"use client";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AdminContent() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded bg-white flex items-center justify-center">
                <span className="text-[var(--color-navy)] font-bold">DC</span>
              </div>
              <span className="font-semibold">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">
                {user?.signInDetails?.loginId}
              </span>
              <button
                onClick={signOut}
                className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-1">
            {[
              { label: "Dashboard", href: "/admin", icon: "home" },
              { label: "Site Content", href: "/admin/content", icon: "edit" },
              { label: "Services", href: "/admin/services", icon: "tools" },
              { label: "Team Members", href: "/admin/team", icon: "users" },
              { label: "Testimonials", href: "/admin/testimonials", icon: "star" },
              { label: "Blog Posts", href: "/admin/blog", icon: "file" },
              { label: "FAQs", href: "/admin/faqs", icon: "help" },
              { label: "Media Library", href: "/admin/media", icon: "image" },
              { label: "Submissions", href: "/admin/submissions", icon: "inbox" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span className="w-5 h-5 bg-gray-200 rounded" />
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Services", value: "6", color: "bg-blue-500" },
              { label: "Team Members", value: "3", color: "bg-green-500" },
              { label: "Testimonials", value: "7", color: "bg-yellow-500" },
              { label: "Blog Posts", value: "5", color: "bg-purple-500" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl shadow-sm p-6 border"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg`} />
                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Edit Homepage", href: "/" },
                { label: "Add Blog Post", href: "/admin/blog/new" },
                { label: "Upload Images", href: "/admin/media" },
                { label: "View Submissions", href: "/admin/submissions" },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center justify-center gap-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              How to Edit Content
            </h2>
            <p className="text-blue-800">
              Visit any page on the public site while logged in. You&apos;ll see
              edit buttons appear on editable content. Click them to make
              changes directly on the page.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Authenticator
        components={{
          Header() {
            return (
              <div className="text-center mb-6">
                <div className="h-16 w-16 rounded-xl bg-[var(--color-navy)] flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">DC</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Login
                </h1>
                <p className="text-gray-600">
                  Sign in to manage your website content
                </p>
              </div>
            );
          },
        }}
      >
        <AdminContent />
      </Authenticator>
    </div>
  );
}
