import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  closeNewModal,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
} from "../store/projectModalSlice";
import { SlidersHorizontal, Filter, Search } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import NewProjectModal from "../components/NewProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import DeleteProjectModal from "../components/DeleteProjectModal";

export default function ProjectsOverview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNewModalOpen = useSelector((state) => state.projectModal.isNewModalOpen);
  const isEditModalOpen = useSelector((state) => state.projectModal.isEditModalOpen);
  const isDeleteModalOpen = useSelector((state) => state.projectModal.isDeleteModalOpen);
  const selectedProject = useSelector((state) => state.projectModal.selectedProject);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Mock data for projects
    const mockProjects = [
      { id: "proj-1", name: "Baird", memberCount: 7, isFavorite: false },
      { id: "proj-2", name: "Berger", memberCount: 4, isFavorite: false },
      { id: "proj-3", name: "Episcope", memberCount: 4, isFavorite: false },
      { id: "proj-4", name: "Hughes", memberCount: 7, isFavorite: false },
      { id: "proj-5", name: "Keiser", memberCount: 5, isFavorite: false },
      { id: "proj-6", name: "Kotowsky", memberCount: 5, isFavorite: false },
      {
        id: "proj-7",
        name: "Kucera Chicago",
        memberCount: 5,
        isFavorite: false,
      },
      {
        id: "proj-8",
        name: "Kucera Michigan",
        memberCount: 5,
        isFavorite: false,
      },
      { id: "proj-9", name: "Merrilees", memberCount: 5, isFavorite: false },
      {
        id: "proj-10",
        name: "Monaghan Outdoor",
        memberCount: 5,
        isFavorite: false,
      },
      {
        id: "proj-11",
        name: "Monday Planview Development",
        memberCount: 1,
        isFavorite: false,
      },
      { id: "proj-12", name: "Patel", memberCount: 7, isFavorite: false },
      { id: "proj-13", name: "Phusion", memberCount: 5, isFavorite: false },
      { id: "proj-14", name: "Rankin", memberCount: 6, isFavorite: false },
      { id: "proj-15", name: "Reese", memberCount: 5, isFavorite: false },
      { id: "proj-16", name: "Saltzman", memberCount: 6, isFavorite: false },
      {
        id: "proj-17",
        name: "Sample project - SRE",
        memberCount: 6,
        isFavorite: false,
      },
      { id: "proj-18", name: "Stoeckel", memberCount: 6, isFavorite: false },
    ];

    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 300);
  }, []);

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.id}`);
  };

  const handleEditProject = (project) => {
    dispatch(openEditModal(project));
  };

  const handleDeleteProject = (project) => {
    dispatch(openDeleteModal(project));
  };

  const handleEditSubmit = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    dispatch(closeEditModal());
  };

  const handleDeleteConfirm = (projectToDelete) => {
    setProjects((prevProjects) =>
      prevProjects.filter((p) => p.id !== projectToDelete.id)
    );
    dispatch(closeDeleteModal());
  };

  const handleNewProjectSubmit = (newProject) => {
    const createdProject = {
      id: `proj-${Date.now()}`,
      name: newProject.name,
      code: newProject.code,
      memberCount: 1,
      isFavorite: false,
    };
    setProjects([...projects, createdProject]);
    dispatch(closeNewModal());
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col gap-3 pb-4 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            My projects ({projects.length})
          </h1>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center flex-1 h-10 gap-2 px-3 bg-white border border-gray-300 rounded-md sm:flex-initial sm:min-w-[200px]">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search projects"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm bg-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={handleProjectClick}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-12 text-center text-gray-500">No projects found</div>
      )}

      <NewProjectModal
        isOpen={isNewModalOpen}
        onClose={() => dispatch(closeNewModal())}
        onSubmit={handleNewProjectSubmit}
      />

      <EditProjectModal
        key={selectedProject?.id || "edit-modal"}
        isOpen={isEditModalOpen}
        onClose={() => dispatch(closeEditModal())}
        onSubmit={handleEditSubmit}
        project={selectedProject}
      />

      <DeleteProjectModal
        key={selectedProject?.id || "delete-modal"}
        isOpen={isDeleteModalOpen}
        onClose={() => dispatch(closeDeleteModal())}
        onConfirm={handleDeleteConfirm}
        project={selectedProject}
      />
    </div>
  );
}
