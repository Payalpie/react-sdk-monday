// import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:projectId/*" element={<ProjectDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
