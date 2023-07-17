import { createContext, useContext, useState } from "react";
import { useProjectContext } from '../contexts/ProjectContext';
import { useSocketContext } from '../contexts/SocketContext';

const TaskDrawerContext = createContext(null);

// export context as a custom hook
export const useTaskDrawercontext = () => useContext(TaskDrawerContext);

// provider
export const TaskDrawerProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({});
  const { taskIndex, columnIndex, taskObject } = drawerContent;

  const { project: { _id: projectId, projectLists } } = useProjectContext();

  const socket = useSocketContext();

  // utils
  const handleContentChange = (event, field) => {
    const { value } = event.target;
    const newState = { ...drawerContent };
    newState.taskObject[field] = value;
    setDrawerContent(newState);
  };

  const emitUpdate = (field) => {
    const originalContent = (
      projectLists[columnIndex].tasks[taskIndex][field]
    );

    if (originalContent === taskObject[field]) return;

    // !! projectLists is an array and not an object
    const data = [ ...projectLists ]; 
    data[columnIndex].tasks[taskIndex] = taskObject;

    socket.emit("projects:update", {
      projectId,
      field: "projectLists",
      formData: data
    });
  };

  const value = { 
    isDrawerOpen, 
    setIsDrawerOpen,
    drawerContent,
    setDrawerContent,
    handleContentChange,
    emitUpdate
  };

  return (
    <TaskDrawerContext.Provider value={value}>
      {children}
    </TaskDrawerContext.Provider>
  );
};