import { useState } from "react";
import {
  Search,
  Plus,
  Menu,
  SlidersHorizontal,
  LayoutGrid,
  List as ListIcon,
} from "lucide-react";
import DropdownButton from "./DropdownButton";
import IconButton from "./IconButton";
import ToggleGroup from "./ToggleGroup";

const Header = ({ onMenuClick, onFilterToggle, isFilterOpen }) => {
  const [view, setView] = useState("grid");

  const viewOptions = [
    { id: "grid", icon: LayoutGrid, label: "Grid", title: "Grid view" },
    { id: "list", icon: ListIcon, label: "List", title: "List view" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3 flex-1">
          <IconButton
            icon={Menu}
            onClick={onMenuClick}
            className="md:hidden"
            variant="ghost"
          />

          <div className="flex h-10 flex-1 max-w-xl items-center gap-2 rounded-md border border-gray-300 px-3 focus-within:ring-2 focus-within:ring-blue-500">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search plans, tasks…"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition cursor-pointer">
            <Plus size={16} />
            New Plan
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
            onChange={setView}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
