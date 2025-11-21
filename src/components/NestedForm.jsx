import  { useState, useEffect } from "react";
import RenderingBasicForm from "./RenderBasicForm";

const NestedForm = ({ nestedData, section, labelFormatter, inputChange }) => {

  // Storing sub section as tabls
  const tabs = Object.keys(nestedData || {});

  const [activeTab, setActiveTab] = useState(tabs[0] || null);
  const [skippedTabs, setSkippedTabs] = useState([]);


  // ---------- SKIP LOGIC -------------
  const handleSkipTab = () => {
    setSkippedTabs((prev) => [...prev, activeTab]);

    const index = tabs.indexOf(activeTab);
    if (index < tabs.length - 1) {
      setActiveTab(tabs[index + 1]);
    }
  };

  const hasSkippableFields = () => {
    const fields = nestedData[activeTab];

    if (!fields || !Array.isArray(fields)) return false;

    return fields.some((f) => f.canSkip === true);
  };



  // Reset tabs on section change
  useEffect(() => {
    setActiveTab(tabs[0] || null);
    setSkippedTabs([]);
  }, [section]);


  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {tabs.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            type="button"
            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === key
                ? "bg-green-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {labelFormatter ? labelFormatter(key) : key}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-6">
        {tabs.map((key) => (
          <div key={key} className={activeTab === key ? "block" : "hidden"}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {labelFormatter ? labelFormatter(key) : key}
              </h3>

              {/* Skip Button */}
              {(() => {
                const canSkip = hasSkippableFields();
                const isSkipped = skippedTabs.includes(key);

                return (
                  <>
                    {canSkip && !isSkipped && (
                      <button
                        onClick={handleSkipTab}
                        type="button"
                        className="text-sm text-gray-600 hover:text-gray-800 underline"
                      >
                        Skip this section
                      </button>
                    )}

                    {isSkipped && (
                      <span className="text-xs text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                        Skipped
                      </span>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Actual Questions */}
            <RenderingBasicForm
              questions={nestedData[key] || []}
              inputChange={(text, item) => inputChange(text, item, key)}
              section={section}
              subsectionKey={key}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NestedForm;
