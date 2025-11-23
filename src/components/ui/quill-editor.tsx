"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}


/**
 * Load ReactQuill only on client
 */
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[150px] bg-gray-100 animate-pulse rounded-md" />
  ),
});



/**
 * Toolbar configuration
 */
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const QuillEditor = ({ value, onChange, id }: QuillEditorProps) => {
  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "bullet",
      "color",
      "background",
      "link",
      "image",
    ],
    []
  );

  return (
    <div className="quill-editor-wrapper">
      <ReactQuill
        id={id}
        value={value}
        onChange={(content) => {
          const cleaned = content === "<p><br></p>" ? "" : content;
          onChange(cleaned);
        }}
        modules={quillModules}
        formats={formats}
        theme="snow"
      />

      {/* Custom Styles */}
      <style jsx global>{`
        .quill-editor-wrapper .ql-container {
          border-color: #147575 !important;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          min-height: 150px;
          font-size: 1rem;
        }

        .quill-editor-wrapper .ql-toolbar {
          border-color: #147575 !important;
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          background: #f8fafc;
        }

        .quill-editor-wrapper .ql-editor {
          min-height: 150px;
        }

        .ql-toolbar button:hover,
        .ql-toolbar .ql-picker:hover {
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default QuillEditor;
