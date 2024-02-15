import React from "react";

interface CustomerOutputProps {
  childDeductions: number;
  customerCosts: number;
  incomeSurplus: number;
}

const CustomerOutput: React.FC<CustomerOutputProps> = ({
  childDeductions,
  customerCosts,
  incomeSurplus,
}) => {
  return (
    <div>
      <div>Child Deductions: {childDeductions}</div>
      <div>Customer Costs: {customerCosts}</div>
      <div>Income Surplus: {incomeSurplus}</div>
    </div>
  );
};

export default CustomerOutput;
