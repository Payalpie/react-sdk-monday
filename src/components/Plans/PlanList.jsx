import React from "react";
import { FileText } from "lucide-react";
import FolderSection from "./FolderSection";

export default function PlanList({ folders, onPlanClick, onNewPlan }) {
  return (
    <div>
      {folders.map((folder) => (
        <FolderSection key={folder.id} folder={folder}>
          <div className="space-y-2">
            {folder.plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => onPlanClick(plan)}
                className="flex items-center gap-4 p-4 transition-all duration-200 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-primary hover:bg-primary-light"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded">
                  <FileText size={24} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {plan.name}
                  </h4>
                  {plan.version && (
                    <p className="text-xs text-gray-500">
                      Version {plan.version}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div
              className="flex items-center gap-4 p-4 transition-all duration-200 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:border-primary hover:bg-primary-light"
              onClick={onNewPlan}
            >
              <div className="flex items-center justify-center w-16 h-16">
                <FileText size={24} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-normal text-gray-500">
                  + New plan
                </h4>
              </div>
            </div>
          </div>
        </FolderSection>
      ))}

      <div className="pt-4 mt-6 text-center border-t border-gray-200">
        <span className="text-sm text-gray-500">
          {folders.reduce((sum, folder) => sum + folder.planCount, 0)} plans
        </span>
      </div>
    </div>
  );
}
