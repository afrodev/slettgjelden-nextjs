"use client"
import React, { useState } from 'react';

interface InputFieldProps {
    name: string;
    value: any;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ name, value, onChange }) => {
    return (
        <div className="flex justify-between w-full">
            <label htmlFor={name}>{name}</label>
            <input type="text" id={name} name={name} value={value} onChange={onChange} className="max-w-[9rem]"/>
        </div>
    );
}

export default InputField
