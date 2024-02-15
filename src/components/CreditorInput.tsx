import TextInput from "./TextInput";
import CaseManagement from "./CaseManagement";

// Add addCreditor to the props type
interface CreditorInputProps {
  addCreditor: (name: string) => void;
}

const CreditorInput: React.FC<CreditorInputProps> = ({ addCreditor }) => {
  // Example usage of addCreditor, adjust as needed
  const handleAddCreditor = () => {
    const creditorName = "New Creditor"; // This should come from an input field
    addCreditor(creditorName);
  };

  return (
    <>
      <div>CreditorInput </div>
      <TextInput
        labelValue={"Kreditor navn: "}
        changeEventHandler={() => {}}
        inputName={"creditor-name"}
      />
      {/* <CaseManagement /> */}
      {/* Example button to add creditor, adjust as needed */}
      <button onClick={handleAddCreditor}>Add Creditor</button>
    </>
  );
};

export default CreditorInput;
