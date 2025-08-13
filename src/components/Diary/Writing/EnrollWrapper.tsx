import { useState, useRef } from "react";
import EnrollButton from "./EnrollButton";
import EnrollModal from "./EnrollModal";
import useOutsideClick from "../../../hooks/useOutsideClick";

interface EnrollWrapperProps {
  _titleName: string;
  _editorRawContent: string;
  _style?: string;
  thumbImg?: string;
}

const EnrollWrapper = ({
  _titleName,
  _editorRawContent,
  _style,
  thumbImg,
}: EnrollWrapperProps) => {
  const [openModal, setOpenModal] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => setOpenModal(false));

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
            thumbImg={thumbImg}
          />
        </div>
      )}
    </div>
  );
};

export default EnrollWrapper;
