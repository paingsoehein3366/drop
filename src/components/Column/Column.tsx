import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../../Task/Task";

export const Column = ({ tasks }: { tasks: any[] }) => {
  return (
    <div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((item) => (
          <Task key={item.id} id={item.id} name={item.name} />
        ))}
      </SortableContext>
    </div>
  );
};
