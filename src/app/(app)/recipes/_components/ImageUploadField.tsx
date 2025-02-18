"use client";

import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

interface ImageUploadFieldProps {
  existingImage?: string;
  onChange: (file: File) => void;
}

export function ImageUploadField({
  existingImage,
  onChange,
}: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(existingImage ?? null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      onChange(file);

      // Set up a local preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <div className="col-span-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative mt-2 min-h-[250px] items-center justify-center rounded-lg border ${
          dragging
            ? "border-green-500 bg-green-50"
            : "border-dashed border-gray-900/25"
        }`}
      >
        <div className="relative h-full text-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="max-h-[300px] w-full rounded-md object-cover"
            />
          ) : (
            <>
              <div className="mt-12 flex flex-col text-sm text-gray-600">
                <PhotoIcon
                  aria-hidden="true"
                  className="mx-auto mb-4 h-16 w-16 text-gray-300"
                />
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                >
                  <span>Upload Recipe Photo</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileInputChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-600">PNG, JPG, GIF up to 2MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
