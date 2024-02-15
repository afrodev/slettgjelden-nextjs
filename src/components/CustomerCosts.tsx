import React from "react";
import NumberInput from "./NumberInput";
import Huslaan from "./Huslaan"; // You need to create this component

const CustomerCosts = () => {
  return (
    <div>
      <NumberInput
        labelValue="Barn 0-5"
        defaultValue=""
        changeEventHandler={() => {}}
        inputName="barn0-5"
      />
      <NumberInput
        labelValue="Barn 6-10"
        defaultValue=""
        changeEventHandler={() => {}}
        inputName="barn6-10"
      />
      <NumberInput
        labelValue="Barn 11-14"
        defaultValue=""
        changeEventHandler={() => {}}
        inputName="barn11-14"
      />
      <NumberInput
        labelValue="Barn 15-18"
        defaultValue=""
        changeEventHandler={() => {}}
        inputName="barn15-18"
      />
      <Huslaan />
      <NumberInput
        labelValue="Husleie"
        defaultValue=""
        changeEventHandler={() => {}}
        inputName="husleie"
      />
    </div>
  );
};

export default CustomerCosts;
