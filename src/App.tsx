import { closestCorners, DndContext } from "@dnd-kit/core";
import "./App.css";
import { useState } from "react";
import { Column } from "./components/Column/Column";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", done: false },
    { id: 2, name: "Task 2", done: false },
    { id: 3, name: "Task 3", done: false },
    { id: 4, name: "Task 4", done: false },
  ]);
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log({ active }, { over });

    if (active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        const newTasks = [...tasks];
        newTasks.splice(newIndex, 0, newTasks.splice(oldIndex, 1)[0]);
        return newTasks;
      });
    }
  };
  return (
    <div className="App">
      <h1>My Tasks</h1>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}
