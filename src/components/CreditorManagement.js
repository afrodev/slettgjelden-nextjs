"use client";
import React, { useState } from "react";
import CreditorInput from "./CreditorInput";
import CreditorOutput from "./CreditorOutput";
import CaseManagement from "./CaseManagement";

// YOYOYO this file needs to stay .js for now while refactoring cuz everything here is taken straight from page.js
// This is because we want to remove the "use client" in page

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

  // Function to calculate case cost with interest over how many years
  const calculateCaseCostWithInterest = (
    caseCost,
    interestRatePercentage,
    year
  ) => {
    return caseCost * Math.pow(1 + interestRatePercentage / 100, year);
  };

  // Function to calculate the total case cost of all creditors
  const totalCaseCostOfAllCreditors = creditors.reduce((total, creditor) => {
    return (
      total +
      creditor.cases.reduce((caseTotal, currentCase) => {
        return caseTotal + currentCase.caseCost;
      }, 0)
    );
  }, 0);

  // Function to update the details of a specific case for a specific creditor
  const updateCaseDetails = (creditorIndex, caseIndex, field, newValue) => {
    // Create a copy of the current creditors array
    const updatedCreditors = [...creditors];

    // Convert newValue to a number if it's meant to be numeric
    const updatedValue =
      field === "caseCost" || field === "interestRatePercentage"
        ? parseFloat(newValue)
        : newValue;

    // Update the specified case of the specified creditor
    updatedCreditors[creditorIndex].cases[caseIndex][field] = updatedValue;

    // Update the state with the modified array
    setCreditors(updatedCreditors);
  };

  return (
    <div className="flex justify-between">
      <div className="flex-1">
        {/* Pass addCreditor as a prop to CreditorInput */}
        <CreditorInput
          creditors={creditors}
          setCreditors={setCreditors}
          addCreditor={addCreditor}
          addCaseToCreditor={addCaseToCreditor}
          updateCase={updateCase}
          updateCreditorName={updateCreditorName}
        />
      </div>
      <div className="flex-1">
        {/* If CaseManagement becomes a separate component */}
        <CaseManagement updateCaseDetails={updateCaseDetails} />
      </div>
      <div className="flex-1">
        {/* Map through creditors to display CreditorOutput for each */}
        {creditors.map((creditor, index) => (
          <CreditorOutput
            key={index}
            creditor={creditor}
            calculateCaseCostWithInterest={calculateCaseCostWithInterest}
            totalCaseCostOfAllCreditors={totalCaseCostOfAllCreditors}
          />
        ))}
      </div>
    </div>
  );
}
