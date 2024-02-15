// CreditorOutput.js
import React from 'react';

const CreditorOutput = ({ creditor, calculateCaseCostWithInterest, totalCaseCostOfAllCreditors, surplusMonthlyIncome }) => {
  // Calculate the total case cost for this creditor
  const totalCaseCostForThisCreditor = creditor.cases.reduce((total, currentCase) => total + currentCase.caseCost, 0);
  
  // Calculate the percentage of the total
  const percentageOfTotal = (totalCaseCostForThisCreditor / totalCaseCostOfAllCreditors) * 100;

  // Calculate the monthly amount going to this creditor based on the surplusMonthlyIncome
  let monthlyAmountForCreditor = (percentageOfTotal / 100) * surplusMonthlyIncome;

  // Ensure the monthly amount does not exceed the total case cost for this creditor
  monthlyAmountForCreditor = Math.min(monthlyAmountForCreditor, totalCaseCostForThisCreditor);

  return (
    <div className="flex-1 text-center">
      {/* Calculate and display total case cost for this creditor */}
      <div>
        Sum {creditor.creditorName} gjeld:
        <p className="bg-purple-200 w-fit text-black rounded-md px-4 mb-2 mx-auto">
          {totalCaseCostForThisCreditor} kr
        </p>
      </div>
      {/* Calculate and display total case cost with interest for this creditor */}
      <div>
        Sum {creditor.creditorName} gjeld etter 5 år:
        <p className="bg-purple-200 w-fit text-black rounded-md px-4 mb-2 mx-auto">
          {creditor.cases.reduce((total, currentCase) => {
            const caseCostWithInterest = calculateCaseCostWithInterest(
              currentCase.caseCost,
              currentCase.interestRatePercentage,
              5
            );
            return total + Math.round(caseCostWithInterest);
          }, 0)} kr
        </p>
      </div>
      {/* Additional output for percentage */}
      <div>
        Prosent av total gjeld:
        <p className="bg-green-200 w-fit text-black rounded-md px-4 mb-2 mx-auto">
          {percentageOfTotal.toFixed(0)}%
        </p>
      </div>
      {/* Additional output for monthly amount */}
      <div>
        Månedlig beløp til {creditor.creditorName}:
        <p className="bg-blue-200 w-fit text-black rounded-md px-4 mb-2 mx-auto">
          {monthlyAmountForCreditor.toFixed(0)} kr
        </p>
      </div>
    </div>
  );
};

export default CreditorOutput;
