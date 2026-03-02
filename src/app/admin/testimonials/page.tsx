"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { AdminLayout } from "@/components/admin";
import { useState, useEffect, useCallback } from "react";
import { client } from "@/lib/amplify-client";

interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  order?: number | null;
  isActive?: boolean | null;
}

interface TestimonialForm {
  customerName: string;
  rating: number;
  text: string;
  order: number;
  isActive: boolean;
}

const defaultForm: TestimonialForm = {
  customerName: "",
  rating: 5,
  text: "",
  order: 0,
  isActive: true,
};

function TestimonialsContent() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<TestimonialForm>(defaultForm);
  const [isSaving, setIsSaving] = useState(false);

  const loadTestimonials = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, errors } = await client.models.Testimonial.list();
      if (errors) throw new Error(errors[0]?.message);
      const sorted = (data || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setTestimonials(sorted as Testimonial[]);
    } catch (err) {
      console.error("Error loading testimonials:", err);
      setError("Failed to load testimonials.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  const openModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setForm({
        customerName: item.customerName,
        rating: item.rating,
        text: item.text,
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
        await client.models.Testimonial.update({
          id: editingItem.id,
          customerName: form.customerName,
          rating: form.rating,
          text: form.text,
          order: form.order,
          isActive: form.isActive,
        });
      } else {
        await client.models.Testimonial.create({
          customerName: form.customerName,
          rating: form.rating,
          text: form.text,
          order: form.order,
          isActive: form.isActive,
        });
      }

      await loadTestimonials();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save testimonial.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: Testimonial) => {
    if (!confirm(`Delete testimonial from "${item.customerName}"?`)) return;
    try {
      await client.models.Testimonial.delete({ id: item.id });
      setTestimonials((prev) => prev.filter((t) => t.id !== item.id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete testimonial.");
    }
  };

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
        <button
          onClick={() => openModal()}
          className="bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Add Testimonial
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
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <p className="text-gray-500">No testimonials found.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="text-yellow-500 text-lg">{renderStars(item.rating)}</div>
                <div className="flex gap-1">
                  <button onClick={() => openModal(item)} className="p-2 text-gray-600 hover:text-[var(--color-orange)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(item)} className="p-2 text-gray-600 hover:text-red-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">&ldquo;{item.text}&rdquo;</p>
              <p className="font-semibold text-gray-900">— {item.customerName}</p>
              <span className={`mt-2 inline-block px-2 py-1 text-xs rounded-full ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                {item.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">{editingItem ? "Edit Testimonial" : "Add Testimonial"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Customer Name *</label>
                <input type="text" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className={`text-2xl ${star <= form.rating ? "text-yellow-500" : "text-gray-300"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Testimonial Text *</label>
                <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4} className="w-full px-3 py-2 border rounded-lg" required />
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
                {isSaving ? "Saving..." : "Save Testimonial"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default function TestimonialsAdminPage() {
  return (
    <Authenticator>
      <TestimonialsContent />
    </Authenticator>
  );
}
