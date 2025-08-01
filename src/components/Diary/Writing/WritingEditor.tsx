import { useMemo, useRef, useCallback } from "react";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { postDiaryImage } from "../../../apis/diary";
// import Quill from "quill";

const MAX_IMAGES = 5;

interface WritingEditorProps {
  value?: string;
  onChange?: (content: string) => void;
}

const WritingEditor = ({ value, onChange }: WritingEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = useCallback(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const currentImageCount = editor.container.querySelectorAll("img").length;
    if (currentImageCount >= MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}개까지만 추가할 수 있습니다.`);
      return;
    }

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "true"); // Allow multiple file selection
    input.click();

    input.onchange = () => {
      const files = input.files;
      if (files) {
        if (files.length + currentImageCount > MAX_IMAGES) {
          alert(
            `한 번에 ${MAX_IMAGES - currentImageCount}개까지만 추가할 수 있습니다.`,
          );
          return;
        }

        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            const imageUrl = reader.result as string;
            const range = editor.getSelection(true); // Get the current selection
            if (range?.index !== undefined) {
              // Insert the image at the current cursor position
              editor.insertEmbed(range.index, "image", imageUrl);
              // Move the cursor after the inserted image
              editor.setSelection(range.index + 1, 0);
            }

            console.log(imageUrl);
            postDiaryImage({ image: imageUrl })
              .then((response) => {
                console.log("Image uploaded successfully:", response);
                const imageUrl = response.result.imageUrl;
                editor.deleteText(range.index, 1);
                editor.insertEmbed(range.index, "image", imageUrl);
                editor.setSelection(range.index + 1, 0);
              })
              .catch((error) => {
                console.error("Error uploading image:", error);
                editor.deleteText(range.index, 1);
                alert("Image upload failed. Please try again.");
              });
          };
          reader.readAsDataURL(file);
        });
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image"],
          [{ color: [] }],
          [{ align: [] }],
        ],
        handlers: {
          image: imageHandler,
        },
        // imageDrop: true, // Enable image drop support
      },
    }),
    [imageHandler],
  );

  const handleWrapperClick = () => {
    quillRef.current?.focus();
  };

  return (
    <div
      className="h-full border-none hover:cursor-text focus:cursor-text"
      onClick={handleWrapperClick}
    >
      <ReactQuill
        ref={quillRef}
        className="custom-quill-editor w-full mb-10 h-auto min-h-150 bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] border-none"
        value={value}
        onChange={onChange}
        modules={modules}
        theme="snow"
      />
    </div>
  );
};

export default WritingEditor;
