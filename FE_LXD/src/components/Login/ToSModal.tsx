const ToSModal = ({ onClose }: { onClose: () => void }) => {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={handleContentClick}
        className={`relative bg-white w-160 rounded-xl `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-l p-2 font-bold cursor-pointer"
        >
          ✕
        </button>
        <div className="p-15 space-y-10">
          {/* 위에 헤더 */}
          <section className="text-center space-y-5">
            <p className="text-subhead2 font-bold">
              이용약관 및 개인정보 수집 동의
            </p>
            <p className="text-body1 text-gray-700">
              lxd 서비스 이용을 위한 최초 1회의 약관 동의와
              <br /> 개인정보 수집에 대한 동의가 필요합니다.
            </p>
          </section>
          {/* 밑에 굵은 글씨랑 회색 본문 */}
          <section className="flex flex-col space-y-5">
            <p className="text-subhead2 font-bold text-left">
              이용약관 및 개인정보 수집에 모두 동의합니다.
            </p>

            <div
              className="flex bg-gray-300 w-130 rounded-xl px-10 py-5
            max-h-150 overflow-y-auto"
            >
              <p>
                제1조 목적 본 약관은 LXD(이하 ‘서비스’)가 제공하는 웹 서비스의
                이용과 관련한 조건과 절차, 회원과 서비스 제공자의 권리 및 의무
                등을 규정합니다. 제2조 용어의 정의 ‘회원’이란 본 약관에 동의하고
                서비스를 이용하는 자를 말합니다. ‘콘텐츠’란 회원이 서비스 내에
                작성하거나 업로드한 글, 댓글, 이미지 등을 의미합니다. 제3조
                약관의 효력 및 변경 본 약관은 웹사이트에 게시함으로써 효력을
                발생합니다. 서비스는 필요 시 약관을 변경할 수 있으며, 변경 시
                사전에 공지합니다. 제4조 서비스 제공 및 변경 본 서비스는
                회원에게 언어 교류, 일기 작성, 피드백 기능을 제공합니다.
                서비스는 사정에 따라 기능을 변경할 수 있으며 사전 공지 후
                진행됩니다. 제5조 회원가입 및 탈퇴 회원은 본인의 이메일 주소를
                사용해 가입하며, 언제든 탈퇴할 수 있습니다. 제6조 회원의 의무
                회원은 타인의 권리를 침해하지 않으며, 건전한 커뮤니케이션 문화를
                유지해야 합니다. 제7조 서비스의 중단 서비스는 서버 점검 등으로
                일시 중단될 수 있으며, 사전 공지를 원칙으로 합니다. 제8조 책임
                제한 회사는 회원 간의 상호작용이나 업로드된 콘텐츠에 대해 책임을
                지지 않습니다. 제9조 준거법 및 재판관할 본 약관은 대한민국 법을
                따릅니다.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ToSModal;
