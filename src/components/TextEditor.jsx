import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";

const TextEditor = ({ item, section, inputChange, subsectionKey }) => {
  const editorRef = useRef(null);
  const [isAILoading, setIsAILoading] = useState(false);
  const [error, setError] = useState("");

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
    inputChange(content);
  };

  const handleAIGenerate = async () => {
    setIsAILoading(true);
    await new Promise((res) => setTimeout(res, 1500));

    const aiText = "<p>This is AI generated content.</p>";
    editorRef.current?.setContent(aiText);
    handleEditorChange(aiText);

    setIsAILoading(false);
  };

  const currentForm = useSelector((state) => state.formData.currentForm);
  const [isBulletPoint, setIsBulletPoint] = useState(false);

  useEffect(() => {
    setIsBulletPoint(["projects", "experience"].includes(currentForm));
  }, [currentForm]);

  const getCharCount = () => {
    return editorRef.current
      ? editorRef.current.getContent({ format: "text" }).trim().length
      : 0;
  };

  return (
    <div className="relative w-full col-span-2 ">
      {item.aiEnabled && (
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={handleAIGenerate}
            disabled={isAILoading}
            className="px-3 py-1.5 text-sm bg-purple-500 text-white rounded-lg"
          >
            {isAILoading ? "Generating..." : "Generate with AI"}
          </button>
        </div>
      )}

      <Editor
        apiKey="j8bl7dzuvvkrs2og2grjdqqjy1mx9rmujnys1y6fwej0q21m"
        onInit={(evt, editor) => (editorRef.current = editor)}
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
            ? "undo redo | formatselect | bold underline | bullist "
            : "undo redo | formatselect | bold underline",
        }}
      />

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
