import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeFolderModal } from "../store/folderSlice";
import { closePlanModal } from "../store/planSlice";
import PlanGrid from "../components/Plans/PlanGrid";
import PlanList from "../components/Plans/PlanList";
import NewFolderModal from "../components/NewFolderModal";
import NewPlanModal from "../components/NewPlanModal";

export default function ProjectList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const view = useSelector((state) => state.view.currentView);
  const isModalOpen = useSelector((state) => state.folder.isModalOpen);
  const isPlanModalOpen = useSelector((state) => state.plan.isModalOpen);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load folders for the specific project
    const mockData = [
      {
        id: "folder-1",
        name: "Untitled plans",
        planCount: 0,
        plans: [],
      },
      {
        id: "folder-2",
        name: `${projectId} - Floorplan V4.1`,
        planCount: 12,
        plans: [
          { id: "plan-1", name: "1", thumbnail: null, version: null },
          { id: "plan-2", name: "4.1Pr", thumbnail: null, version: null },
          { id: "plan-3", name: "LT-100", thumbnail: null, version: null },
          { id: "plan-4", name: "LT-101", thumbnail: null, version: null },
          { id: "plan-5", name: "LT-102", thumbnail: null, version: null },
          { id: "plan-6", name: "LV-100", thumbnail: null, version: null },
          { id: "plan-7", name: "LV-101", thumbnail: null, version: null },
          { id: "plan-8", name: "LV-102", thumbnail: null, version: null },
          { id: "plan-9", name: "LV-103", thumbnail: null, version: null },
          { id: "plan-10", name: "LV-104", thumbnail: null, version: null },
          { id: "plan-11", name: "LV-105", thumbnail: null, version: null },
          { id: "plan-12", name: "LV-106", thumbnail: null, version: null },
        ],
      },
    ];

    setTimeout(() => {
      setFolders(mockData);
      setLoading(false);
    }, 500);
  }, [projectId]);

  const handlePlanClick = (plan) => {
    console.log("Opening plan:", plan.name);
    navigate(`/project/${plan.id}`);
  };

  const handleNewPlan = () => {
    console.log("Creating new plan");
  };

  const handleCreatePlan = (planData) => {
    const { name, folderId, file } = planData;
    
    // Find the folder and add the plan to it
    setFolders((prevFolders) =>
      prevFolders.map((folder) => {
        if (folder.id === folderId) {
          const newPlan = {
            id: `plan-${Date.now()}`,
            name,
            thumbnail: null,
            version: null,
            fileName: file?.name || null,
          };
          return {
            ...folder,
            plans: [...folder.plans, newPlan],
            planCount: folder.plans.length + 1,
          };
        }
        return folder;
      })
    );
  };

  const handleCreateFolder = (folderName) => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name: folderName,
      planCount: 0,
      plans: [],
    };
    setFolders([...folders, newFolder]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-gray-500">Loading plans...</div>
      </div>
    );
  }

  return (
    <>
      <div>
        {view === "grid" ? (
          <PlanGrid
            folders={folders}
            onPlanClick={handlePlanClick}
            onNewPlan={handleNewPlan}
          />
        ) : (
          <PlanList
            folders={folders}
            onPlanClick={handlePlanClick}
            onNewPlan={handleNewPlan}
          />
        )}
      </div>

      <NewFolderModal
        isOpen={isModalOpen}
        onClose={() => dispatch(closeFolderModal())}
        onSubmit={handleCreateFolder}
      />

      <NewPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => dispatch(closePlanModal())}
        onSubmit={handleCreatePlan}
        folders={folders}
      />
    </>
  );
}
