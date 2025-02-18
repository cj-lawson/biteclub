"use client";

import { useState } from "react";
import { ImageUploadField } from "./ImageUploadField";
import { InputField } from "./InputField";

interface RecipeFormData {
  name: string;
  description: string;
  mainImage?: File;
}

interface RecipeFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function RecipeForm({ onSubmit }: RecipeFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState<RecipeFormData>({
    name: "",
    description: "",
  });

  const handleImageUpload = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      mainImage: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name);
      submitFormData.append("description", formData.description);
      if (formData.mainImage) {
        submitFormData.append("mainImage", formData.mainImage);
      }

      // Print out what keys/values are in the FormData:
      submitFormData.forEach((value, key) => {
        if (value instanceof File) {
          console.log(key, value.name, value.type);
        } else {
          console.log(key, value);
        }
      });

      // Now call the server action prop with the form data
      await onSubmit(submitFormData);
      alert("Recipe created successfully!");
    } catch (error) {
      console.log("error creating recipe:", error);
      alert("Something went wrong, please try again");
    } finally {
      setIsPending(false);
      //   window.location.href = "/dashboard";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <ImageUploadField
        label="Cover Photo"
        id="mainImage"
        onChange={handleImageUpload}
      />
      <InputField
        label="Recipe Title"
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <InputField
        label="Description"
        id="description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        {isPending ? "Submitting..." : "Create Recipe"}
      </button>
    </form>
  );
}
