import React, { useState } from "react";
import { X, Pencil, Plus, Paperclip, MessageCircle } from "lucide-react";
import DropdownButton from "./DropdownButton";

export default function TaskModal({ isOpen, onClose, task, onTaskUpdate }) {
  const [formData, setFormData] = useState(task || {});
  const [activeTab, setActiveTab] = useState("details");

  // Dropdown options
  const statusOptions = [
    { id: "todo", label: "To Do" },
    { id: "in-progress", label: "In Progress" },
    { id: "done", label: "Done" },
  ];

  const priorityOptions = [
    { id: "low", label: "Low" },
    { id: "medium", label: "Medium" },
    { id: "high", label: "High" },
  ];

  const assigneeOptions = [
    { id: "", label: "Select assignee" },
    { id: "shreesh", label: "Shreesh" },
    { id: "user1", label: "User 1" },
    { id: "user2", label: "User 2" },
  ];

  if (!isOpen || !task) return null;

  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onTaskUpdate(formData);
    handleClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onKeyDown={handleKeyDown}
    >
      {/* Modal Container */}
      <div className="relative flex w-[90vw] h-[90vh] max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Left Panel - Main Task Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center flex-1 gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-sm font-bold text-orange-600">📋</span>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter title"
                  className="w-full text-lg font-semibold text-gray-900 bg-transparent border-0 outline-none focus:ring-0"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Task ID: {formData.taskId || "LT-100"}
                </p>
              </div>
              <button className="p-2 text-gray-400 rounded hover:text-gray-600 hover:bg-gray-100">
                <Pencil size={18} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex px-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-3 px-4 font-medium text-sm border-b-2 transition ${
                activeTab === "details"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`py-3 px-4 font-medium text-sm border-b-2 transition ${
                activeTab === "activity"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              Activity
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "details" && (
              <div className="p-6 space-y-6">
                {/* Related Tasks */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    Related Tasks
                  </h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">
                      + New task
                    </button>
                    <button className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">
                      + Existing task
                    </button>
                  </div>
                </div>

                {/* Checklist */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    Checklist
                  </h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">
                      + New item
                    </button>
                    <button className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">
                      + Add checklist
                    </button>
                  </div>
                </div>

                {/* Attachment Area */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    Attachments
                  </h3>
                  <div className="flex items-center justify-center w-full bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg aspect-video">
                    {formData.attachment ? (
                      <img
                        src={formData.attachment}
                        alt="Attachment"
                        className="object-cover w-full h-full rounded"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Paperclip size={24} />
                        <span className="text-sm">Click to attach or drag file</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="p-6">
                <p className="py-8 text-sm text-center text-gray-500">
                  No activity yet
                </p>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter message here..."
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="p-2 text-gray-400 hover:text-blue-600">
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Attributes */}
        <div className="flex flex-col h-full bg-white border-l border-gray-200 w-80">
          {/* Sticky Header */}
          <div className="sticky h-24.25 top-0 z-10 flex items-center justify-between p-6 bg-white border-b border-gray-200 shrink-0">
            <h3 className="text-sm font-semibold text-gray-900">
              Task Attributes
            </h3>
            <button
              onClick={handleClose}
              className="p-1 text-gray-400 rounded hover:text-gray-600 hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Status */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                Status
              </label>
              <DropdownButton
                options={statusOptions}
                value={formData.status || "todo"}
                onSelect={(value) => handleInputChange("status", value)}
                placeholder="Select status"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                Priority
              </label>
              <DropdownButton
                options={priorityOptions}
                value={formData.priority || "medium"}
                onSelect={(value) => handleInputChange("priority", value)}
                placeholder="Select priority"
              />
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={formData.category || ""}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="Select category"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Assignee */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                Assignee
              </label>
              <DropdownButton
                options={assigneeOptions}
                value={formData.assignee || ""}
                onSelect={(value) => handleInputChange("assignee", value)}
                placeholder="Select assignee"
              />
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={formData.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Enter location"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate || ""}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate || ""}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Manpower */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                Manpower
              </label>
              <input
                type="number"
                value={formData.manpower || ""}
                onChange={(e) =>
                  handleInputChange("manpower", parseInt(e.target.value) || 0)
                }
                placeholder="Number of people"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Cost */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                Cost
              </label>
              <input
                type="number"
                value={formData.cost || ""}
                onChange={(e) =>
                  handleInputChange("cost", parseFloat(e.target.value) || 0)
                }
                placeholder="Cost amount"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags || ""}
                onChange={(e) => handleInputChange("tags", e.target.value)}
                placeholder="Add tags (comma separated)"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Watchers */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                Watchers
              </label>
              <input
                type="text"
                value={formData.watchers || ""}
                onChange={(e) => handleInputChange("watchers", e.target.value)}
                placeholder="Add watchers"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sticky Action Buttons */}
          <div className="flex gap-2 p-4 bg-white border-t border-gray-200 shrink-0">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
