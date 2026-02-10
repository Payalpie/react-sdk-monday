import React, { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import DropdownButton from "./DropdownButton";

export default function NewPlanModal({
  isOpen,
  onClose,
  onSubmit,
  folders = [],
}) {
  const [planName, setPlanName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleClose = () => {
    setPlanName("");
    setSelectedFolder("");
    setUploadedFile(null);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (planName.trim() && selectedFolder) {
      onSubmit({
        name: planName.trim(),
        folderId: selectedFolder,
        file: uploadedFile,
      });
      handleClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  if (!isOpen) return null;

  const folderOptions = folders.map((folder) => ({
    id: folder.id,
    label: folder.name,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div
        className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Create New Plan
          </h2>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 transition rounded cursor-pointer hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="planName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Plan Name
            </label>
            <input
              type="text"
              id="planName"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Enter plan name"
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Upload File
            </label>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.svg"
            />

            <button
              type="button"
              onClick={handleUploadClick}
              className="flex flex-col items-center justify-center w-full gap-3 px-4 py-6 text-center transition border-2 border-gray-300 border-dashed rounded-lg cursor-pointer group bg-gray-50 hover:border-blue-400 hover:bg-blue-50 focus:outline-none"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-blue-300">
                <Upload className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">
                  {uploadedFile ? (
                    <span className="text-blue-600">{uploadedFile.name}</span>
                  ) : (
                    "Click to upload or drag and drop"
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DWG, DXF, PNG, JPG, SVG
                </p>
              </div>
            </button>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Folder
            </label>
            <DropdownButton
              options={folderOptions}
              value={selectedFolder}
              onSelect={setSelectedFolder}
              placeholder="Choose a folder"
              disabled={folderOptions.length === 0}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="h-10 px-4 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!planName.trim() || !selectedFolder || !uploadedFile}
              className="h-10 px-4 text-sm font-medium text-white transition bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
