import Input from "./Input";
import MultiSelect from "./MultiSelect";
import TextEditor from "./TextEditor";


const RenderingBasicForm = ({ questions, inputChange, section, subsectionKey }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {questions.map((item) => (
        <div key={item.id} className={`${item.isEditorEnabled ? "col-span-2" : ""}`}>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {item.displayQuestion}
            </label>

            {item.canSkip && (
              <span className="text-xs text-gray-500 bg-gray-600 px-2 py-1 rounded">
                Optional
              </span>
            )}
          </div>

          {/* Multi Select Field */}
          {item.isMultiSelect ? (
            <MultiSelect
              item={item}
              section={section}
              inputChange={inputChange}
              subsectionKey={subsectionKey}
            />

          ) : item.isEditorEnabled ? (
            <TextEditor
              item={item}
              section={section}
              inputChange={inputChange}
              subsectionKey={subsectionKey}
            />

          ) : (
            <Input
              item={item}
              inputChange={inputChange}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderingBasicForm;