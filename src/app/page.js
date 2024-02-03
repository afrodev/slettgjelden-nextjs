"use client";
import { useState } from "react";
import MyForm from "@/components/MyForm";
import NumberInput from "@/components/NumberInput";
import FinalAmount from "@/components/FinalAmount";

export default function Home() {
  const [creditors, setCreditors] = useState([
    {
      creditorName: "Creditor 1",
      cases: [{ caseCost: 2000, interestRatePercentage: 12 }],
    },
  ]);
  const [newCreditorName, setNewCreditorName] = useState(""); // New state for input

  // Modified function to accept a name
  const addCreditor = (name) => {
    const creditorName = name.trim() || `Creditor ${creditors.length + 1}`;
    setCreditors([...creditors, { creditorName, cases: [] }]);
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
  const casePercentages = creditors.map((creditor) => {
    return creditor.cases.map((caseItem) => {
      return caseItem.caseCost / totalCaseCost;
    });
  });

  const calculatedMonthlyDebtPayment = surplusMonthlyIncome - totalCaseCost;

  // Calculate the surplus distributed proportionately to each case
  const surplusDistribution = creditors.map((creditor, creditorIndex) => {
    return creditor.cases.map((caseItem, caseIndex) => {
      if (totalCaseCost >= surplusMonthlyIncome) {
        return surplusMonthlyIncome * casePercentages[creditorIndex][caseIndex];
      } else {
        return (
          calculatedMonthlyDebtPayment *
          casePercentages[creditorIndex][caseIndex]
        );
      }
    });
  });

  const monthlyDebtPay = monthlyIncome - monthlyExpense - totalCaseCost;

  // Calculate monthly debt payment

  return (
    <body>
      <MyForm></MyForm>

      {creditors.map((creditor, creditorIndex) => (
        <div key={creditorIndex}>
          <h2>{creditor.creditorName}</h2>
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
            </div>
          ))}
          <button
            onClick={() => addCaseToCreditor(creditorIndex)}
            style={{ backgroundColor: "blue", color: "white" }}
          >
            Add Case to {creditor.creditorName}
          </button>
          <hr />
        </div>
      ))}

      {/* Input for new creditor name */}
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

      {/* figure out why this shows total case cost twice */}
      <FinalAmount
        amount={totalCaseCost}
        text={`Ditt overskudd per måned er ${surplusMonthlyIncome} og summen av dine saker er ${totalCaseCost}:`}
        breakdown={creditors
          .map((creditor, creditorIndex) => {
            return {
              creditorName: creditor.creditorName,
              cases: creditor.cases.map((caseItem, caseIndex) => {
                const monthFactor = surplusMonthlyIncome / totalCaseCost;
                const monthsToPayOff = 1 / monthFactor;
                if (monthsToPayOff <= 1) {
                  return `Case ${caseIndex + 1}: ${caseItem.caseCost} kr`;
                } else {
                  return `Case ${caseIndex + 1}: ${
                    surplusDistribution[creditorIndex][caseIndex]
                  } kr`;
                }
              }),
            };
          })
          .map(
            (creditorInfo) =>
              `${creditorInfo.creditorName}: ${creditorInfo.cases.join(", ")}`
          )}
      />
    </body>
  );
}
