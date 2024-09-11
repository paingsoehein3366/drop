import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../../Task/Task";
import { Table } from "@mantine/core";

export const Column = ({ tasks }: { tasks: any[] }) => {
  const test = tasks.filter((item: any) => item.type === "test");
  const processing = tasks.filter((item: any) => item.type === "processing");
  const done = tasks.filter((item: any) => item.type === "done");
  return (
    <div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <Table withColumnBorders withRowBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Element position</Table.Th>
              <Table.Th>Element name</Table.Th>
              <Table.Th>Symbol</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                {test.map((item) => (
                  <Task
                    image_url={item.image_url}
                    key={item.id}
                    id={item.id}
                    name={item.name}
                  />
                ))}
              </Table.Td>

              <Table.Td>
                {processing.map((item) => (
                  <Task
                    image_url={item.image_url}
                    key={item.id}
                    id={item.id}
                    name={item.name}
                  />
                ))}
              </Table.Td>

              <Table.Td>
                {done.map((item) => (
                  <Task
                    image_url={item.image_url}
                    key={item.id}
                    id={item.id}
                    name={item.name}
                  />
                ))}
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </SortableContext>
    </div>
  );
};
