import Image from "next/image";

export default function FinalAmount({
  totalCaseCost,
  surplusMonthlyIncome,
  creditors,
  calculateCaseCostWithInterest,
  monthlyIncome,
  monthlyExpense,
}) {
  // Calculate the percentage of totalCaseCost for each case
  const casePercentages = creditors.map((creditor) => {
    return creditor.cases.map((caseItem) => {
      return caseItem.caseCost / totalCaseCost;
    });
  });

  const calculatedMonthlyDebtPayment = surplusMonthlyIncome - totalCaseCost;

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

  return (
    <div className="bg-slate-200 text-black py-1 px-4 my-4 rounded-md w-full m-auto text-xl font-light">
      <div className="flex text-center mb-20">
        <div className="flex-1">Slettgjelden</div>
        <div className="flex-1">+47 959 14 900</div>
        <div className="flex-1">post@slettgjelden.no</div>
      </div>

      {/*  Square Box Section */}
      <div className="flex justify-center my-12">
        <div className="border-2 border-gray-400 w-2/3">
          <div className="flex">
            <div className="w-1/2 border-r-2 border-gray-400 p-4">
              {/* Left Side */}
              <div>Kunde: </div>
              <div>Fødselsnummer: </div>
              <div>Sivilstatus: </div>
              <div>Partner: </div>
              <div>Partners lønn: </div>
            </div>
            <div className="w-1/2 p-4">
              {/* Right Side */}
              <div>Barn 0-5: </div>
              <div>Barn 6-10: </div>
              <div>Barn 11-14: </div>
              <div>Barn 15-18: </div>
              <div>Huslån: </div>
              <div>Husleie: </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">inntekt: {monthlyIncome}</div>
      <div className="text-center">
        utgifter: {Math.floor(monthlyExpense).toLocaleString()}
      </div>
      <div className="text-center">
        overskudd: {Math.floor(surplusMonthlyIncome).toLocaleString()}
      </div>

      {/* Creditor Section */}
      <div className="flex w-full justify-between text-center mt-12">
        <div className="w-1/4">Creditor:</div>
        <div className="w-1/4">Dividende(%)</div>
        <div className="w-1/4">Kr</div>
        <div className="w-1/4">År 5</div>

        {/*<div className=" w-2/5 flex flex-row justify-center">
            År 1,2,3,4,5  
        </div>*/}
      </div>
      <div className="my-4 text-center mb-20">
        {creditors.map((creditor, creditorIndex) => {
          const totalCostWithInterest = creditor.cases.reduce(
            (total, caseItem) => {
              const caseCostWithInterest = calculateCaseCostWithInterest(
                caseItem.caseCost,
                caseItem.interestRatePercentage,
                5
              );
              return total + caseCostWithInterest;
            },
            0
          );
          return (
            <div
              key={creditorIndex}
              className="flex flex-col justify-between mb-12"
            >
              <div className="flex justify-around w-full border-b-2 border-gray-400">
                <div className="w-1/4 border-r-2 border-gray-400">
                  {creditor.creditorName}
                </div>
                <div className="w-1/4 border-r-2 border-gray-400">
                  {Math.floor(
                    (creditor.cases.reduce(
                      (total, currentCase) => total + currentCase.caseCost,
                      0
                    ) /
                      totalCaseCost) *
                      100
                  )}{" "}
                  %
                </div>
                <div className="w-1/4 border-r-2 border-gray-400">
                  {creditor.cases.reduce(
                    (total, currentCase) => total + currentCase.caseCost,
                    0
                  )}
                  ,-
                </div>
                <div className="w-1/4">
                  {Math.round(totalCostWithInterest)},-
                </div>
              </div>
              {creditor.cases.map((caseItem, caseIndex) => (
                <div key={caseIndex} className="flex justify-between w-full">
                  <div
                    className="w-1/4 border-r-2 border-gray-400"
                    style={{ paddingLeft: "20px" }}
                  >{`Case ${caseIndex + 1}`}</div>
                  <div className="w-1/4 border-r-2 border-gray-400">
                    {Math.floor((caseItem.caseCost / totalCaseCost) * 100)} %
                  </div>
                  <div className="w-1/4 border-r-2 border-gray-400">
                    {`${caseItem.caseCost}`},-
                  </div>
                  <div className="w-1/4">{`${Math.round(
                    calculateCaseCostWithInterest(
                      caseItem.caseCost,
                      caseItem.interestRatePercentage,
                      5
                    )
                  )},- `}</div>
                  {/*<div className="w-2/5 mb-8 flex flex-row justify-center">
                  {Array.from({ length: 5}, (_, i) => (
                    <div
                      key={i}
                      className=" text-black rounded-md px-1 "
                    >
                      {`${Math.round(
                        calculateCaseCostWithInterest(
                          caseItem.caseCost,
                          caseItem.interestRatePercentage,
                          i + 1
                        )
                      )}, `}
                    </div>
                  ))}
                        </div>*/}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
