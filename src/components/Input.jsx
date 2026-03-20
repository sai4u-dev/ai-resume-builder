import React from "react";
import { getInputType } from "../utils/commonFunctions/forms";

const inputStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

  .inp-root {
    --or200: #FFC599;
    --or400: #F97316;
    --or600: #C2410C;
    --sk200: #BAE6FD;
    --sk400: #38BDF8;
    --sk600: #0284C7;
    font-family: 'DM Sans', sans-serif;
  }

  .inp-base {
    width: 100%;
    padding: 10px 14px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    border-radius: 8px;
    border: 1.5px solid #E5E7EB;
    background: #FFFFFF;
    color: #111827;
    outline: none;
    transition: border-color 0.17s ease, box-shadow 0.17s ease;
    box-sizing: border-box;
    -webkit-appearance: none;
  }

  .inp-base:hover:not(:focus) {
    border-color: var(--sk400);
  }

  .inp-base:focus {
    border-color: var(--or400);
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12);
  }

  .inp-base.dark {
    background: #1E293B;
    border-color: #334155;
    color: #F1F5F9;
  }

  .inp-base.dark:hover:not(:focus) {
    border-color: var(--sk400);
  }

  .inp-base.dark:focus {
    border-color: var(--or400);
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.18);
  }

  /* Select arrow */
  .inp-select-wrap {
    position: relative;
  }
  .inp-select-wrap::after {
    content: '';
    pointer-events: none;
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #9CA3AF;
  }
  .inp-select-wrap:focus-within::after {
    border-top-color: var(--or400);
  }
  .inp-select-wrap select {
    padding-right: 36px;
    cursor: pointer;
  }

  /* Textarea */
  .inp-base.textarea {
    resize: vertical;
    min-height: 100px;
    line-height: 1.6;
  }

  /* Error state */
  .inp-base.error {
    border-color: #EF4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
`;

const Input = ({ item, inputChange, darkMode, error }) => {
    const inputType = getInputType(item);
    const dm = darkMode ? 'dark' : '';
    const errClass = error ? 'error' : '';

    const handleChange = (value) => {
        inputChange(value, item);
    };

    if (item.element === "select") {
        return (
            <div className="inp-root">
                <style>{inputStyles}</style>
                <div className="inp-select-wrap">
                    <select
                        value={item.answer || ""}
                        onChange={(e) => handleChange(e.target.value)}
                        className={`inp-base ${dm} ${errClass}`}
                    >
                        {item.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }

    if (inputType === "textarea") {
        return (
            <div className="inp-root">
                <style>{inputStyles}</style>
                <textarea
                    value={item.answer || ""}
                    onChange={(e) => handleChange(e.target.value)}
                    className={`inp-base textarea ${dm} ${errClass}`}
                    rows="4"
                />
            </div>
        );
    }

    return (
        <div className="inp-root">
            <style>{inputStyles}</style>
            <input
                type={inputType}
                value={item.answer || ""}
                onChange={(e) => handleChange(e.target.value)}
                className={`inp-base ${dm} ${errClass}`}
                maxLength={item.maxLength}
            />
        </div>
    );
};

export default Input;