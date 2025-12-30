import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { enhanceText } from "../api/enhance";

const TextEditor = ({ item, section, inputChange, subsectionKey }) => {
  const editorRef = useRef(null);
  const [isAILoading, setIsAILoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const darkMode = useSelector((state) => state.theme);

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

  const currentForm = useSelector((state) => state.formData.currentForm);
  const [isBulletPoint, setIsBulletPoint] = useState(false);

  useEffect(() => {
    setIsBulletPoint(["projects", "experience"].includes(currentForm));
  }, [currentForm]);

  const handleAIGenerate = async () => {
    setError("");
    try {
      setIsAILoading(true);

      if (!editorRef.current) {
        setError("Editor not ready.");
        return;
      }

      const rawText = editorRef.current.getContent({ format: "text" }) || "";
      console.log(rawText);

      let aiSuggestionResult = "";

      try {
        aiSuggestionResult = await enhanceText(
          rawText,
          item.maxLength,
          item.minLength,
          isBulletPoint // 🔥 NEW PARAM PASSED HERE
        );
      } catch (err) {
        console.error("AI call failed:", err.message || err);
        return;
      }

      await editorRef.current.setContent(aiSuggestionResult);
      inputChange(aiSuggestionResult, item.id, subsectionKey);
      handleEditorChange(aiSuggestionResult);

    } finally {
      setIsAILoading(false);
    }
  };

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
            className={`${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} px-3 py-1.5 text-sm text-white rounded-lg transition-colors`}
          >
            {isAILoading ? "Generating..." : "Optimise from AI"}
          </button>
        </div>
      )}

      <div className="relative w-full" style={{ height: 300 }}>
        {!isEditorReady && (
          <div className="absolute inset-0 rounded-lg bg-gray-200 animate-pulse z-10"></div>
        )}

        <div className={`absolute inset-0 transition-opacity duration-300 ${isEditorReady ? "opacity-100" : "opacity-0"}`}>
          <Editor
            key={isBulletPoint}
            apiKey="j8bl7dzuvvkrs2og2grjdqqjy1mx9rmujnys1y6fwej0q21m"
            onInit={(evt, editor) => {
              editorRef.current = editor;
              setIsEditorReady(true);
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
