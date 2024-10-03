const RadioButton = ({ name, value, checked, onChange, label }) => {
    return (
        <label className="radio-label">
            <input
                className="radio"
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            /> {label}
        </label>
    );
};

export default RadioButton;