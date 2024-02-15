import React, { useState } from "react";
import NumInput from "./NumInput";

interface CaseManagementProps {
  updateCaseDetails: (
    creditorIndex: number,
    caseIndex: number,
    field: string,
    newValue: string | number
  ) => void;
}

const CaseManagement: React.FC<CaseManagementProps> = ({
  updateCaseDetails,
}) => {
  // State for each input
  const [caseNumber, setCaseNumber] = useState<number | string>(12345678);
  const [caseCost, setCaseCost] = useState<number | string>(2000);
  const [interestRate, setInterestRate] = useState<number | string>(12);

  const handleCaseCostChange = (inputValue: string) => {
    let value = inputValue;

    // Remove leading zeros if the value is not just "0"
    if (value.startsWith("0") && value !== "0") {
      value = value.replace(/^0+/, "");
    }

    // If the field is cleared or a non-numeric value is entered, reset to "0"
    if (value === "" || isNaN(Number(value))) {
      value = "0";
    }

    // Assuming you have a way to determine the current creditorIndex and caseIndex
    const creditorIndex = 0; // Example index, adjust as needed
    const caseIndex = 0; // Example index, adjust as needed
    updateCaseDetails(creditorIndex, caseIndex, "caseCost", value);
  };

  return (
    <>
      <div>CaseManagement</div>
      <NumInput
        labelValue={"Saksnummer:"}
        defaultValue={caseNumber}
        changeEventHandler={(value) => setCaseNumber(value)}
        inputName={"case-number"}
      />
      <NumInput
        labelValue={"Saksbeløp (kr):"}
        defaultValue={caseCost}
        changeEventHandler={handleCaseCostChange}
        inputName={"case-cost"}
      />
      <NumInput
        labelValue={"Rente på saken (%):"}
        defaultValue={interestRate}
        changeEventHandler={(value) => setInterestRate(value)}
        inputName={"case-interest-rate"}
      />
    </>
  );
};

export default CaseManagement;
