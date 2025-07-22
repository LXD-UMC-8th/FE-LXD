import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // or quill.bubble.css for bubble theme

interface WritingEditorProps {
  value?: string;
  onChange?: (content: string) => void;
}

const WritingEditor = ({ value, onChange }: WritingEditorProps) => {
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["image"],
    [{ color: [] }],
    [{ align: [] }],
  ];

  return (
    <div className="h-full border-none">
      <ReactQuill
        // className="w-full h-150 mb-5 bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] border-none box-shadow-none"
        className="custom-quill-editor w-full mb-10 h-auto min-h-150 bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] border-none box-shadow-none"
        value={value}
        onChange={onChange}
        modules={{ toolbar: toolbarOptions }}
      />
    </div>
  );
};

export default WritingEditor;
