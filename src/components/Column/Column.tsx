import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../../Task/Task";
import { Text } from "@mantine/core";
import { FaPlus } from "react-icons/fa6";

export const Column = ({
  tasks,
  id,
  label,
  type,
}: {
  tasks: any[];
  id: number;
  label: string;
  type: string;
}) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id });

  return (
    <div
      className="bg-gray-300 rounded min-w-72"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Text className="border-b-2 py-2">{label}</Text>
      <SortableContext
        items={tasks.filter((task) => task.type === type)}
        strategy={verticalListSortingStrategy}
      >
        {tasks
          .filter((task) => task.type === type)
          .map((card) => (
            <div key={card.id}>
              <Task id={card.id} name={card.name} image_url={card.image_url} />
            </div>
          ))}
      </SortableContext>
      <div className="hover:bg-gray-200 flex items-center cursor-pointer p-2 m-2 hover:rounded-md">
        <FaPlus />
        Create issue
      </div>
    </div>
  );
};
