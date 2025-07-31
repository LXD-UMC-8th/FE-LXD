import { useState, useRef, useEffect } from "react";
import EnrollButton from "./EnrollButton";
import EnrollModal from "./EnrollModal";

interface EnrollWrapperProps {
  _titleName: string;
  _editorRawContent: string;
  _style: string;
  onSubmit?: () => void;
}

const EnrollWrapper = ({
  _titleName,
  _editorRawContent,
  _style,
}: EnrollWrapperProps) => {
  const [openModal, setOpenModal] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Optional: click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <EnrollButton onClick={handleOpenModal} />

      {openModal && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <EnrollModal
            _onClose={handleCloseModal}
            _titleName={_titleName}
            _style={_style}
            _editorRawContent={_editorRawContent}
          />
        </div>
      )}
    </div>
  );
};

export default EnrollWrapper;
