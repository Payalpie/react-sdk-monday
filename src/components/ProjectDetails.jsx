import React from "react";
import { useParams } from "react-router-dom";

// Placeholder for the project details page
export default function ProjectDetails() {
  const { projectId } = useParams();
  return (
    <div>
      <h2>Project Details Page</h2>
      <p>Project ID: {projectId}</p>
      {/* Render project details here */}
    </div>
  );
}
