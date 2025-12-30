import React, { useMemo } from "react";
import { useSelector } from "react-redux";

function ProgressBar({ submittedFormCount }) {
  const allForms = useSelector((state) => state.formData);

  // Get total number of forms
  const allFormCount = useMemo(() => {
    if (allForms) {
      const allFormsInArray = Object.keys(allForms);
      return allFormsInArray.length - 2;
    }
    return 0;
  }, [allForms]);

  // Create circle + line structure
  const steps = useMemo(() => {
    const elements = [];
    for (let i = 1; i <= allFormCount; i++) {
      elements.push(
        <div
          key={`circle-${i}`}
          aria-label={`Step ${i}`}
          className={`w-9 h-9 rounded-full flex justify-center items-center text-base font-semibold transition-all duration-300
            ${i <= submittedFormCount ? "bg-green-500 text-white scale-110" : "bg-gray-300 text-gray-700"}
          `}
        >
          {i}
        </div>
      );

      if (i < allFormCount) {
        elements.push(
          <div
            key={`line-${i}`}
            className={`flex-1 h-1 transition-all duration-300
              ${i < submittedFormCount ? "bg-green-500" : "bg-gray-300"}
            `}
          ></div>
        );
      }
    }
    return elements;
  }, [allFormCount, submittedFormCount]);


  return (
    <div className="w-full flex items-center gap-3 mt-16">
      {/* React will render the elements from the array if array is of ui elements */}
      {steps}
    </div>
  );
}

export default ProgressBar;
