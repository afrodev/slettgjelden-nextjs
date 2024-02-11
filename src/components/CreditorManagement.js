"use client";
import React, { useState } from "react";
import TextInput from "@/components/TextInput"; // Adjust the import path as necessary

export default function CreditorManagement() {
  // Assuming you have a state for managing the list of creditors
  const [creditors, setCreditors] = useState([
    {
      creditorName: "Creditor 1",
      cases: [{ caseCost: 2000, interestRatePercentage: 12 }],
    },
  ]);

  // State to hold the input for changing a creditor's name
  const [newCreditorName, setNewCreditorName] = useState("");

  // Function to add a new creditor Modified function to accept a name
  const addCreditor = (name) => {
    const creditorName = name.trim() || `Creditor ${creditors.length + 1}`;
    setCreditors([
      ...creditors,
      { creditorName, cases: [{ caseCost: 2000, interestRatePercentage: 12 }] },
    ]);
    setNewCreditorName(""); // Reset input field after adding
  };

  // Function to add a new case to a specific creditor
  const addCaseToCreditor = (creditorIndex) => {
    const newCreditors = [...creditors];
    newCreditors[creditorIndex].cases.push({
      caseCost: 2000,
      interestRatePercentage: 12,
    });
    setCreditors(newCreditors);
  };

  // Function to update a specific case of a specific creditor
  const updateCase = (creditorIndex, caseIndex, field, value) => {
    const newCreditors = [...creditors];
    // Check if value is empty or not a number, and set it to 0 if true
    const numericValue =
      value === "" || isNaN(value) ? 0 : parseFloat(value).toFixed(2);
    newCreditors[creditorIndex].cases[caseIndex][field] =
      parseFloat(numericValue);
    setCreditors(newCreditors);
  };

  // Function to update the creditor's name
  const updateCreditorName = (index, newName) => {
    const updatedCreditors = [...creditors];
    updatedCreditors[index].creditorName = newName;
    setCreditors(updatedCreditors);
  };

  return (
    <div>
      {creditors.map((creditor, index) => (
        <div key={index}>
          <h2>Current Creditor Name: {creditor.creditorName}</h2>
          <TextInput
            labelValue="Change Creditor Name:"
            defaultValue={creditor.creditorName}
            changeEventHandler={(value) => updateCreditorName(index, value)}
            inputName={`creditor-name-${index}`}
          />
        </div>
      ))}
    </div>
  );
}
