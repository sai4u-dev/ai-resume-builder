import { useDispatch } from "react-redux";
import Select from "react-select";
import { customStyles, skillsOptions } from "../constant";



const MultiSelect = ({ item, section, inputChange, subsectionKey, darkMode }) => {

    const skillType = subsectionKey || item.id;
    const options = skillsOptions[skillType] || [];

    const parseValue = () => {
        if (!item.answer) return [];

        if (Array.isArray(item.answer)) {
            return item.answer.map(val =>
                typeof val === 'string'
                    ? options.find(opt => opt.value === val || opt.label === val) || { value: val, label: val }
                    : val
            );
        }

        if (typeof item.answer === 'string') {
            return item.answer.split(',').map(val => {
                const trimmed = val.trim();
                return options.find(opt => opt.value === trimmed || opt.label === trimmed) || { value: trimmed, label: trimmed };
            }).filter(Boolean);
        }

        return [];
    };

    const handleChange = (selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map(opt => opt.label).join(', ') : '';

        // Call inputChange to update Redux store
        inputChange(values, item);
    };


    return (
        <div className="w-full">
            <Select
                isMulti
                name={item.id}
                options={options}
                // defaultValue={}
                value={parseValue()}
                onChange={handleChange}
                placeholder={`Select ${item.displayQuestion || 'skills'}...`}
                classNamePrefix="select"
                styles={customStyles}
                isClearable
            />


            {item.answer && (
                <div className={`mt-2 text-sm transition-colors duration-500 ${darkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                    <span className="font-medium">Selected: </span>
                    {item.answer}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;