"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { AdminLayout } from "@/components/admin";
import Link from "next/link";

function DashboardContent() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { label: "Services", value: "6", color: "bg-blue-500", href: "/admin/services" },
          { label: "Team Members", value: "3", color: "bg-green-500", href: "/admin/team" },
          { label: "Testimonials", value: "7", color: "bg-yellow-500", href: "/admin/testimonials" },
          { label: "Blog Posts", value: "5", color: "bg-purple-500", href: "/admin/blog" },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Add Blog Post", href: "/admin/blog/new", icon: "plus" },
              { label: "Upload Images", href: "/admin/media", icon: "upload" },
              { label: "View Submissions", href: "/admin/submissions", icon: "inbox" },
              { label: "Edit Services", href: "/admin/services", icon: "edit" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {action.icon === "plus" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  )}
                  {action.icon === "upload" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  )}
                  {action.icon === "inbox" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  )}
                  {action.icon === "edit" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  )}
                </svg>
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Submissions
            </h2>
            <Link
              href="/admin/submissions"
              className="text-sm text-[var(--color-orange)] hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            <p className="text-gray-500 text-sm text-center py-8">
              No recent submissions to display.
              <br />
              <span className="text-xs">Submissions from the contact form will appear here.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          How to Edit Content
        </h2>
        <p className="text-blue-800 text-sm">
          Use the sidebar navigation to manage different types of content. You can edit services,
          team members, testimonials, blog posts, and FAQs from their respective pages. For inline
          editing on the public site, visit any page while logged in and look for edit buttons.
        </p>
      </div>
    </AdminLayout>
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
        <DashboardContent />
      </Authenticator>
    </div>
  );
}
