import {
  closestCenter,
  closestCorners,
  DndContext,
  useSensors,
} from "@dnd-kit/core";
import "./App.css";
import { useState } from "react";
import { Column } from "./components/Column/Column";
import { FaPlus } from "react-icons/fa6";
import { Card, Text } from "@mantine/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "./Task/Task";

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
    console.log(event);

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
        newTasks.splice(newIndex, 0, newTasks.splice(oldIndex, 1)[0]);
        return newTasks;
      });
    }
  };
  const sensors = useSensors();
  const header = [
    { id: 1, label: "TO DO", value: "todo" },
    { id: 2, label: "IN PROGRESS", value: "processing" },
    { id: 3, label: "DONE", value: "done" },
  ];
  return (
    <div className="App">
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        {/* <Column tasks={tasks} /> */}
        <SortableContext items={header}>
          <div className="flex gap-4">
            {header.map((item) => (
              <Column
                key={item.id}
                tasks={tasks}
                id={item.id}
                label={item.label}
                type={item.value}
              ></Column>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
