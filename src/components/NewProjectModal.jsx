import React, { useState } from "react";
import { X } from "lucide-react";

export default function NewProjectModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  const [projectName, setProjectName] = useState("");
  const [projectCode, setProjectCode] = useState("");

  const handleClose = () => {
    setProjectName("");
    setProjectCode("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim() && projectCode.trim()) {
      onSubmit({
        name: projectName.trim(),
        code: projectCode.trim(),
      });
      setProjectName("");
      setProjectCode("");
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
          <h2 className="text-xl font-semibold text-gray-900">Create new project</h2>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 transition rounded hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="projectName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="projectCode"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="projectCode"
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value)}
              placeholder="Enter project code"
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              type="submit"
              disabled={!projectName.trim() || !projectCode.trim()}
              className="h-10 px-4 text-sm font-medium text-white transition bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
