import { closestCenter, DndContext, useSensors } from "@dnd-kit/core";
import "./App.css";
import { useState } from "react";
import { Column } from "./components/Column/Column";
import { SortableContext } from "@dnd-kit/sortable";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Task 1",
      done: false,
      type: "todo",
      image_url:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    },
    {
      id: 2,
      name: "Task 2",
      done: false,
      type: "todo",
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
    if (!over) return;
    console.log({ active }, { over });

    if (active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        const activeTask = tasks[oldIndex];
        if (activeTask.type !== tasks[newIndex].type) {
          activeTask.type = tasks[newIndex].type;
        }

        const newTasks = [...tasks];
        newTasks.splice(oldIndex, 1);
        newTasks.splice(newIndex, 0, activeTask);
        return newTasks;
      });
    }
  };

  const headers = [
    { id: 1, label: "TO DO", value: "todo" },
    { id: 2, label: "IN PROGRESS", value: "processing" },
    { id: 3, label: "DONE", value: "done" },
  ];

  return (
    <div className="App">
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <div className="flex gap-4">
          {headers.map((header) => (
            <SortableContext
              key={header.id}
              items={tasks.filter((task) => task.type === header.value)}
            >
              <Column
                key={header.id}
                tasks={tasks}
                id={header.id}
                label={header.label}
                type={header.value}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
