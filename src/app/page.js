"use client";
import { useState } from "react";
import MyForm from "@/components/MyForm";
import NumberInput from "@/components/NumberInput";
import FinalAmount from "@/components/FinalAmount";

export default function Home() {
  const [caseCost, setCaseCost] = useState(2000);
  const [interestRatePercentage, setInterestRatePercentage] = useState(12);
  const [monthlyIncome, setMonthlyIncome] = useState(25000); //Used in input
  const [rent, setRent] = useState(10000); // Used in input
  const [finalAge, setFinalAge] = useState(65); //hook 7 //used in input
  const [taxRatePercentage, setTaxRatePercentage] = useState(30); // used in input

  const [cases, setCases] = useState([
    { caseCost: 2000, interestRatePercentage: 12 },
  ]);

  const addCase = () => {
    setCases([...cases, { caseCost: 2000, interestRatePercentage: 12 }]);
  };

  // updates a specific field of a case in an array of cases.
  const updateCase = (index, field, value) => {
    const newCases = [...cases];
    newCases[index][field] = value;
    setCases(newCases);
  };

  // Main todo for Sander add an array for creditors. Allow each creditor to create an array of cases

  //TODO 1: add state for homeloan and homeloan interest, children with different age
  // TODO 2: group all child ageranges into children group
  // TODO 3: group homeLoan, homeInterest, children as monthlyExpenses

  const yearsInvested = 5;
  const interestRateDecimal = cases[0].interestRatePercentage / 100;
  const monthlyExpense = rent;
  const surplusMonthlyIncome = monthlyIncome - monthlyExpense;

  // Calculate the total of all case costs
  const totalCaseCost = cases.reduce((total, currentCase) => {
    return total + parseFloat(currentCase.caseCost);
  }, 0);

  // Calculate the percentage of totalCaseCost for each case
  const casePercentages = cases.map((caseItem) => {
    return caseItem.caseCost / totalCaseCost;
  });

  const calculatedMonthlyDebtPayment = surplusMonthlyIncome - totalCaseCost;

  // Calculate the surplus distributed proportionately to each case
  const surplusDistribution = cases.map((caseItem, index) => {
    if (totalCaseCost >= surplusMonthlyIncome) {
      return surplusMonthlyIncome * casePercentages[index];
    } else {
      return calculatedMonthlyDebtPayment * casePercentages[index];
    }
  });

  const monthlyDebtPay = monthlyIncome - monthlyExpense - totalCaseCost;

  // Calculate monthly debt payment

  return (
    <body>
      <MyForm></MyForm>

      {cases.map((caseItem, index) => (
        <div key={index}>
          <NumberInput
            labelValue={`Saksbeløp (kr) #${index + 1}: `}
            defaultValue={caseItem.caseCost}
            changeEventHandler={(value) => updateCase(index, "caseCost", value)}
            inputName={`case-cost-${index}`}
          />
          <NumberInput
            labelValue={`Rente på saken (%) #${index + 1}: `}
            defaultValue={caseItem.interestRatePercentage}
            changeEventHandler={(value) =>
              updateCase(index, "interestRatePercentage", value)
            }
            inputName={`case-interest-rate-${index}`}
          />
        </div>
      ))}

      <button onClick={addCase}>Add Case</button>

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
        breakdown={cases.map((caseItem, index) => {
          const monthFactor = surplusMonthlyIncome / totalCaseCost;
          const monthsToPayOff = 1 / monthFactor;
          if (monthsToPayOff <= 1) {
            return `Case ${index + 1}: ${caseItem.caseCost} kr`;
          } else {
            return `Case ${index + 1}: ${surplusDistribution[index]} kr`;
          }
        })}
      />
    </body>
  );
}
