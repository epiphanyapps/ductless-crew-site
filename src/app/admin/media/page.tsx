"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { AdminLayout } from "@/components/admin";
import { useState, useEffect, useCallback } from "react";
import { uploadData, list, remove, getUrl } from "aws-amplify/storage";

interface StorageImage {
  key: string;
  url: string;
  lastModified?: Date;
  size?: number;
}

type ImageCategory = "hero" | "team" | "services" | "blog" | "testimonials" | "gallery";

const categories: { id: ImageCategory; label: string }[] = [
  { id: "hero", label: "Hero Images" },
  { id: "team", label: "Team Photos" },
  { id: "services", label: "Service Images" },
  { id: "blog", label: "Blog Images" },
  { id: "testimonials", label: "Testimonials" },
  { id: "gallery", label: "Gallery" },
];

function MediaLibraryContent() {
  const [selectedCategory, setSelectedCategory] = useState<ImageCategory>("gallery");
  const [images, setImages] = useState<StorageImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<StorageImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadImages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await list({
        path: `images/${selectedCategory}/`,
      });

      const imagePromises = result.items.map(async (item) => {
        const urlResult = await getUrl({ path: item.path });
        return {
          key: item.path,
          url: urlResult.url.toString(),
          lastModified: item.lastModified,
          size: item.size,
        };
      });

      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages.filter((img) => !img.key.endsWith("/")));
    } catch (err) {
      console.error("Error loading images:", err);
      setError("Failed to load images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const uploadPromises = Array.from(files).map(async (file, index) => {
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const path = `images/${selectedCategory}/${fileName}`;

        await uploadData({
          path,
          data: file,
          options: {
            contentType: file.type,
            onProgress: ({ transferredBytes, totalBytes }) => {
              if (totalBytes) {
                const progress = ((index + transferredBytes / totalBytes) / files.length) * 100;
                setUploadProgress(Math.round(progress));
              }
            },
          },
        }).result;
      });

      await Promise.all(uploadPromises);
      await loadImages();
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload images. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      e.target.value = "";
    }
  };

  const handleDelete = async (image: StorageImage) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      await remove({ path: image.key });
      setImages((prev) => prev.filter((img) => img.key !== image.key));
      setSelectedImage(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete image. Please try again.");
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
        <label className="cursor-pointer bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white px-4 py-2 rounded-lg font-semibold transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? `Uploading ${uploadProgress}%...` : "Upload Images"}
        </label>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedCategory === cat.id
                ? "bg-[var(--color-navy)] text-white"
                : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="mb-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-orange)] transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Images Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--color-orange)] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Loading images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-500 mb-2">No images in this category</p>
          <p className="text-sm text-gray-400">
            Upload images using the button above
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image) => (
            <button
              key={image.key}
              onClick={() => setSelectedImage(image)}
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-[var(--color-orange)] transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.key.split("/").pop() || "Image"}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Detail Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Image Details</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.url}
                alt="Selected"
                className="w-full max-h-96 object-contain bg-gray-100 rounded-lg mb-4"
              />
              <div className="space-y-2 text-sm">
                <p><strong>File:</strong> {selectedImage.key.split("/").pop()}</p>
                <p><strong>Size:</strong> {formatFileSize(selectedImage.size)}</p>
                {selectedImage.lastModified && (
                  <p><strong>Uploaded:</strong> {selectedImage.lastModified.toLocaleString()}</p>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => copyToClipboard(selectedImage.url)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Copy URL
                </button>
                <button
                  onClick={() => handleDelete(selectedImage)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default function MediaPage() {
  return (
    <Authenticator>
      <MediaLibraryContent />
    </Authenticator>
  );
}
