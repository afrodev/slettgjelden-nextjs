const InputField = ({ name }) => {
    return (
        <div className="flex justify-between">
            <label>{name}</label>
            <input type="text" name={name} className="w-full max-w-[9rem] "/>
        </div>
    );
}

export default InputField