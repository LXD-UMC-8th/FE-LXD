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

  // const modules = useMemo(
  //   () => ({
  //     toolbar: {
  //       container: [
  //         [{ header: [1, 2, 3, false] }],
  //         ["bold", "italic", "underline", "strike"],
  //         [{ list: "ordered" }, { list: "bullet" }],
  //         ["image"],
  //         [{ color: [] }],
  //         [{ align: [] }],
  //         [{ clean: [] }],
  //       ],
  //       handlers: {
  //         // override the built-in image handler
  //         image: function () {
  //           const quill = this.quill as Quill;
  //           const currentImageCount = quill.root.querySelectorAll("img").length;

  //           if (currentImageCount >= 5) {
  //             alert("최대 5개 이미지까지 업로드할 수 있습니다.");
  //             return;
  //           }

  //           // copy-and-pasted from Quill’s default image handler:
  //           const input = document.createElement("input");
  //           input.setAttribute("type", "file");
  //           input.setAttribute("accept", "image/*");
  //           input.click();

  //           input.onchange = () => {
  //             const file = input.files![0];
  //             if (!file) return;

  //             const reader = new FileReader();
  //             reader.onload = () => {
  //               const base64 = reader.result;
  //               const range = quill.getSelection(true);
  //               quill.insertEmbed(range.index, "image", base64);
  //               quill.setSelection(range.index + 1);
  //             };
  //             reader.readAsDataURL(file);
  //           };
  //         },
  //       },
  //     },
  //   }),
  //   [],
  // );

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
