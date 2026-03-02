"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { AdminLayout } from "@/components/admin";
import { useState, useEffect, useCallback } from "react";
import { client } from "@/lib/amplify-client";

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  features?: (string | null)[] | null;
  order?: number | null;
  isActive?: boolean | null;
}

interface ServiceForm {
  title: string;
  description: string;
  icon: string;
  features: string;
  order: number;
  isActive: boolean;
}

const defaultForm: ServiceForm = {
  title: "",
  description: "",
  icon: "",
  features: "",
  order: 0,
  isActive: true,
};

function ServicesContent() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<ServiceForm>(defaultForm);
  const [isSaving, setIsSaving] = useState(false);

  const loadServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, errors } = await client.models.Service.list();
      if (errors) throw new Error(errors[0]?.message);
      const sortedServices = (data || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setServices(sortedServices as Service[]);
    } catch (err) {
      console.error("Error loading services:", err);
      setError("Failed to load services.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setForm({
        title: service.title,
        description: service.description,
        icon: service.icon || "",
        features: (service.features || []).filter(Boolean).join("\n"),
        order: service.order || 0,
        isActive: service.isActive !== false,
      });
    } else {
      setEditingService(null);
      setForm(defaultForm);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const features = form.features.split("\n").filter(Boolean);

      if (editingService) {
        await client.models.Service.update({
          id: editingService.id,
          title: form.title,
          description: form.description,
          icon: form.icon || undefined,
          features,
          order: form.order,
          isActive: form.isActive,
        });
      } else {
        await client.models.Service.create({
          title: form.title,
          description: form.description,
          icon: form.icon || undefined,
          features,
          order: form.order,
          isActive: form.isActive,
        });
      }

      await loadServices();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save service.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (service: Service) => {
    if (!confirm(`Delete "${service.title}"?`)) return;
    try {
      await client.models.Service.delete({ id: service.id });
      setServices((prev) => prev.filter((s) => s.id !== service.id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete service.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <button
          onClick={() => openModal()}
          className="bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Add Service
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
      ) : services.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <p className="text-gray-500">No services found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Title</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Status</th>
                <th className="text-left p-4 font-semibold hidden sm:table-cell">Order</th>
                <th className="text-right p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-medium">{service.title}</p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">{service.description}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className={`px-2 py-1 text-xs rounded-full ${service.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 hidden sm:table-cell text-gray-600">{service.order}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openModal(service)} className="p-2 text-gray-600 hover:text-[var(--color-orange)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(service)} className="p-2 text-gray-600 hover:text-red-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">{editingService ? "Edit Service" : "Add Service"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon (emoji or class)</label>
                <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., bolt, snowflake" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                <textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg" placeholder="Feature 1&#10;Feature 2" />
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
                {isSaving ? "Saving..." : "Save Service"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default function ServicesAdminPage() {
  return (
    <Authenticator>
      <ServicesContent />
    </Authenticator>
  );
}
