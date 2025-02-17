"use client";

import React, { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { GlobeAltIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function ImportRecipeButton() {
  // Tracks if the FIRST modal is open
  const [isStep1Open, setIsStep1Open] = useState(false);

  // Tracks if the SECOND modal (for import) is open
  const [isStep2Open, setIsStep2Open] = useState(false);

  const [loading, setLoading] = useState(false);
  const [recipeUrl, setRecipeUrl] = useState("");

  const router = useRouter();

  // Show the Step 1 modal
  const openStep1 = () => {
    setIsStep1Open(true);
  };

  // Close Step 1 modal
  const closeStep1 = () => {
    setIsStep1Open(false);
  };

  // Show Step 2 modal (and close Step 1)
  const goToStep2 = () => {
    closeStep1();
    setRecipeUrl("");
    setIsStep2Open(true);
  };

  // Close Step 2 modal
  const closeStep2 = () => {
    setIsStep2Open(false);
  };

  const handleCreateClick = () => {
    // Possibly navigate to some route for creating a recipe from scratch
    router.push("/create-recipe");
  };

  // Calls your import-recipe API
  const handleImport = async () => {
    if (!recipeUrl.trim()) {
      alert("Please enter a recipe URL.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/import-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: recipeUrl }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      alert("Recipe imported successfully! Check console for details.");
      console.log("Imported Recipe:", data.recipe);

      // Optionally, close step 2 modal or navigate somewhere
      closeStep2();
    } catch (error: any) {
      alert(`Error importing recipe: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Button that opens Step 1 modal */}
      <button
        onClick={openStep1}
        className="rounded-full bg-green-600 px-5 py-3 font-semibold text-white"
      >
        Add Recipe
      </button>

      {/* STEP 1 MODAL */}
      <Transition show={isStep1Open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeStep1}>
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-end justify-center">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="translate-y-full opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-full opacity-0"
            >
              <Dialog.Panel className="w-full max-w-lg rounded-t-2xl bg-white p-10 shadow-lg">
                <DialogTitle className="mb-12 text-center text-lg font-bold">
                  Add New Recipe
                </DialogTitle>

                <div className="mb-4 mt-6 flex justify-center gap-4">
                  <button
                    onClick={handleCreateClick}
                    disabled={loading}
                    className="flex flex-col items-center rounded-md px-5 py-3 text-sm font-semibold text-green-800"
                  >
                    <span className="mb-2 w-full rounded-md bg-green-100 py-6 text-green-700">
                      <PencilSquareIcon className="ml-auto mr-auto w-8" />
                    </span>
                    {loading ? "Loading..." : "Create from scratch"}
                  </button>

                  <button
                    onClick={goToStep2}
                    disabled={loading}
                    className="flex flex-col items-center rounded-md px-5 py-3 text-sm font-semibold text-green-800"
                  >
                    <span className="mb-2 w-full rounded-md bg-green-100 py-6 text-green-700">
                      <GlobeAltIcon className="ml-auto mr-auto w-8" />
                    </span>
                    {loading ? "Loading..." : "Import from Website"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* STEP 2 MODAL */}
      <Transition show={isStep2Open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeStep2}>
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-end justify-center">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="translate-y-full opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-full opacity-0"
            >
              <Dialog.Panel className="w-full max-w-lg rounded-t-2xl bg-white p-10 shadow-lg">
                <DialogTitle className="mb-6 text-center text-lg font-bold">
                  Import Recipe
                </DialogTitle>

                <label htmlFor="recipe-url" className="mb-2 block font-medium">
                  Recipe URL:
                </label>
                <input
                  id="recipe-url"
                  type="text"
                  value={recipeUrl}
                  onChange={(e) => setRecipeUrl(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="https://example.com/my-favorite-recipe"
                />

                {/* Buttons to Import or Cancel */}
                <div className="mt-6 flex justify-end gap-2">
                  {/* Cancel / Go Back */}
                  <button
                    onClick={closeStep2}
                    className="w-full rounded-md bg-gray-200 px-4 py-2 text-gray-800"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleImport}
                    disabled={loading}
                    className="w-full rounded-md bg-green-600 px-4 py-2 text-white"
                  >
                    {loading ? "Importing..." : "Import Recipe"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
