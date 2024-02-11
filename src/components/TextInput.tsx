import React from "react";

interface TextInputProps {
  labelValue: string;
  defaultValue?: string; // Optional
  changeEventHandler: (value: string) => void;
  displayValue?: string; // Optional
  inputStyles?: string; // Optional
  inputName: string;
  subheading?: string; // Optional
}

const TextInput: React.FC<TextInputProps> = ({
  labelValue,
  defaultValue = "", // Set default value
  changeEventHandler,
  displayValue,
  inputStyles,
  inputName,
  subheading,
}) => {
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
        className={`bg-slate-800 text-white p-2 rounded-md w-fit mx-auto text-center block text-xl font-light ${inputStyles}`}
        value={defaultValue}
        onChange={(e) => changeEventHandler(e.target.value)}
      />
      {displayValue && <div>{displayValue}</div>}
    </div>
  );
};

export default TextInput;
