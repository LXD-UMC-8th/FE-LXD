import { useMemo, useRef, useCallback, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { postDiaryImage } from "../../../apis/diary";
import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";

const MAX_IMAGES = 5;

interface WritingEditorProps {
  value?: string;
  onChange?: (content: string) => void;
}

const WritingEditor = ({ value, onChange }: WritingEditorProps) => {
  const { language } = useLanguage();
  const t = translate[language];

  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    const el = quillRef.current?.getEditor()?.root as HTMLElement | undefined;
    if (el) el.setAttribute("data-role", "diary-content");
  }, []);

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
        const fileList = Array.from(files);
        if (files.length > 1) {
          alert(t.maxOneImage);
          return;
        }
        if (fileList.length + currentImageCount > MAX_IMAGES) {
          alert(t.maxImages);
          return;
        }
        // const editorRange = editor.getSelection(true);
        // const baseIndex = editorRange?.index ?? editor.getLength();

        // type Placeholder = { file: File; src: string; index: number };
        // const placeholder: Placeholder[] = [];
        // let nextIndex = baseIndex;
        // const insertPreview = (file: File) =>
        //   new Promise<Placeholder>((resolve) => {
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //       const src = reader.result as string; //data URL
        //       editor.insertEmbed(nextIndex, "image", src);
        //       editor.setSelection(nextIndex + 1, 0);
        //       const ph: Placeholder = { file, src, index: nextIndex };
        //       placeholder.push(ph);
        //       nextIndex++;
        //       resolve(ph);
        //     };
        //     reader.readAsDataURL(file);
        //   });

        // const previousPromise = fileList.map((f) => insertPreview(f));

        // Promise.all(previousPromise)
        //   .then((inserted) => {
        //     const uploadOne = (ph: Placeholder) => {
        //       const fd = new FormData();
        //       fd.append("image", ph.file);
        //       return postDiaryImage(fd)
        //         .then((res) => {
        //           return { ok: true as const, ph, url: res.result.imageUrl };
        //         })
        //         .catch((err) => {
        //           console.error("Upload failed", err.response || err);
        //           alert("Upload failed—check console for details.");
        //           return { ok: false as const, ph };
        //         });
        //     };
        //     return Promise.allSettled(inserted.map(uploadOne));
        //   })
        //   .then((result) => {
        //     result.forEach((r) => {
        //       if (r.status !== "fulfilled") return;
        //       const outcome = r.value;
        //       const { ph } = outcome;

        //       let replaceIndex = ph.index;
        //       const img = editor.root.querySelector(
        //         `img[src="${ph.src}"]`
        //       ) as HTMLImageElement | null;

        //       if (img) {
        //         const blotIndex = editor.getIndex ? editor.getIndex(img) : null;
        //         if (typeof blotIndex === "number") {
        //           replaceIndex = blotIndex;
        //         }
        //       }

        //       if (outcome.ok) {
        //         editor.deleteText(replaceIndex, 1);
        //         editor.insertEmbed(replaceIndex, "image", outcome.url);
        //         editor.setSelection(replaceIndex + 1, 0);
        //       } else {
        //         console.error("Image upload failed");
        //         editor.deleteText(replaceIndex, 1);
        //       }
        //     });
        //     if (baseIndex === 1 && currentImageCount === 0 && placeholder[0]) {
        //       const firstOk = result.find(
        //         (r) => r.status === "fulfilled" && r.value.ok
        //       ) as
        //         | { status: "fulfilled"; value: { ok: true; url: string } }
        //         | undefined;
        //       if (firstOk) {
        //         localStorage.setItem("thumbImg", firstOk.value.url);
        //       }
        //     }
        //   });

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
          };
          reader.readAsDataURL(file);

          const fd = new FormData();
          fd.append("image", file);
          postDiaryImage(fd)
            .then((res) => {
              const url = res.result.imageUrl;

              const range = editor.getSelection(true)!;
              editor.deleteText(range.index - 1, 1);
              editor.insertEmbed(range.index - 1, "image", url);
              editor.setSelection(range.index, 0);

              if (range.index === 1) {
                localStorage.getItem("thumbImg")
                  ? localStorage.removeItem("thumbImg")
                  : localStorage.setItem("thumbImg", url);
              }
              console.log("thumbImage", localStorage.getItem("thumbImg"));
            })
            .catch(() => {
              alert(t.uploadFailed);
              const range = editor.getSelection(true)!;
              editor.deleteText(range.index - 1, 1);
            });
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
          [/*{ list: "ordered" },*/ { list: "bullet" }],
          ["image"],
          [{ color: [] }],
          [{ align: [] }],
        ],
        handlers: {
          image: imageHandler,
        },
        imageDrop: true, // Enable image drop support
        imageResize: { modules: ["Resize", "DisplaySize"] },
      },
    }),
    [imageHandler]
  );

  const handleWrapperClick = () => {
    quillRef.current?.focus();
  };

  return (
    <div
      className="h-full border-none hover:cursor-text focus:cursor-text"
      onClick={handleWrapperClick}
      data-role="diary-content"
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
