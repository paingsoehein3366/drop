import { Button, Modal, TextInput, Title } from "@mantine/core"

interface AddListProps {
  open: boolean
  onClose: () => void
}

export const AddList = ({ open, onClose }: AddListProps) => {
  const onSubmit = () => {
    console.log('onSubmit')
  }
  return (
    <Modal opened={open} onClose={onClose}>
      <Title order={4} className="text-center">Add List</Title>
      <form onSubmit={onSubmit}>
        <TextInput label="List Name" placeholder="Enter list name" />
        <TextInput label="Email" placeholder="Enter email" />
        <TextInput label="Password" placeholder="Enter password" />
        <TextInput label="Age" placeholder="Enter age" />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Modal>
  )
}