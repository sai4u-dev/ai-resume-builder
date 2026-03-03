import { useSelector } from "react-redux";
import Input from "./Input";
import MultiSelect from "./MultiSelect";
import TextEditor from "./TextEditor";

const RenderingBasicForm = ({
  questions,
  inputChange,
  section,
  subsectionKey,
}) => {
  const darkMode = useSelector((state) => state.theme);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {questions.map((item, idx) => (
        <div
          key={item.id || idx}
          className={`${item.isEditorEnabled ? "col-span-2" : ""}`}
        >
          {/* Label */}
          <div className="flex justify-between items-center mb-2">
            <label
              className={`${darkMode ? "text-gray-200" : "text-gray-700"
                } block text-sm font-medium`}
            >
              {item.displayQuestion}
              {!item.canSkip && !item.isLastForm && (
                <span className="ml-1">*</span>
              )}
            </label>

            {item.canSkip && (
              <span
                className={`${darkMode
                  ? "text-gray-300 bg-gray-700"
                  : "text-gray-500 bg-gray-200"
                  } text-xs px-2 py-1 rounded`}
              >
                Optional
              </span>
            )}
          </div>

          {/* Multi Select */}
          {item.isMultiSelect && (
            <MultiSelect
              item={item}
              section={section}
              inputChange={inputChange}
              subsectionKey={subsectionKey}
              darkMode={darkMode}
            />
          )}

          {/* Editor */}
          {!item.isMultiSelect && item.isEditorEnabled && (
            <div className="whitespace-pre-line">
              <TextEditor
                key={item.id}
                item={item}
                section={section}
                inputChange={inputChange}
                subsectionKey={subsectionKey}
                darkMode={darkMode}
              />
            </div>
          )}

          {/* Normal Input */}
          {!item.isMultiSelect && !item.isEditorEnabled && (
            <Input
              item={item}
              inputChange={inputChange}
              darkMode={darkMode}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderingBasicForm;