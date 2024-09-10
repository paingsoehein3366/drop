import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Table, Title } from '@mantine/core';
import { useGetUsers } from './api';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { AddList } from './add-list';

function App() {
  const [open, setOpen] = useState(false);
  const { data } = useGetUsers();
  const [users, setUsers] = useState(data?.data || []);

  useEffect(() => {
    setUsers(data?.data);
    console.log('useEffect');
  }, [data?.count])


  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (over && over.data.current.accepts.includes(active.data.current.type)) {
      console.log(`Dropped ${active.id} onto ${over.id}`);

      const draggedUserIndex = users.findIndex((user, index) => `draggable-${index}` === active.id);

      if (draggedUserIndex !== -1) {
        const updatedUsers = [...users];
        console.log('updatedUsers:', updatedUsers.splice(draggedUserIndex, 1));
        const [draggedUser] = updatedUsers.splice(draggedUserIndex, 1);
        updatedUsers.push(draggedUser);

        setUsers(updatedUsers);
      }
    }
  }

  return (
    <>
      <div className='flex justify-between'>
        <Title order={3}>User List</Title>
        <Button onClick={() => setOpen(true)}>Add User</Button>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <Droppable id='droppable'>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className='text-center'>Name</Table.Th>
                <Table.Th className='text-center'>Email</Table.Th>
                <Table.Th className='text-center'>Age</Table.Th>
                <Table.Th className='text-center'>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {users?.map((user, index) => (
                <Draggable key={user?.id} id={`draggable-${index}`} index={index}>
                  <Table.Td>{user?.name}</Table.Td>
                  <Table.Td>{user?.email}</Table.Td>
                  <Table.Td>{user?.age}</Table.Td>
                  <Table.Td>
                    <Button color='red'>Edit</Button>
                  </Table.Td>
                </Draggable>
              ))}
            </Table.Tbody>
          </Table>
        </Droppable>
      </DndContext>
      <AddList open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function Droppable({ id, children }: { id: string, children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      accepts: ['user'],
    },
  });

  return <div ref={setNodeRef}>{children}</div>;
}

function Draggable({ id, index, children }: { id: string, index: number, children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      type: 'user',
      index,
    },
  });

  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    }
    : undefined;

  return (
    <Table.Tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Table.Tr>
  );
}

export default App;
