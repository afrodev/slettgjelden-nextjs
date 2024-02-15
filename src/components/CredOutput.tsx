// CreditorOutput but with TypeScript
import React from "react";

// Define types for the props
interface Case {
  caseCost: number;
  interestRatePercentage: number;
}

interface Creditor {
  creditorName: string;
  cases: Case[];
}

interface CredOutputProps {
  creditor: Creditor;
  calculateCaseCostWithInterest: (
    caseCost: number,
    interestRatePercentage: number,
    years: number
  ) => number;
  totalCaseCostOfAllCreditors: number;
}

const CredOutput: React.FC<CredOutputProps> = ({
  creditor,
  calculateCaseCostWithInterest,
  totalCaseCostOfAllCreditors,
}) => {
  // Calculate the total case cost for this creditor
  const totalCaseCostForThisCreditor = creditor.cases.reduce(
    (total, currentCase) => total + currentCase.caseCost,
    0
  );

  // Calculate the percentage of the total
  const percentageOfTotal =
    (totalCaseCostForThisCreditor / totalCaseCostOfAllCreditors) * 100;

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
          }, 0)}{" "}
          kr
        </p>
      </div>
      {/* Additional output for percentage */}
      <div>
        Prosent av total gjeld:
        <p className="bg-green-200 w-fit text-black rounded-md px-4 mb-2 mx-auto">
          {percentageOfTotal.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default CredOutput;
