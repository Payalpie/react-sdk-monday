import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openNewModal } from "./store/projectModalSlice";
import ProjectsOverview from "./pages/ProjectsOverview";
import ProjectList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetails";


function App() {
  const dispatch = useDispatch();

  const handleNewProject = () => {
    dispatch(openNewModal());
  };

  return (
    <Layout onNewProject={handleNewProject}>
      <Routes>
        <Route path="/" element={<ProjectsOverview />} />
        <Route path="/projects/:projectId" element={<ProjectList />} />
        <Route path="/project/:projectId/*" element={<ProjectDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
