import { useSelector } from "react-redux";
import Input from "./Input";
import MultiSelect from "./MultiSelect";
import TextEditor from "./TextEditor";



const styles = `
  .rbf-root {
    --orange-50: #FFF4ED;
    --orange-100: #FFE4CC;
    --orange-200: #FFC599;
    --orange-400: #F97316;
    --orange-600: #C2410C;
    --orange-800: #7C2D12;
    --sky-50: #F0F9FF;
    --sky-100: #E0F2FE;
    --sky-200: #BAE6FD;
    --sky-400: #38BDF8;
    --sky-600: #0284C7;
    --sky-800: #075985;
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
  }

  .rbf-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 32px;
  }

  @media (max-width: 768px) {
    .rbf-grid { grid-template-columns: 1fr; }
  }

  .rbf-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }

  .rbf-field::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: 2px;
    background: var(--orange-200);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .rbf-field:focus-within::before {
    opacity: 1;
    background: var(--orange-400);
  }

  .rbf-field.col-span-2 {
    grid-column: 1 / -1;
  }

  .rbf-label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rbf-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .rbf-label.dark {
    color: #E5E7EB;
  }

  .rbf-required {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: var(--orange-400);
    border-radius: 50%;
    margin-left: 2px;
    vertical-align: middle;
    flex-shrink: 0;
  }

  .rbf-optional-badge {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--sky-600);
    background: var(--sky-100);
    border: 1px solid var(--sky-200);
    padding: 2px 8px;
    border-radius: 20px;
  }

  .rbf-optional-badge.dark {
    color: var(--sky-200);
    background: rgba(56, 189, 248, 0.12);
    border-color: rgba(56, 189, 248, 0.25);
  }

  /* Input overrides */
  .rbf-field input,
  .rbf-field textarea,
  .rbf-field select {
    border: 1.5px solid #E5E7EB;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 14px;
    font-family: inherit;
    background: #FFFFFF;
    color: #111827;
    outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
    width: 100%;
    box-sizing: border-box;
  }

  .rbf-field.dark input,
  .rbf-field.dark textarea,
  .rbf-field.dark select {
    background: #1F2937;
    border-color: #374151;
    color: #F9FAFB;
  }

  .rbf-field input:focus,
  .rbf-field textarea:focus,
  .rbf-field select:focus {
    border-color: var(--orange-400);
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12);
  }

  .rbf-field input:hover:not(:focus),
  .rbf-field textarea:hover:not(:focus),
  .rbf-field select:hover:not(:focus) {
    border-color: var(--sky-400);
  }

  /* Section header decoration */
  .rbf-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
    padding-bottom: 16px;
    border-bottom: 1px solid #F3F4F6;
  }

  .rbf-header.dark {
    border-color: #374151;
  }

  .rbf-header-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--orange-400);
    box-shadow: 0 0 0 4px var(--orange-100);
    flex-shrink: 0;
  }

  .rbf-header-dot.dark {
    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.2);
  }

  .rbf-header-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, var(--orange-200), var(--sky-200), transparent);
  }

  .rbf-header-line.dark {
    background: linear-gradient(to right, rgba(249,115,22,0.4), rgba(56,189,248,0.3), transparent);
  }
`;

const RenderingBasicForm = ({ questions, inputChange, section, subsectionKey }) => {
  const darkMode = useSelector((state) => state.theme);

  return (
    <div className="rbf-root">
      <style>{styles}</style>

      {/* Decorative header line */}
      <div className={`rbf-header${darkMode ? " dark" : ""}`}>
        <div className={`rbf-header-dot${darkMode ? " dark" : ""}`} />
        <div className={`rbf-header-line${darkMode ? " dark" : ""}`} />
      </div>

      <div className="rbf-grid">
        {questions.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`rbf-field${item.isEditorEnabled ? " col-span-2" : ""}${darkMode ? " dark" : ""}`}
          >
            {/* Label row */}
            <div className="rbf-label-row">
              <label className={`rbf-label${darkMode ? " dark" : ""}`}>
                {item.displayQuestion}
                {!item.canSkip && !item.isLastForm && (
                  <span className="rbf-required" title="Required" />
                )}
              </label>

              {item.canSkip && (
                <span className={`rbf-optional-badge${darkMode ? " dark" : ""}`}>
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

            {/* Text Editor */}
            {!item.isMultiSelect && item.isEditorEnabled && (
              <TextEditor
                key={item.id}
                item={item}
                section={section}
                inputChange={inputChange}
                subsectionKey={subsectionKey}
                darkMode={darkMode}
              />
            )}

            {/* Plain Input */}
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
    </div>
  );
};

export default RenderingBasicForm;