import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { enhanceText } from "../utils/enhanceText";

const TextEditor = ({ item, inputChange, subsectionKey }) => {
  const editorRef = useRef(null);
  const [isAILoading, setIsAILoading] = useState(false);
  const [error, setError] = useState("");
  const currentForm = useSelector((state) => state.formData.currentForm);
  const [isBulletPoint, setIsBulletPoint] = useState(false);


  useEffect(() => {
    setIsBulletPoint(["projects", "experience"].includes(currentForm));
  }, [currentForm]);


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
    inputChange(content, item.id, subsectionKey);
  };



  const handleAIGenerate = async () => {
    setError("");
    try {
      setIsAILoading(true);

      if (!editorRef.current) {
        setError("Editor not ready.");
        return;
      }

      const rawText = editorRef.current.getContent({ format: "text" }) || "";
      console.log(rawText)

      let aiSuggestionResult = "";

      try {
        // enhanceText now throws on error and returns string on success
        aiSuggestionResult = await enhanceText(rawText, item.maxLength, item.minLength);
      } catch (err) {
        // show a friendly message and also log the underlying error
        console.error("AI call failed:", err.message || err);
        return;
      }
      // setContent is synchronous-ish but returns nothing — still await in case plugin returns a promise
      await editorRef.current.setContent(aiSuggestionResult);

      // update Redux using the same inputChange function you already use.
      // Make sure your inputChange signature matches: (value, id, subsectionKey)
      inputChange(aiSuggestionResult, item.id, subsectionKey);

      // Optional: force validation/run the handler that your editor change normally uses:
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
        // value={item.answer || ""}
        initialValue={item.answer || ""}
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