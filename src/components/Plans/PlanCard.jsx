import React from "react";
import { FileText } from "lucide-react";

export default function PlanCard({ plan, onClick }) {
  return (
    <div
      className="overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-primary"
      onClick={() => onClick(plan)}
    >
      <div className="w-full aspect-[2/1.4] bg-gray-50 relative overflow-hidden">
        {plan.thumbnail ? (
          <img
            src={plan.thumbnail}
            alt={plan.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <FileText size={40} className="text-gray-300" />
          </div>
        )}
      </div>

      <div className="p-3 bg-white">
        <h4 className="text-sm font-medium text-gray-900 truncate">
          {plan.name}
        </h4>
        {plan.version && (
          <span className="block mt-1 text-xs text-gray-500">
            v{plan.version}
          </span>
        )}
      </div>
    </div>
  );
}
