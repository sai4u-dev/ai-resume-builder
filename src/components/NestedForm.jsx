import { useState, useEffect } from "react";
import RenderingBasicForm from "./RenderBasicForm";

const NestedForm = ({ nestedData, section, labelFormatter, inputChange }) => {
  const tabs = Object.keys(nestedData || {});
  const [activeTab, setActiveTab] = useState(tabs[0] || null);
  const [skippedTabs, setSkippedTabs] = useState([]);

  const handleSkipTab = () => {
    setSkippedTabs((prev) => [...prev, activeTab]);
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  function hasSkippableFields() {
    const questions = nestedData[activeTab];
    if (!questions || !Array.isArray(questions)) return false;
    return questions.some((q) => q.canSkip === true);
  }

  useEffect(() => {
    setActiveTab(tabs[0] || null);
    setSkippedTabs([]);
  }, [section]);

  return (
    <div className="space-y-0">

      {/* Tab strip */}
      <div className="flex flex-wrap gap-2 pb-5 mb-6 border-b border-sky-100">
        {tabs.map((key, idx) => {
          const isActive = activeTab === key;
          const isSkipped = skippedTabs.includes(key);

          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              type="button"
              className={`relative px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200
                ${isActive
                  ? "bg-orange-500 text-white shadow-[0_4px_14px_rgba(249,115,22,0.35)]"
                  : isSkipped
                    ? "bg-sky-50 text-sky-400 border border-sky-200 line-through"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50"
                }`}
            >
              {/* Active left-edge indicator */}
              {isActive && (
                <span className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-5 bg-orange-300 rounded-r-full" />
              )}
              {labelFormatter ? labelFormatter(key) : key}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      <div>
        {tabs.map((key) => {
          const isSkipped = skippedTabs.includes(key);

          return (
            <div key={key} className={activeTab === key ? "block" : "hidden"}>

              {/* Skipped badge row */}
              {isSkipped && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                    Skipped
                  </span>
                </div>
              )}

              {/* Skip button if applicable */}
              {hasSkippableFields() && !isSkipped && (
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={handleSkipTab}
                    className="text-xs font-semibold text-sky-500 border border-sky-200 bg-sky-50 hover:bg-sky-100 hover:border-sky-400 px-3 py-1.5 rounded-lg transition-all duration-150"
                  >
                    Skip this section →
                  </button>
                </div>
              )}

              {/* Questions */}
              <RenderingBasicForm
                questions={nestedData[key] || []}
                inputChange={(text, item) => inputChange(text, item, key)}
                section={section}
                subsectionKey={key}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NestedForm;