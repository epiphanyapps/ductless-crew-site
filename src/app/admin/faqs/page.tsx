"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { AdminLayout } from "@/components/admin";
import { useState, useEffect, useCallback } from "react";
import { client } from "@/lib/amplify-client";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order?: number | null;
  isActive?: boolean | null;
}

interface FAQForm {
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

const defaultForm: FAQForm = {
  question: "",
  answer: "",
  order: 0,
  isActive: true,
};

function FAQsContent() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<FAQ | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<FAQForm>(defaultForm);
  const [isSaving, setIsSaving] = useState(false);

  const loadFAQs = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, errors } = await client.models.FAQ.list();
      if (errors) throw new Error(errors[0]?.message);
      const sorted = (data || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setFaqs(sorted as FAQ[]);
    } catch (err) {
      console.error("Error loading FAQs:", err);
      setError("Failed to load FAQs.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFAQs();
  }, [loadFAQs]);

  const openModal = (item?: FAQ) => {
    if (item) {
      setEditingItem(item);
      setForm({
        question: item.question,
        answer: item.answer,
        order: item.order || 0,
        isActive: item.isActive !== false,
      });
    } else {
      setEditingItem(null);
      setForm(defaultForm);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      if (editingItem) {
        await client.models.FAQ.update({
          id: editingItem.id,
          question: form.question,
          answer: form.answer,
          order: form.order,
          isActive: form.isActive,
        });
      } else {
        await client.models.FAQ.create({
          question: form.question,
          answer: form.answer,
          order: form.order,
          isActive: form.isActive,
        });
      }

      await loadFAQs();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save FAQ.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: FAQ) => {
    if (!confirm("Delete this FAQ?")) return;
    try {
      await client.models.FAQ.delete({ id: item.id });
      setFaqs((prev) => prev.filter((f) => f.id !== item.id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete FAQ.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
        <button
          onClick={() => openModal()}
          className="bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Add FAQ
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
      ) : faqs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <p className="text-gray-500">No FAQs found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{item.question}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.answer}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => openModal(item)} className="p-2 text-gray-600 hover:text-[var(--color-orange)]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(item)} className="p-2 text-gray-600 hover:text-red-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
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
              <h3 className="font-semibold">{editingItem ? "Edit FAQ" : "Add FAQ"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Question *</label>
                <input type="text" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Answer *</label>
                <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} className="w-full px-3 py-2 border rounded-lg" required />
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
                {isSaving ? "Saving..." : "Save FAQ"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default function FAQsAdminPage() {
  return (
    <Authenticator>
      <FAQsContent />
    </Authenticator>
  );
}
