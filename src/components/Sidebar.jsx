import {
  FileText,
  ClipboardList,
  CheckSquare,
  Image,
  Folder,
  FileCheck,
  Star,
  Eye,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import IconButton from "./IconButton";

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-gray-100">
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
        {!isCollapsed && (
          <span className="text-lg font-semibold truncate">Baird</span>
        )}
        {onToggle && (
          <IconButton
            icon={isCollapsed ? ChevronRight : ChevronLeft}
            onClick={onToggle}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            variant="ghost-dark"
            size={20}
          />
        )}
      </div>

      <nav className="flex-1 min-h-0 py-4 text-sm">
        {!isCollapsed ? (
          <>
            <Section title="FIELD MANAGEMENT">
              <NavItem icon={FileText} label="Plans" />
              <NavItem icon={ClipboardList} label="Specifications" />
              <NavItem icon={CheckSquare} label="Tasks" />
              <NavItem icon={Image} label="Photos" />
              <NavItem icon={Folder} label="Files" />
              <NavItem icon={FileCheck} label="Forms" />
            </Section>

            <Section title="PROJECT MANAGEMENT">
              <NavItem icon={Star} label="My Tasks" active />
              <NavItem icon={Eye} label="Watched Tasks" />
              <NavItem icon={List} label="All Tasks" badge="45" />
            </Section>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <CollapsedNavItem icon={FileText} label="Plans" />
            <CollapsedNavItem icon={ClipboardList} label="Specifications" />
            <CollapsedNavItem icon={CheckSquare} label="Tasks" />
            <CollapsedNavItem icon={Image} label="Photos" />
            <CollapsedNavItem icon={Folder} label="Files" />
            <CollapsedNavItem icon={FileCheck} label="Forms" />

            <div className="my-3 h-px w-6 bg-gray-700" />

            <CollapsedNavItem icon={Star} label="My Tasks" active />
            <CollapsedNavItem icon={Eye} label="Watched Tasks" />
            <CollapsedNavItem icon={List} label="All Tasks" badge="45" />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;

const Section = ({ title, children }) => (
  <div className="mb-6 px-3">
    <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
      {title}
    </p>
    <ul className="space-y-1">{children}</ul>
  </div>
);

const NavItem = ({ icon: Icon, label, badge, active }) => (
  <li
    className={`flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer transition
      ${active ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
  >
    <Icon size={18} />
    <span className="flex-1">{label}</span>
    {badge && (
      <span className="text-xs rounded-full bg-gray-700 px-2 py-0.5">
        {badge}
      </span>
    )}
  </li>
);

const CollapsedNavItem = ({ icon: Icon, label, badge, active }) => (
  <div className="group relative flex justify-center w-full">
    <button
      className={`relative flex items-center justify-center w-10 h-10 rounded-md transition cursor-pointer
        ${
          active ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
        }`}
      aria-label={label}
    >
      <Icon size={20} />
      {badge && (
        <span className="absolute -top-1 -right-1 text-[10px] font-semibold rounded-full bg-red-500 text-white w-8 h-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>

    {/* Tooltip */}
    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
      <div className="relative bg-gray-800 text-white text-sm rounded-md px-3 py-1.5 shadow-lg">
        {label}
        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
      </div>
    </div>
  </div>
);
