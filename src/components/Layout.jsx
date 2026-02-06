import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FilterBar from "./FilterBar";

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterBarOpen, setFilterBarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
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

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative w-64 bg-gray-900 h-full">
            <Sidebar isCollapsed={false} />
          </aside>
        </div>
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        <Header
          onMenuClick={() => setMobileMenuOpen(true)}
          onFilterToggle={() => setFilterBarOpen((prev) => !prev)}
          isFilterOpen={filterBarOpen}
        />
        <FilterBar
          isOpen={filterBarOpen}
          onClose={() => setFilterBarOpen(false)}
        />

        <main className="flex-1 min-h-0 overflow-hidden">
          <div className="h-full w-full min-w-0 overflow-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
