import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge, Card, Group, Image, Text } from "@mantine/core";

export const Task = ({
  id,
  name,
  image_url,
}: {
  id: number;
  name: string;
  image_url: string;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      shadow="sm"
      className="w-[300px] m-5 p-2 rounded border"
    >
      <Card.Section>
        <Image src={image_url} height={160} />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text>{name}</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>
      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes
      </Text>
    </Card>
  );
};
