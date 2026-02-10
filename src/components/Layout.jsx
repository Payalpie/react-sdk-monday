import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "../store/viewSlice";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FilterBar from "./FilterBar";

export default function Layout({ children, onNewProject }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterBarOpen, setFilterBarOpen] = useState(false);
  const view = useSelector((state) => state.view.currentView);
  const dispatch = useDispatch();

  // Determine if we're on a project-related page (projects list or plan details)
  const isProjectPage = 
    location.pathname.startsWith("/projects/") || 
    location.pathname.startsWith("/project/");

  const handleViewChange = (newView) => {
    dispatch(setView(newView));
  };

  // Check if we're on the plan details page (individual plan view)
  const isPlanDetailsPage = location.pathname.match(/^\/project\/[^\/]+$/);

  const handleBackToProjects = () => {
    const projectIdFromPath = location.pathname.match(/\/project\/([^\/]+)/)?.[1];
    if (projectIdFromPath) {
      navigate(`/projects/${projectIdFromPath}`);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {isProjectPage && (
        <>
          <aside
            className={`hidden md:flex shrink-0 bg-gray-900 transition-all duration-300 h-full ${
              sidebarCollapsed ? "w-16" : "w-64"
            }`}
          >
            <Sidebar
              isCollapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed((v) => !v)}
            />
          </aside>

          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileMenuOpen(false)}
              />
              <aside className="relative w-64 h-full bg-gray-900">
                <Sidebar isCollapsed={false} />
              </aside>
            </div>
          )}
        </>
      )}

      <div className="flex flex-col flex-1 h-full min-w-0">
        <Header
          onMenuClick={() => setMobileMenuOpen(true)}
          onFilterToggle={() => setFilterBarOpen((prev) => !prev)}
          isFilterOpen={filterBarOpen}
          view={view}
          onViewChange={handleViewChange}
          showProjectActions={isProjectPage}
          onNewProject={onNewProject}
          isPlanDetailsPage={isPlanDetailsPage}
          onBackToProjects={handleBackToProjects}
        />
        {isProjectPage && !isPlanDetailsPage && (
          <FilterBar
            isOpen={filterBarOpen}
            onClose={() => setFilterBarOpen(false)}
          />
        )}

        <main className="flex-1 min-h-0 overflow-hidden">
          <div className={`w-full h-full min-w-0 ${isPlanDetailsPage ? 'overflow-hidden' : 'overflow-auto p-4 sm:p-6'}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
