import React from "react";
import NumberInput from "./NumberInput";

const Huslaan = () => {
  return (
    <div>
      <h3>Huslån Details</h3>
      <NumberInput
        labelValue="Lånebeløp"
        defaultValue=""
        changeEventHandler={() => {}}
        inputName="loanAmount"
      />
      <NumberInput
        labelValue="Rente"
        defaultValue=""
        changeEventHandler={() => {}}
        inputName="interestRate"
      />
    </div>
  );
};

export default Huslaan;
