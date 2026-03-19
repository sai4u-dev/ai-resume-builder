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

    if (!item.canSkip && !text) {
      setError("This field is required");
      return false;
    }
    if (item.minLength && text.length < item.minLength) {
      setError(`Minimum ${item.minLength} characters required`);
      return false;
    }
    if (item.maxLength && text.length > item.maxLength) {
      setError(`Maximum ${item.maxLength} characters allowed`);
      return false;
    }
    return true;
  };

  const handleChange = (newContent) => {
    setValue(newContent);
    validateEditorContent(newContent);
    inputChange(newContent, item, subsectionKey);
  };

  const handleAIGenerate = async () => {
    setError("");

    if (!value?.trim()) {
      setError("Please enter some text before using AI.");
      return;
    }

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
      console.error("AI call failed:", err.message);
      setError(err.message || "AI enhancement failed.");
    } finally {
      setIsAILoading(false);
    }
  };

  const getCharCount = () => {
    return value.replace(/<[^>]*>/g, "").trim().length;
  };


  const modules = useMemo(
    () => ({
      toolbar: isBulletPoint
        ? [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          [{ list: "bullet" }, { list: "ordered" }],
          ["link"],
          ["clean"],
        ]
        : [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          ["link"],
          ["clean"],
        ],
    }),
    [isBulletPoint]
  );

  return (
    <div className="relative w-full col-span-2">
      {item.aiEnabled && (
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={handleAIGenerate}
            disabled={isAILoading}
            className={`${darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-500 hover:bg-purple-600"
              } px-3 py-1.5 text-sm text-white rounded-lg transition-colors disabled:opacity-50`}
          >
            {isAILoading ? "Generating..." : "Optimise from AI"}
          </button>
        </div>
      )}

      <div className="relative w-full" style={{ height: 300 }}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={modules}
          style={{ height: "260px" }}
          className="h-[260px] bg-white "
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {item.maxLength && (
        <p className="text-gray-500 text-xs mt-1 text-right">
          {getCharCount()}/{item.maxLength} characters
        </p>
      )}
    </div>
  );
};

export default TextEditor;