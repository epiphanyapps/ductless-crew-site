"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { AdminLayout } from "@/components/admin";
import { useState, useEffect, useCallback } from "react";
import { client } from "@/lib/amplify-client";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  imageUrl?: string | null;
  order?: number | null;
  isActive?: boolean | null;
}

interface TeamMemberForm {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
}

const defaultForm: TeamMemberForm = {
  name: "",
  role: "",
  bio: "",
  imageUrl: "",
  order: 0,
  isActive: true,
};

function TeamContent() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<TeamMemberForm>(defaultForm);
  const [isSaving, setIsSaving] = useState(false);

  const loadMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, errors } = await client.models.TeamMember.list();
      if (errors) throw new Error(errors[0]?.message);
      const sortedMembers = (data || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setMembers(sortedMembers as TeamMember[]);
    } catch (err) {
      console.error("Error loading team:", err);
      setError("Failed to load team members.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const openModal = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setForm({
        name: member.name,
        role: member.role,
        bio: member.bio || "",
        imageUrl: member.imageUrl || "",
        order: member.order || 0,
        isActive: member.isActive !== false,
      });
    } else {
      setEditingMember(null);
      setForm(defaultForm);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      if (editingMember) {
        await client.models.TeamMember.update({
          id: editingMember.id,
          name: form.name,
          role: form.role,
          bio: form.bio || undefined,
          imageUrl: form.imageUrl || undefined,
          order: form.order,
          isActive: form.isActive,
        });
      } else {
        await client.models.TeamMember.create({
          name: form.name,
          role: form.role,
          bio: form.bio || undefined,
          imageUrl: form.imageUrl || undefined,
          order: form.order,
          isActive: form.isActive,
        });
      }

      await loadMembers();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save team member.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (member: TeamMember) => {
    if (!confirm(`Delete "${member.name}"?`)) return;
    try {
      await client.models.TeamMember.delete({ id: member.id });
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete team member.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
        <button
          onClick={() => openModal()}
          className="bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Add Member
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--color-orange)] border-t-transparent rounded-full mx-auto" />
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <p className="text-gray-500">No team members found.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-xl border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-full bg-[var(--color-navy)] flex items-center justify-center text-white text-xl font-bold">
                  {member.name[0]}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openModal(member)} className="p-2 text-gray-600 hover:text-[var(--color-orange)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(member)} className="p-2 text-gray-600 hover:text-red-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-[var(--color-orange)] text-sm mb-2">{member.role}</p>
              {member.bio && <p className="text-gray-600 text-sm line-clamp-2">{member.bio}</p>}
              <div className="mt-3 flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${member.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                  {member.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">{editingMember ? "Edit Team Member" : "Add Team Member"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role *</label>
                <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo URL</label>
                <input type="text" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4" />
                    <span className="text-sm">Active</span>
                  </label>
                </div>
              </div>
              <button type="submit" disabled={isSaving} className="w-full bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] disabled:opacity-50 text-white py-2 rounded-lg font-semibold">
                {isSaving ? "Saving..." : "Save Member"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default function TeamAdminPage() {
  return (
    <Authenticator>
      <TeamContent />
    </Authenticator>
  );
}
