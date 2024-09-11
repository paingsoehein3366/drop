import { closestCorners, DndContext } from "@dnd-kit/core";
import "./App.css";
import { useState } from "react";
import { Column } from "./components/Column/Column";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Task 1",
      done: false,
      type: "test",
      image_url:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    },
    {
      id: 2,
      name: "Task 2",
      done: false,
      type: "test",
      image_url:
        "https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-1170x780.jpg",
    },
    {
      id: 3,
      name: "Task 3",
      done: false,
      type: "processing",
      image_url:
        "https://gratisography.com/wp-content/uploads/2024/01/gratisography-reindeer-dog-1170x780.jpg",
    },
    {
      id: 4,
      name: "Task 4",
      done: false,
      type: "done",
      image_url:
        "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04141642/Free-Stock-Photos-01-1536x1024.jpg",
    },
  ]);
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log({ active }, { over });

    if (active.id !== over.id) {
      setTasks((tasks) => {
        const changeTypeOver = tasks.filter((task) => task.id === over.id)[0]
          .type;
        const changeTypeActive = tasks.filter(
          (task) => task.id === active.id
        )[0].type;

        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        const checkType = tasks.map((task) => {
          if (task.id === active.id) {
            return { ...task, type: changeTypeOver };
          }
          return task;
        });
        const newTasks = [...checkType];
        // const newTasks = [...tasks];
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
