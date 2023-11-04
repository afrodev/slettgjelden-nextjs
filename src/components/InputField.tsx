interface InputFieldProps {
    name: string;
    value: any;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ name, value, onChange }) => {
    return (
        <div className="flex justify-between w-full">
            <label>{name}</label>
            <input type="text" name={name} value={value} onChange={onChange} className="w-full max-w-[9rem] "/>
        </div>
    );
}

export default InputField