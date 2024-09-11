import { Button, Modal, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

interface AddListProps {
  open: boolean;
  onClose: () => void;
}

export const AddList = ({ open, onClose }: AddListProps) => {
  const [eyeOn, setEyeOn] = useState(false);
  const onSubmit = () => {
    console.log("onSubmit");
  };
  return (
    <Modal opened={open} onClose={onClose} title="Add List">
      <form onSubmit={onSubmit}>
        <TextInput label="List Name" placeholder="Enter list name" />
        <TextInput my={5} label="Email" placeholder="Enter email" />
        <TextInput
          label="Password"
          type={eyeOn ? "text" : "password"}
          placeholder="Enter password"
          rightSection={
            eyeOn ? (
              <IoMdEye onClick={() => setEyeOn(false)} />
            ) : (
              <IoMdEyeOff onClick={() => setEyeOn(true)} />
            )
          }
        />
        <TextInput my={5} label="Age" placeholder="Enter age" />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Modal>
  );
};
