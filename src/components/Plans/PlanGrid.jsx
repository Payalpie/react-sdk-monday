import React from "react";
import PlanCard from "./PlanCard";
import FolderSection from "./FolderSection";
import { FileText } from "lucide-react";

export default function PlanGrid({ folders, onPlanClick, onNewPlan }) {
  return (
    <div>
      {folders.map((folder) => (
        <FolderSection key={folder.id} folder={folder}>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {folder.plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onClick={onPlanClick} />
            ))}

            <div
              className="overflow-hidden transition-all duration-200 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:border-primary hover:bg-primary-light"
              onClick={onNewPlan}
            >
              <div className="w-full aspect-[2/1.4] flex items-center justify-center">
                <FileText size={30} className="text-gray-400" />
              </div>
              <div className="p-3 bg-transparent">
                <h4 className="text-sm font-normal text-center text-gray-500">
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
