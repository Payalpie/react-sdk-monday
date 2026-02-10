import React from "react";
import { X, AlertTriangle } from "lucide-react";

export default function DeleteProjectModal({ isOpen, onClose, onConfirm, project }) {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    if (project) {
      onConfirm(project);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div
        className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Delete Project</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 transition rounded hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">{project?.name}</span>? This action
            cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="h-10 px-4 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="h-10 px-4 text-sm font-medium text-white transition bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
}
