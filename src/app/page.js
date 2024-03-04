"use client";
import { useState, useRef } from "react";
import MyForm from "@/components/MyForm";
import NumberInput from "@/components/NumberInput";
import FinalAmount from "@/components/FinalAmount";
import FinalAmountMini from "@/components/FinalAmountMini"
import CreditorManagement from "@/components/CreditorManagement";
// import { useState } from "react";
// from "@/components/CreditorManagement";
import CreditorOutput from "@/components/CreditorOutput";
//import { useReactToPrint } from "react-to-print";

export default function Home() {
  const [creditors, setCreditors] = useState([
    {
      creditorName: "Creditor 1",
      cases: [{ caseCost: 2000, interestRatePercentage: 12 }],
    },
  ]);
  const [newCreditorName, setNewCreditorName] = useState(""); // New state for input

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

  // Function to calculate case cost with interest over how many years
  const calculateCaseCostWithInterest = (
    caseCost,
    interestRatePercentage,
    year
  ) => {
    return caseCost * Math.pow(1 + interestRatePercentage / 100, year);
  };

  const [monthlyIncome, setMonthlyIncome] = useState(25000); //Used in input
  const [rent, setRent] = useState(10000); // Used in input
  const [finalAge, setFinalAge] = useState(5); //hook 7 //used in input
  const [taxRatePercentage, setTaxRatePercentage] = useState(30); // used in input

  const yearsInvested = 5;
  const monthlyExpense = rent;
  const surplusMonthlyIncome = monthlyIncome - monthlyExpense;

  // Calculate the total of all case costs
  const totalCaseCost = creditors.reduce((total, creditor) => {
    return (
      total +
      creditor.cases.reduce((total, currentCase) => {
        return total + parseFloat(currentCase.caseCost);
      }, 0)
    );
  }, 0);

  // Calculate the percentage of totalCaseCost for each case
  //const casePercentages = creditors.map((creditor) => {
  //  return creditor.cases.map((caseItem) => {
  //    return caseItem.caseCost / totalCaseCost;
  //  });
  //});

  //const calculatedMonthlyDebtPayment = surplusMonthlyIncome - totalCaseCost;

  // Calculate the surplus distributed proportionately to each case
  //const surplusDistribution = creditors.map((creditor, creditorIndex) => {
  //  return creditor.cases.map((caseItem, caseIndex) => {
  //    if (totalCaseCost >= surplusMonthlyIncome) {
  //      return surplusMonthlyIncome * casePercentages[creditorIndex][caseIndex];
  //    } else {
  //      return (
  //        calculatedMonthlyDebtPayment *
  //        casePercentages[creditorIndex][caseIndex]
  //      );
  //    }
  //  });
  //});

  const monthlyDebtPay = monthlyIncome - monthlyExpense - totalCaseCost;

  // Calculate monthly debt payment

  return (
    <body>
      <h2 className="text-center m-8 text-2xl">Kreditor</h2>
      <CreditorManagement />
      <h2 className="text-center m-8 text-2xl">Før refaktorering:</h2>
      {creditors.map((creditor, creditorIndex) => (
        <div key={creditorIndex} className="flex m-8">
          <div className="flex-1 text-center">
            <h2>{creditor.creditorName}</h2>
          </div>
          <div className="flex-1">
            {creditor.cases.map((caseItem, caseIndex) => (
              <div key={caseIndex}>
                <NumberInput
                  labelValue={`Saksbeløp (kr) #${caseIndex + 1}: `}
                  defaultValue={caseItem.caseCost}
                  changeEventHandler={(value) =>
                    updateCase(creditorIndex, caseIndex, "caseCost", value)
                  }
                  inputName={`case-cost-${caseIndex}`}
                />
                <NumberInput
                  labelValue={`Rente på saken (%) #${caseIndex + 1}: `}
                  defaultValue={caseItem.interestRatePercentage}
                  changeEventHandler={(value) =>
                    updateCase(
                      creditorIndex,
                      caseIndex,
                      "interestRatePercentage",
                      value
                    )
                  }
                  inputName={`case-interest-rate-${caseIndex}`}
                />
                <div className="mb-8 flex flex-row justify-center">
                  {Array.from({ length: yearsInvested }, (_, i) => (
                    <div
                      key={i}
                      className="m-4 bg-purple-200 w-fit text-black rounded-md px-4 mb-2"
                    >
                      {`År ${i + 1}: ${Math.round(
                        calculateCaseCostWithInterest(
                          caseItem.caseCost,
                          caseItem.interestRatePercentage,
                          i + 1
                        )
                      )}`}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => addCaseToCreditor(creditorIndex)}
              style={{ backgroundColor: "blue", color: "white" }}
            >
              Add Case to {creditor.creditorName}
            </button>
          </div>

          {/* sidepanel with different calculations
          <div className="flex-1  text-center">*/}
          {/* Calculate and display total case cost for this creditor           
            <div>
              Sum {creditor.creditorName} gjeld:
              <p className="bg-purple-200 w-fit text-black rounded-md px-4 mb-2 mx-auto">{
                  creditor.cases.reduce((total, currentCase) => total + currentCase.caseCost, 0)
                } kr
              </p>
            </div>*/}
          {/* Calculate and display total case cost with interest for this creditor */}
          {/*<div>
              Sum {creditor.creditorName} gjeld etter 5 år:
              <p className="bg-purple-200 w-fit text-black rounded-md px-4 mb-2 mx-auto">{
                  creditor.cases.reduce((total, currentCase) => {
                      const caseCostWithInterest = calculateCaseCostWithInterest(
                          currentCase.caseCost,
                          currentCase.interestRatePercentage,
                          5
                      );
                      return total + Math.round(caseCostWithInterest);
                  }, 0)
                } kr
              </p>
            </div>
          </div>*/}
          {/* Use the new CreditorOutput component */}
          <CreditorOutput
            creditor={creditor}
            calculateCaseCostWithInterest={calculateCaseCostWithInterest}
            totalCaseCostOfAllCreditors={totalCaseCost}
            surplusMonthlyIncome={surplusMonthlyIncome}
          />

          <hr />
        </div>
      ))}

      <input
        type="text"
        placeholder="Enter Creditor's Name (optional)"
        value={newCreditorName}
        onChange={(e) => setNewCreditorName(e.target.value)}
      />
      <button
        onClick={() => addCreditor(newCreditorName)}
        style={{ backgroundColor: "blue", color: "white" }}
      >
        Add Creditor
      </button>
      <h2 className="text-center m-8 text-2xl">Kunde</h2>
      <NumberInput
        labelValue={"Månedslønn (kr):"}
        defaultValue={monthlyIncome}
        changeEventHandler={setMonthlyIncome}
        inputName={"monthly-income"}
      />

      <NumberInput
        labelValue={"Leiekostnader (kr):"}
        defaultValue={rent}
        changeEventHandler={setRent}
        inputName={"rent"}
      />

      <FinalAmount
        totalCaseCost={totalCaseCost}
        surplusMonthlyIncome = {surplusMonthlyIncome}
        creditors= {creditors}
        calculateCaseCostWithInterest ={calculateCaseCostWithInterest}
        monthlyIncome= {monthlyIncome}
        monthlyExpense= {monthlyExpense}
      />
      <FinalAmountMini
        totalCaseCost={totalCaseCost}
        surplusMonthlyIncome = {surplusMonthlyIncome}
        creditors= {creditors}
        calculateCaseCostWithInterest ={calculateCaseCostWithInterest}
        monthlyIncome= {monthlyIncome}
        monthlyExpense= {monthlyExpense}
      />
    </body>
  );
}
