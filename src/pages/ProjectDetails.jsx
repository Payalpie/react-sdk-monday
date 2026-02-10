import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlanCanvas from "../components/PlanCanvas";
import TaskModal from "../components/TaskModal";
import { openTaskModal, closeTaskModal } from "../store/taskModalSlice";
import { Plus, X, ListTodo } from "lucide-react";

export default function ProjectDetails() {
  const dispatch = useDispatch();
  const { isOpen: isTaskModalOpen, selectedTask } = useSelector(
    (state) => state.taskModal
  );
  // const { projectId } = useParams();
  const [isTasksPanelOpen, setIsTasksPanelOpen] = useState(true);
  const [tasks, setTasks] = useState([
    { id: 1, name: "Review electrical symbols", completed: false, taskId: "LT-100", status: "todo", priority: "medium" },
    { id: 2, name: "Verify wire specifications", completed: false, taskId: "LT-101", status: "in-progress", priority: "high" },
    { id: 3, name: "Check voltage ratings", completed: true, taskId: "LT-102", status: "done", priority: "low" },
  ]);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), name: newTaskName.trim(), completed: false, taskId: `LT-${Date.now()}`, status: "todo", priority: "medium" },
      ]);
      setNewTaskName("");
      setShowTaskInput(false);
    }
  };

  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskClick = (task) => {
    dispatch(openTaskModal(task));
  };

  const handleTaskDragStart = (e, task) => {
    e.dataTransfer.setData("application/json", JSON.stringify(task));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleCloseModal = () => {
    dispatch(closeTaskModal());
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    handleCloseModal();
  };

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* Main Canvas Area */}
      <div className="relative flex-1 h-full min-w-0">
        <PlanCanvas
          onToolSelect={(tool) => console.log(tool)}
          onTaskClick={handleTaskClick}
        />

        {/* Floating Tasks Button */}
        {!isTasksPanelOpen && (
          <button
            onClick={() => setIsTasksPanelOpen(true)}
            className="absolute z-20 flex items-center gap-2 px-4 py-2 transition bg-white border border-gray-300 rounded-lg shadow-lg top-4 right-4 hover:shadow-xl hover:border-blue-300"
          >
            <ListTodo size={18} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Tasks</span>
          </button>
        )}
      </div>

      {/* Right Sidebar - Tasks */}
      {isTasksPanelOpen && (
        <div className="flex flex-col overflow-hidden bg-white border-l border-gray-200 w-80">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
            <button
              onClick={() => setIsTasksPanelOpen(false)}
              className="p-1 text-gray-400 transition rounded hover:text-gray-600 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 transition rounded-lg hover:bg-blue-50 group cursor-pointer"
                  onClick={() => handleTaskClick(task)}
                  draggable
                  onDragStart={(e) => handleTaskDragStart(e, task)}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer mt-0.5 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex-1 min-w-0">
                    <span
                      className={`flex-1 text-sm leading-relaxed block ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {task.name}
                    </span>
                    <span className="text-xs text-gray-400 block mt-1">
                      {task.taskId}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTask(task.id);
                    }}
                    className="shrink-0 p-1 text-gray-300 transition rounded opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-50"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              {showTaskInput ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddTask();
                      if (e.key === "Escape") {
                        setShowTaskInput(false);
                        setNewTaskName("");
                      }
                    }}
                    placeholder="Task name..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddTask}
                      disabled={!newTaskName.trim()}
                      className="flex-1 px-3 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Task
                    </button>
                    <button
                      onClick={() => {
                        setShowTaskInput(false);
                        setNewTaskName("");
                      }}
                      className="px-3 py-2 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowTaskInput(true)}
                  className="flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 border-dashed rounded-md hover:bg-gray-50 hover:border-gray-400"
                >
                  <Plus size={16} />
                  New task
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        task={selectedTask}
        onClose={handleCloseModal}
        onTaskUpdate={handleTaskUpdate}
      />
    </div>
  );
}
