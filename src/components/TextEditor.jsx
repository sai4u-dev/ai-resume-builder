import React, { useRef, useState, useEffect, useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { enhanceText } from "../utils/enhanceText";

const TextEditor = ({ item, section, inputChange, subsectionKey }) => {
  const quillRef = useRef(null);
  const [value, setValue] = useState(item.answer || "");
  const [isAILoading, setIsAILoading] = useState(false);
  const [error, setError] = useState("");
  const darkMode = useSelector((state) => state.theme);
  const currentForm = useSelector((state) => state.formData.currentForm);
  const [isBulletPoint, setIsBulletPoint] = useState(false);

  useEffect(() => {
    setIsBulletPoint(["projects", "experience"].includes(currentForm));
  }, [currentForm]);

  useEffect(() => {
    setValue(item.answer || "");
  }, [item.answer]);

  const validateEditorContent = (content) => {
    setError("");
    const text = (content || "").replace(/<[^>]*>/g, "").trim();
    if (!item.canSkip && !text) { setError("This field is required"); return false; }
    if (item.minLength && text.length < item.minLength) { setError(`Minimum ${item.minLength} characters required`); return false; }
    if (item.maxLength && text.length > item.maxLength) { setError(`Maximum ${item.maxLength} characters allowed`); return false; }
    return true;
  };

  const handleChange = (newContent) => {
    setValue(newContent);
    validateEditorContent(newContent);
    inputChange(newContent, item, subsectionKey);
  };

  const handleAIGenerate = async () => {
    setError("");
    if (!value?.trim()) { setError("Please enter some text before using AI."); return; }
    const plainText = value.replace(/<[^>]*>/g, "").trim();
    try {
      setIsAILoading(true);
      const { result } = await enhanceText({
        inputText: plainText,
        minLength: item.minLength || 100,
        maxLength: item.maxLength || 300,
        asBulletPoints: isBulletPoint,
      });
      setValue(result);
      validateEditorContent(result);
      inputChange(result, item, subsectionKey);
    } catch (err) {
      setError(err.message || "AI enhancement failed.");
    } finally {
      setIsAILoading(false);
    }
  };

  const getCharCount = () => value.replace(/<[^>]*>/g, "").trim().length;

  const modules = useMemo(() => ({
    toolbar: isBulletPoint
      ? [[{ header: [1, 2, 3, false] }], ["bold", "italic", "underline"], [{ list: "bullet" }, { list: "ordered" }], ["link"], ["clean"]]
      : [[{ header: [1, 2, 3, false] }], ["bold", "italic", "underline"], ["link"], ["clean"]],
  }), [isBulletPoint]);

  const charCount = getCharCount();
  const charPct = item.maxLength ? Math.min((charCount / item.maxLength) * 100, 100) : 0;
  const charColor = charPct > 90 ? "text-red-500" : charPct > 70 ? "text-orange-500" : "text-gray-400";
  const barColor = charPct > 90 ? "bg-red-400" : charPct > 70 ? "bg-orange-400" : "bg-sky-400";

  return (
    <div className="relative w-full col-span-2">

      {/* Toolbar row: AI button */}
      {item.aiEnabled && (
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={handleAIGenerate}
            disabled={isAILoading}
            className={`
              inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold
              border transition-all duration-200
              ${isAILoading
                ? "border-orange-200 text-orange-300 bg-orange-50 cursor-not-allowed"
                : darkMode
                  ? "border-orange-500/50 text-orange-400 bg-orange-900/20 hover:bg-orange-900/40 hover:border-orange-400"
                  : "border-orange-300 text-orange-600 bg-orange-50 hover:bg-orange-100 hover:border-orange-400 hover:shadow-[0_2px_12px_rgba(249,115,22,0.18)]"
              }
            `}
          >
            {/* Spark icon */}
            <svg
              className={`w-3.5 h-3.5 ${isAILoading ? "animate-spin" : ""}`}
              viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
              {isAILoading
                ? <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="10 8" />
                : <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" fill="currentColor" />
              }
            </svg>
            {isAILoading ? "Generating…" : "Optimise with AI"}
          </button>
        </div>
      )}

      {/* Editor wrapper */}
      <div
        className={`
          relative w-full rounded-xl overflow-hidden
          border-[1.5px] transition-all duration-200
          ${darkMode
            ? "border-slate-600 bg-slate-800 focus-within:border-orange-500 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.15)]"
            : "border-gray-200 bg-white focus-within:border-orange-400 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.10)] hover:border-sky-300"
          }
        `}
        style={{ height: 310 }}
      >
        {/* Top accent bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-orange-400 via-sky-400 to-transparent" />

        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={modules}
          style={{ height: "260px" }}
          className={`h-[260px] ${darkMode ? "text-white" : "text-gray-900"}`}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="flex items-center gap-1.5 text-red-500 text-xs mt-2 font-medium">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400" />
          {error}
        </p>
      )}

      {/* Char counter + bar */}
      {item.maxLength && (
        <div className="mt-2 space-y-1">
          {/* Bar */}
          <div className="w-full h-1 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${barColor}`}
              style={{ width: `${charPct}%` }}
            />
          </div>
          {/* Count */}
          <p className={`text-xs text-right font-medium ${charColor}`}>
            {charCount} / {item.maxLength}
          </p>
        </div>
      )}
    </div>
  );
};

export default TextEditor;