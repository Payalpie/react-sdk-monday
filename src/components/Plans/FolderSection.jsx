import React, { useState } from "react";
import { Folder, ChevronDown, ChevronRight } from "lucide-react";

export default function FolderSection({ folder, children }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-8">
      <div
        className="flex items-center justify-between px-4 py-3 mb-4 transition-colors rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2.5">
          <Folder className="w-4 h-4 text-gray-500" />
          <span className="text-[15px] font-semibold text-gray-900">
            {folder.name}
          </span>
          <span className="text-[13px] text-gray-500 ml-1">
            ({folder.planCount} plans)
          </span>
        </div>

        <button className="p-1 text-gray-500 hover:text-gray-700">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>

      {isExpanded && <div className="px-4">{children}</div>}
    </div>
  );
}
