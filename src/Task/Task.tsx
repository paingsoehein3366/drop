import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Task = ({ id, name }: { id: number; name: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div>
      <h1
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="w-[300px] p-2 bg-green-400 m-4 rounded text-white"
      >
        {name}
      </h1>
    </div>
  );
};
