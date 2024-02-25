import { useState } from "react";
import TextInput from "./TextInput";

interface CreditorInputProps {
  addCreditor: (name: string) => void;
  newCreditorName: string;
  setNewCreditorName: React.Dispatch<React.SetStateAction<string>>;
}

const CreditorInput: React.FC<CreditorInputProps> = ({
  addCreditor,
  newCreditorName,
  setNewCreditorName,
}) => {
  const handleAddCreditor = () => {
    addCreditor(newCreditorName);
    setNewCreditorName(""); // Reset the input field after adding
  };

  return (
    <>
      <div>CreditorInput</div>
      <TextInput
        labelValue="Kreditor navn: "
        changeEventHandler={setNewCreditorName}
        inputName="creditor-name"
        defaultValue={newCreditorName}
      />
      <button onClick={handleAddCreditor}>Add Creditor</button>
    </>
  );
};

export default CreditorInput;
