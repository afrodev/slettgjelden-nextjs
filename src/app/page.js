"use client";
import { useState } from "react";
import MyForm from "@/components/MyForm";
import NumberInput from "@/components/NumberInput";
import FinalAmount from "@/components/FinalAmount";

export default function Home() {
  // Initialize state for creditors
  const [creditors, setCreditors] = useState([
    {
      creditorName: "Creditor 1",
      cases: [{ caseCost: 2000, interestRatePercentage: 12 }],
    },
  ]);

  // Function to add a new creditor
  const addCreditor = () => {
    const newCreditorName = `Creditor ${creditors.length + 1}`;
    setCreditors([...creditors, { creditorName: newCreditorName, cases: [{ caseCost: 2000, interestRatePercentage: 12 }] }]);
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
    newCreditors[creditorIndex].cases[caseIndex][field] = value;
    setCreditors(newCreditors);
  };

  // Function to calculate case cost with interest over how many years
  const calculateCaseCostWithInterest = (caseCost, interestRatePercentage, year) => {
    return caseCost * Math.pow((1 + interestRatePercentage / 100), year);
  };

  const [monthlyIncome, setMonthlyIncome] = useState(25000); //Used in input
  const [rent, setRent] = useState(10000); // Used in input
  const [finalAge, setFinalAge] = useState(65); //hook 7 //used in input
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
              <div className="mb-8 flex flex-row justify-center">
              {Array.from({ length: yearsInvested }, (_, i) => (
                <div key={i} className="m-4 underline bg-purple-200 w-fit text-black rounded-md px-4 mb-2">
                  {`Year ${i + 1}: ${Math.round(calculateCaseCostWithInterest(caseItem.caseCost, caseItem.interestRatePercentage, i + 1))} total`}
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
          <hr />
        </div>
      ))}

      <button
        onClick={addCreditor}
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
        breakdown={creditors.map((creditor, creditorIndex) => {
          return creditor.cases.map((caseItem, caseIndex) => {
            const monthFactor = surplusMonthlyIncome / totalCaseCost;
            const monthsToPayOff = 1 / monthFactor;
            if (monthsToPayOff <= 1) {
              return `Case ${caseIndex + 1}: ${caseItem.caseCost} kr`;
            } else {
              return `Case ${caseIndex + 1}: ${
                surplusDistribution[creditorIndex][caseIndex]
              } kr`;
            }
          });
        })}
      />
    </body>
  );
}
