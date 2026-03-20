import Select from "react-select";
import { skillsOptions } from "../constant";

// Orange × Sky blue custom styles for react-select (cannot be done with Tailwind alone)
const buildCustomStyles = (darkMode) => ({
    control: (base, state) => ({
        ...base,
        backgroundColor: darkMode ? "#1e293b" : "#ffffff",
        borderColor: state.isFocused
            ? "#f97316"
            : state.isHovered
                ? "#38bdf8"
                : darkMode ? "#334155" : "#e5e7eb",
        borderWidth: "1.5px",
        borderRadius: "8px",
        boxShadow: state.isFocused ? "0 0 0 3px rgba(249,115,22,0.12)" : "none",
        minHeight: "42px",
        cursor: "pointer",
        transition: "border-color 0.17s, box-shadow 0.17s",
        "&:hover": {
            borderColor: "#38bdf8",
        },
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: darkMode ? "#1e293b" : "#ffffff",
        border: `1.5px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
        borderRadius: "10px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
        overflow: "hidden",
        zIndex: 50,
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? "#f97316"
            : state.isFocused
                ? darkMode ? "#293548" : "#f0f9ff"
                : "transparent",
        color: state.isSelected
            ? "#ffffff"
            : darkMode ? "#f1f5f9" : "#111827",
        fontSize: "13.5px",
        cursor: "pointer",
        "&:active": { backgroundColor: "#c2410c" },
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: "#fff4ed",
        borderRadius: "6px",
        border: "1px solid #ffc599",
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: "#c2410c",
        fontSize: "12px",
        fontWeight: "600",
        padding: "2px 4px",
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: "#f97316",
        borderRadius: "0 6px 6px 0",
        "&:hover": { backgroundColor: "#ffe4cc", color: "#c2410c" },
    }),
    placeholder: (base) => ({
        ...base,
        color: darkMode ? "#64748b" : "#9ca3af",
        fontSize: "13.5px",
    }),
    input: (base) => ({
        ...base,
        color: darkMode ? "#f1f5f9" : "#111827",
        fontSize: "13.5px",
    }),
    clearIndicator: (base) => ({
        ...base,
        color: "#9ca3af",
        "&:hover": { color: "#f97316" },
        cursor: "pointer",
    }),
    dropdownIndicator: (base, state) => ({
        ...base,
        color: state.isFocused ? "#f97316" : "#9ca3af",
        "&:hover": { color: "#38bdf8" },
        transition: "color 0.15s",
    }),
    indicatorSeparator: (base) => ({
        ...base,
        backgroundColor: "#e5e7eb",
    }),
});

const MultiSelect = ({ item, inputChange, subsectionKey, darkMode }) => {
    const skillType = subsectionKey || item.id;
    const options = skillsOptions[skillType] || [];

    const parseValue = () => {
        if (!item.answer) return [];
        let answer = item.answer;
        if (typeof answer === "string") {
            answer = answer.split(",").map((v) => v.trim());
        }
        if (Array.isArray(answer)) {
            return answer.map((val) => {
                if (typeof val === "object") return val;
                const match = options.find((opt) => opt.label === val || opt.value === val);
                return match || { label: val, value: val };
            });
        }
        return [];
    };

    const handleChange = (selectedOptions) => {
        const values = selectedOptions
            ? selectedOptions.map((opt) => opt.value).join(", ")
            : "";
        inputChange(values, item);
    };

    return (
        <div className="w-full space-y-2">
            <Select
                isMulti
                name={item.id}
                options={options}
                value={parseValue()}
                onChange={handleChange}
                placeholder={`Select ${item.displayQuestion || "skills"}…`}
                classNamePrefix="rsel"
                styles={buildCustomStyles(darkMode)}
                isClearable
            />

            {/* Selected summary pill row */}
            {item.answer && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.answer.split(",").map((v) => v.trim()).filter(Boolean).map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full"
                        >
                            <span className="w-1 h-1 rounded-full bg-sky-400 inline-block" />
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;