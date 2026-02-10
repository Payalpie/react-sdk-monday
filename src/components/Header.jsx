import {
  Search,
  Plus,
  Menu,
  SlidersHorizontal,
  LayoutGrid,
  List as ListIcon,
  Folder,
  ChevronLeft,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { openFolderModal } from "../store/folderSlice";
import { openPlanModal } from "../store/planSlice";
import DropdownButton from "./DropdownButton";
import IconButton from "./IconButton";
import ToggleGroup from "./ToggleGroup";

const Header = ({
  onMenuClick,
  onFilterToggle,
  isFilterOpen,
  view,
  onViewChange,
  showProjectActions = false,
  onNewProject,
  isPlanDetailsPage = false,
  onBackToProjects,
}) => {
  const dispatch = useDispatch();

  const handleNewPlan = () => {
    dispatch(openPlanModal());
  };

  const handleNewFolder = () => {
    dispatch(openFolderModal());
  };

  const viewOptions = [
    { id: "grid", icon: LayoutGrid, label: "Grid", title: "Grid view" },
    { id: "list", icon: ListIcon, label: "List", title: "List view" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between gap-2 px-3 h-14 sm:h-16 sm:gap-4 sm:px-4 md:px-6">
        <div className="flex items-center flex-1 min-w-0 gap-2 sm:gap-3">
          {isPlanDetailsPage && onBackToProjects && (
            <button
              onClick={onBackToProjects}
              className="flex items-center h-10 gap-2 px-3 transition border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ChevronLeft size={20} />
              <span>All plans</span>
            </button>
          )}

          {showProjectActions && !isPlanDetailsPage && (
            <IconButton
              icon={Menu}
              onClick={onMenuClick}
              className="md:hidden"
              variant="ghost"
            />
          )}

          {!showProjectActions && !isPlanDetailsPage && (
            <div className="text-lg font-bold text-blue-600 sm:text-xl">
              PlanView
            </div>
          )}

          {showProjectActions && !isPlanDetailsPage && (
            <div className="flex items-center flex-1 h-10 max-w-xl gap-2 px-3 border border-gray-300 rounded-md">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search plans, tasks…"
                className="w-full text-sm bg-transparent outline-none"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!showProjectActions && !isPlanDetailsPage && onNewProject && (
            <button
              onClick={onNewProject}
              className="inline-flex items-center h-10 gap-2 px-3 text-sm font-medium text-white transition bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 sm:px-4"
            >
              <Plus size={16} className="shrink-0" />
              <span className="hidden xs:inline sm:inline">New project</span>
              <span className="inline xs:hidden sm:hidden">New</span>
            </button>
          )}

          {showProjectActions && !isPlanDetailsPage && (
            <>
              <button
                onClick={handleNewPlan}
                className="items-center hidden h-10 gap-2 px-4 text-sm font-medium text-white transition bg-blue-600 rounded-md cursor-pointer sm:inline-flex hover:bg-blue-700"
              >
                <Plus size={16} />
                New Plan
              </button>

              <button
                className="items-center hidden h-10 gap-2 px-4 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 rounded-md cursor-pointer sm:inline-flex hover:bg-gray-50"
                onClick={handleNewFolder}
              >
                <Folder size={16} />
                New Folder
              </button>

              <DropdownButton
                label="Filters"
                icon={SlidersHorizontal}
                onClick={onFilterToggle}
                isActive={isFilterOpen}
                showChevron={false}
              />

              <ToggleGroup
                options={viewOptions}
                value={view}
                onChange={onViewChange}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
