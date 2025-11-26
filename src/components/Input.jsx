import React, { useState } from "react";
import { getInputType } from "../utils/commonFunctions/forms";

const Input = ({ item, inputChange }) => {

    const inputType = getInputType(item);

    if (inputType === "textarea") {
        return (
            <div>
                <textarea
                    value={item.answer || ""}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg 
                     focus:ring-2 focus:ring-green-500 
                     border-gray-300"
                    rows="4"
                />
            </div>
        );
    }

    return (
        <div>
            <input
                type={inputType}
                value={item.answer || ""}
                onChange={(e) => inputChange(e.target.value, item)}
                className="w-full px-4 py-2.5 bg-gray-50 border-2 rounded-lg text-black
                   hover:border-purple-600 focus:border-purple-600 
                   border-gray-300"
                maxLength={item.maxLength}
            />
        </div>
    );
};

export default Input;
