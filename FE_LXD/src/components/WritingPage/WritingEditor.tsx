import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // or quill.bubble.css for bubble theme
import "./QullEditor.css";

function WritingEditor() {
  const [content, setContent] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image"],
      [{ color: [] }],
      [{ align: [] }],
      [{ clean: [] }],
    ],
  };

  const ref = useRef(null);
  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div>
      <ReactQuill
        // className="w-full h-150 mb-5 bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] border-none box-shadow-none"
        className="custom-quill-editor w-full h-150 mb-5 bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] border-none box-shadow-none"
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
      />
    </div>
  );
}

export default WritingEditor;
