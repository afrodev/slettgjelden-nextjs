import React from "react";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";

// Extend or modify this component to include dropdown functionality if needed
const CustomerInput = () => {
  return (
    <div>
      <TextInput
        labelValue="Customer Name"
        changeEventHandler={() => {}}
        inputName="customerName"
      />
      <NumberInput
        labelValue="Personnummer"
        defaultValue=""
        changeEventHandler={() => {}}
        inputName="personnummer"
      />
      <NumberInput
        labelValue="Customer Lønn"
        defaultValue=""
        changeEventHandler={() => {}}
        inputName="customerLonn"
      />
      {/* Implement dropdown functionality for Sivilstatus */}
      <TextInput
        labelValue="Sivilstatus"
        changeEventHandler={() => {}}
        inputName="sivilstatus"
      />
      <NumberInput
        labelValue="Partner Lønn"
        defaultValue=""
        changeEventHandler={() => {}}
        inputName="partnerLonn"
      />
    </div>
  );
};

export default CustomerInput;
