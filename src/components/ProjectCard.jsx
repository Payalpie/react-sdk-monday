import React from "react";
import { Star, Pencil, Trash2, Users } from "lucide-react";

export default function ProjectCard({
  project,
  onClick,
  onEdit,
  onDelete,
}) {
  return (
    <div
      onClick={() => onClick(project)}
      className="relative flex flex-col gap-3 p-3 transition bg-white border border-gray-200 rounded-lg cursor-pointer group hover:shadow-lg hover:border-gray-300 sm:gap-4 sm:p-4"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex items-center min-w-0 gap-2 sm:gap-3">
          {/* Accent */}
          <div className="w-1 h-5 mt-1 bg-blue-500 rounded-full shrink-0" />

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 break-words line-clamp-2 sm:line-clamp-1">
              {project.name}
            </h3>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 transition opacity-0 group-hover:opacity-100 shrink-0 sm:gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-1.5 rounded-md hover:bg-gray-100 cursor-pointer touch-manipulation"
            title="Favorite"
          >
            <Star
              size={14}
              className={
                project.isFavorite
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-400"
              }
            />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(project);
            }}
            className="p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-blue-600 cursor-pointer touch-manipulation"
            title="Edit"
          >
            <Pencil size={14} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(project);
            }}
            className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 cursor-pointer touch-manipulation"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <Users size={14} className="shrink-0" />
          <span>{project.memberCount} members</span>
        </div>

        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 shrink-0">
          Active
        </span>
      </div>
    </div>
  );
}
