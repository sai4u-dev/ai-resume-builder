import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { enhanceText } from "../api/enhance";

const TextEditor = ({ item, section, inputChange, subsectionKey }) => {
  const editorRef = useRef(null);
  const [isAILoading, setIsAILoading] = useState(false);
  const [error, setError] = useState("");
  const darkMode = useSelector((state) => state.theme);
  const currentForm = useSelector((state) => state.formData.currentForm);
  const [isBulletPoint, setIsBulletPoint] = useState(false);

  useEffect(() => {
    setIsBulletPoint(["projects", "experience"].includes(currentForm));
  }, [currentForm]);

  // Validate editor content based on rules from `item`
  const validateEditorContent = (content) => {
    setError("");
    const text = content.replace(/<[^>]*>/g, "").trim();

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

  const handleEditorChange = (content) => {
    validateEditorContent(content);
    inputChange(content, item, subsectionKey);
  };

  // Handle AI enhancement button click
  const handleAIGenerate = async () => {
    setError("");

    if (!editorRef.current) {
      setError("Editor not ready.");
      return;
    }

    const rawText = editorRef.current.getContent({ format: "text" }) || "";

    if (!rawText.trim()) {
      setError("Please enter text before using AI.");
      return;
    }

    try {
      setIsAILoading(true);

      // Call your API helper with correct object params
      const { result } = await enhanceText({
        inputText: rawText,
        minLength: item.minLength || 100,
        maxLength: item.maxLength || 300,
        asBulletPoints: isBulletPoint,
      });

      // Update editor content and notify parent
      editorRef.current.setContent(result);
      inputChange(result, item.id, subsectionKey);
      validateEditorContent(result);

    } catch (err) {
      console.error("AI call failed:", err.message);
      setError(err.message || "AI enhancement failed.");
    } finally {
      setIsAILoading(false);
    }
  };

  // Get current character count for UI
  const getCharCount = () => {
    return editorRef.current
      ? editorRef.current.getContent({ format: "text" }).trim().length
      : 0;
  };

  return (
    <div className="relative w-full col-span-2">
      {item.aiEnabled && (
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={handleAIGenerate}
            disabled={isAILoading}
            className={`${darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-500 hover:bg-purple-600"
              } px-3 py-1.5 text-sm text-white rounded-lg transition-colors`}
          >
            {isAILoading ? "Generating..." : "Optimise from AI"}
          </button>
        </div>
      )}

      <div className="relative w-full" style={{ height: 300 }}>
        <Editor
          key={isBulletPoint} // reinitialize editor when bullet mode toggles
          apiKey="j8bl7dzuvvkrs2og2grjdqqjy1mx9rmujnys1y6fwej0q21m"
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          value={item.answer || ""}
          onEditorChange={handleEditorChange}
          init={{
            width: "100%",
            height: 300,
            menubar: false,
            statusbar: false,
            plugins:
              "lists advlist autolink link image preview anchor searchreplace code fullscreen table wordcount",
            toolbar: isBulletPoint
              ? "undo redo | formatselect | bold underline | bullist"
              : "undo redo | formatselect | bold underline",
          }}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {item.maxLength && (
        <p className="text-gray-500 text-xs mt-1">
          {getCharCount()}/{item.maxLength} characters
        </p>
      )}
    </div>
  );
};

export default TextEditor;
