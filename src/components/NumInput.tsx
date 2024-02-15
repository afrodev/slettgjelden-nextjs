import React from "react";

interface NumberInputProps {
  labelValue: string;
  defaultValue: number | string; // Allow both number and string
  changeEventHandler: (value: string) => void; // Input element inherently works with strings
  displayValue?: string;
  inputStyles?: string;
  inputName: string;
  subheading?: string;
}

const NumInput: React.FC<NumberInputProps> = ({
  labelValue,
  defaultValue,
  changeEventHandler,
  displayValue,
  inputStyles,
  inputName,
  subheading,
}) => {
  // Adjusted onChange handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove leading zeros if the value is not just "0"
    if (value.startsWith("0") && value !== "0") {
      value = value.replace(/^0+/, "");
    }

    // If the field is cleared or a non-numeric value is entered, reset to "0"
    if (value === "" || isNaN(Number(value))) {
      changeEventHandler("0");
    } else {
      changeEventHandler(value);
    }
  };

  return (
    <div className="mt-12">
      <label
        className="block text-center mb-1 text-xl font-extralight"
        htmlFor={inputName}
      >
        {labelValue}
      </label>
      {subheading && (
        <div className="text-center text-md font-extralight mb-2">
          {subheading}
        </div>
      )}
      <input
        id={inputName}
        className={`bg-slate-800 text-white p-2 rounded-md w-fit mx-auto text-center block text-xl font-light ${
          inputStyles || ""
        }`}
        value={defaultValue.toString()} // Ensure the value is a string
        onChange={handleChange} // Use the adjusted handleChange
      />
      {displayValue && <div>{displayValue}</div>}
    </div>
  );
};

export default NumInput;
