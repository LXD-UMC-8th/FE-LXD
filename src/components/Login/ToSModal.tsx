import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

type TosModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ToSModal = ({ open, onClose, onConfirm }: TosModalProps) => {
  const [agreeTerms, setAgreeTerms] = useState(false); // 첫번째
  const [agreePrivacy, setAgreePrivacy] = useState(false); // 두번째
  const allChecked = agreeTerms && agreePrivacy; // 3

  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick(ref, onClose);

  const toggleAll = (checked: boolean) => {
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className={`relative bg-white w-210 rounded-xl `}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-l p-2 font-bold cursor-pointer"
        >
          ✕
        </button>
        <div ref={ref} className="p-15 space-y-10">
          {/* 헤더 */}
          <section className="text-center space-y-5">
            <p className="text-subhead1 font-bold">
              이용약관 및 개인정보 수집 동의
            </p>
            <p className="text-body1 text-gray-700">
              LXD 서비스 이용을 위한 최초 1회의 약관 동의와 개인정보 수집에 대한
              동의가 필요합니다.
            </p>
          </section>

          <section className="flex flex-col space-y-5">
            <div className="flex justify-between">
              <p className="text-subhead2 font-bold text-left">
                [필수] 이용약관에 동의합니다.
              </p>
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <img
                  src={
                    agreeTerms
                      ? "/images/TosCheck.svg"
                      : "/images/TosNotCheck.svg"
                  }
                  className="h-8 w-8"
                />
              </label>
            </div>

            <div className="flex bg-gray-200 w-130 rounded-xl px-10 py-5 w-full">
              {/* 이용약관 */}
              <div className="max-h-50 overflow-y-auto scrollbar-thin scrollbar-outside pr-2">
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제1조 (목적)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  본 약관은 팀 LXD(이하 "운영팀")가 제공하는 웹사이트 “LXD
                  (Language Xchange Diary)”(이하 "서비스")의 이용 조건 및 절차,
                  이용자와 운영팀 간의 권리, 의무 및 책임사항 및 기타 필요한
                  사항을 규정함을 목적으로 합니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제2조 (용어의 정의)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  1. "회원"이란 본 약관에 따라 서비스에 가입하여 이용하는 자를
                  말합니다. <br /> 2. "게시물"이란 회원이 서비스에 작성한 글,
                  댓글, 이미지 등 모든 콘텐츠를 의미합니다. <br /> 3. "친구
                  신청"이란 회원 간의 상호 교류를 위해 요청하는 기능을 말합니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제3조 (약관의 효력 및 변경)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로
                  공지함으로써 효력이 발생합니다. <br /> 2. 운영팀은 필요 시
                  약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지함으로써
                  효력을 가집니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제4조 (약관 외 준칙)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  본 약관에 명시되지 않은 사항이 전기통신기본법, 전기통신사업법,
                  정보통신촉진법, ‘전자상거래등에서의 소비자 보호에 관한 법률’,
                  ‘약관의 규제에관한법률’, ‘전자거래기본법’, ‘전자서명법’,
                  ‘정보통신망 이용촉진등에 관한 법률’, ‘소비자보호법’ 등 기타
                  관계 법령에 규정되어 있을 경우에는 그 규정을 따르도록 합니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제5조 (회원가입)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  1. 회원가입은 만 14세 이상의 개인만 가능합니다. <br /> 2.
                  회원은 본인의 이메일 또는 구글 계정을 통해 가입할 수 있으며,
                  언제든 탈퇴할 수 있습니다. <br /> 3. 회원은 정확한 정보를
                  제공해야 하며, 허위 정보 제공으로 인한 책임은 본인에게
                  있습니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제6조 (서비스의 제공)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  1. 서비스는 일기 작성, 댓글, 좋아요, 친구 신청 등의 기능을
                  제공합니다. <br /> 2. 운영팀은 서비스의 일부 또는 전부를 변경,
                  중단할 수 있으며, 이 경우 사전에 공지합니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제7조 (게시물의 관리)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  1. 회원이 작성한 게시물은 원칙적으로 회원이 직접 수정 또는
                  삭제할 수 있습니다. 단, 서비스의 성격상 일부 콘텐츠는 서비스
                  기록의 일관성과 학습 목적을 위해 사용자가 직접 삭제할 수
                  없습니다. 해당 콘텐츠의 삭제를 원할 경우, 운영팀에 별도 요청을
                  통해 처리할 수 있습니다. <br /> 2. 운영팀은 게시물이 제9조에
                  해당한다고 판단되는 경우에 사전 통보 없이 게시물을 삭제하거나
                  회원 이용을 제한할 수 있습니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제8조 (회원의 의무)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  1. 회원은 본 약관 및 관련 법령을 준수해야 합니다. <br /> 2.
                  회원은 서비스 이용 시 타인에게 피해를 주지 않아야 하며,
                  서비스의 정상적 운영을 방해해서는 안 됩니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제9조 (이용제한)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  본 사이트 이용 및 행위가 다음 각 항에 해당하는 경우 운영팀은
                  해당 회원의 이용을 제한할 수 있습니다. <br />{" "}
                  &nbsp;&nbsp;&nbsp; - 공공질서 및 미풍양속, 기타 사회질서를
                  해하는 경우
                  <br /> &nbsp;&nbsp;&nbsp; - 범죄행위를 목적으로 하거나 기타
                  범죄행위와 관련된다고 객관적으로 인정되는 경우 <br />
                  &nbsp;&nbsp;&nbsp; - 타인의 명예를 손상시키거나 타인의 서비스
                  이용을 현저히 저해하는 경우 <br />
                  &nbsp;&nbsp;&nbsp; - 타인의 의사에 반하는 내용이나 광고성 정보
                  등을 지속적으로 전송하는 경우
                  <br /> &nbsp;&nbsp;&nbsp; - 해킹 및 컴퓨터 바이러스 유포
                  등으로 서비스의 건전한 운영을 저해하는 경우 <br />
                  &nbsp;&nbsp;&nbsp; - 다른 회원 또는 제3자의 지적재산권을
                  침해하거나 지적재산권자가 지적 재산권의 침해를 주장할 수
                  있다고 판단되는 경우
                  <br /> &nbsp;&nbsp;&nbsp; - 타인의 이메일, 아이디 및
                  비밀번호를 도용한 경우
                  <br /> &nbsp;&nbsp;&nbsp; - 기타 관계 법령에 위배되는 경우 및
                  운영팀이 회원으로서 부적당하다고 판단한 경우
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제10조 (면책조항)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  1. 운영팀은 천재지변, 기술적 문제 등으로 인한 서비스 중단에
                  대해 책임을 지지 않습니다. <br /> 2. 운영팀은 회원간 또는
                  회원과 제3자간의 상호작용이나 게시물에 대한 책임을 지지
                  않습니다. <br /> 3. 운영팀은 회원이 게시판에 게재한 정보,
                  자료, 내용 등에 관하여 사실의 정확성, 신뢰도 등에 어떠한
                  책임도 부담하지 않으며 회원은 본인의 책임 아래 본 사이트를
                  이용해야 합니다. <br /> 4. 회원이 게시 또는 전송한 자료 등에
                  관하여 손해가 발생하거나 자료의 취사선택, 기타 무료로 제공되는
                  서비스 이용과 관련해 어떠한 불이익이 발생하더라도 이에 대한
                  모든 책임은 회원에게 있습니다. <br />
                  5. 이메일과 비밀번호의 관리 및 이용자의 부주의로 인하여
                  발생되는 손해 또는 제3자에 의한 부정사용 등에 대한 책임은
                  회원에게 있습니다. <br /> 6. 회원이 본 약관의 규정을
                  위반함으로써 운영팀에 손해가 발생하는 경우 이 약관을 위반한
                  회원은 운영팀에 발생한 모든 손해를 배상해야 하며 동 손해로부터
                  운영팀을 면책시켜야 합니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제11조 (지적재산권)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  1. 회원이 서비스에 작성한 게시물의 저작권은 작성자에게 있으며,
                  운영팀은 서비스 운영 및 홍보 목적으로 이를 사용할 수 있습니다.{" "}
                  <br />
                  2. 단, 이용자는 자신이 작성한 콘텐츠가 타인의 권리를 침해하지
                  않도록 주의해야 합니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제12조 (준거법 및 재판관할)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  본 약관은 대한민국 법을 따릅니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제13조 (연락처)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  서비스 관련 문의는 아래 이메일로 연락 주시기 바랍니다. <br />
                  이메일: [creativej4u@gmail.com]
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  부칙
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  본 약관은 2025년 8월부터 적용됩니다.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col space-y-5">
            <div className="flex justify-between">
              <p className="text-subhead2 font-bold text-left">
                [필수] 개인정보처리방침에 동의합니다.
              </p>
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                />
                <img
                  src={
                    agreePrivacy
                      ? "/images/TosCheck.svg"
                      : "/images/TosNotCheck.svg"
                  }
                  className="h-8 w-8"
                />
              </label>
            </div>

            <div className="flex bg-gray-200 w-130 rounded-xl px-10 py-5 w-full">
              {/* 개인정보처리방침 */}
              <div className="max-h-50 overflow-y-auto scrollbar-thin scrollbar-outside pr-2">
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제1조 (개인정보의 수집 항목 및 방법)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  1. 운영팀은 회원가입 시 아래의 개인정보를 수집합니다. <br />
                  &nbsp;&nbsp;&nbsp; - 필수항목: 이메일 주소, 아이디, 비밀번호,
                  닉네임, 성명, 국적, 모국어, 학습 언어 <br />
                  &nbsp;&nbsp;&nbsp; - 선택항목: 프로필 사진 <br />
                  2. 개인정보는 사용자가 직접 입력한 방식으로 수집됩니다. <br />
                  3. 자동 수집 항목(예: 쿠키, 로그 등)은 현재 명확히 사용되고
                  있지 않으며, 추후 도입될 경우 본 방침에 추가됩니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제2조 (개인정보의 이용 목적)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  수집한 개인정보는 다음의 목적을 위해 사용됩니다:
                  <br />
                  &nbsp;&nbsp;&nbsp; - 회원 식별 및 인증 <br />
                  &nbsp;&nbsp;&nbsp; - 서비스 제공 및 이용자 관리 <br />
                  &nbsp;&nbsp;&nbsp; - 게시글/댓글 등 사용자 활동 연동 <br />
                  &nbsp;&nbsp;&nbsp; - (선택 동의 시) 마케팅 및 광고 목적의
                  활용이 향후 추가될 수 있습니다. <br />
                  해당 목적이 도입될 경우, 사전 고지 및 동의를 별도로 받을
                  예정입니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제3조 (개인정보의 보유 및 이용 기간)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  회원의 개인정보는 회원 탈퇴 후 일정 기간이 지난 후 지체 없이
                  삭제됩니다. 단, 관련 법령에 따라 보존이 필요한 경우에는 해당
                  기간 동안 보관될 수 있습니다. 구체적인 보유 기간은 추후 서비스
                  운영 정책에 따라 정해지며, 정책 확정 시 본 방침에 추가됩니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제4조 (개인정보의 제3자 제공)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  운영팀은 원칙적으로 이용자의 개인정보를 수집 및 이용 목적 범위
                  내에서만 처리하며, 이용자의 사전 동의 없이 제3자에게 제공하지
                  않습니다. 다만, 다음 각 호의 경우에는 예외로 합니다. <br />
                  1. 이용자가 사전에 제3자 제공에 동의한 경우
                  <br />
                  2. 다른 법률에 특별한 규정이 있는 경우 <br />
                  3. 수사기관이나 법원의 요청이 있는 경우로서, 관련 법령에 따라
                  제공이 허용되는 경우 <br />
                  4. 서비스 제공에 필요한 범위 내에서 최소한의 개인정보가
                  불가피하게 제공되는 경우 (예: 서비스 운영을 위한 위탁 업무
                  수행 시)
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제5조 (개인정보의 처리 위탁)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  운영팀은 서비스의 원활한 제공을 위하여 다음과 같이 개인정보
                  처리 업무의 일부를 외부 업체에 위탁하고 있습니다. 위탁받은
                  업체는 운영팀의 지시에 따라 업무를 수행하며, 개인정보를
                  저장하거나 별도로 활용하지 않습니다.
                  <br /> 1. 이메일 발송 업무 <br />
                  &nbsp;&nbsp;&nbsp; - 위탁 대상: Gmail SMTP, SendGrid <br />
                  2. 서비스 호스팅 및 인프라 운영 <br />
                  &nbsp;&nbsp;&nbsp; - 위탁 대상: Amazon Web Services (EC2, RDS,
                  S3, Route53), nginx <br />
                  3. 일시적 데이터 저장 <br />
                  &nbsp;&nbsp;&nbsp; - 위탁 대상: Redis <br />※ 현재 로그 수집
                  및 분석 시스템은 도입되지 않았으며, 추후 해당 기능이 도입되는
                  경우 변경 사항은 본 방침에 반영하여 고지합니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제6조 (쿠키의 사용)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  현재 쿠키를 통한 개인정보 추적 및 분석은 명확히 사용되지 않고
                  있으며, 로그인 유지 등에 쿠키가 사용될 수 있습니다. 추후 쿠키
                  사용 정책이 도입될 경우 본 방침에 반영하여 고지합니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제7조 (개인정보 보호를 위한 조치)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  운영팀은 개인정보 보호를 위해 적절한 보안 조치를 취하고
                  있으며, 비밀번호는 암호화되어 저장됩니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제8조 (미성년자의 개인정보 보호)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  LXD는 원칙적으로 전 연령 이용을 허용하나, 법적 요건에 따라 만
                  14세 미만 사용자의 경우 법정대리인의 동의를 요청할 수
                  있습니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  제9조 (개인정보 열람 및 삭제)
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  회원은 언제든지 자신의 개인정보를 열람, 수정, 삭제할 수
                  있으며, 탈퇴 요청 시 모든 정보는 즉시 삭제됩니다.
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  * 개인정보 관련 문의
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  본 개인정보처리방침에 대한 문의사항이 있을 경우 아래 이메일로
                  연락 주시기 바랍니다. <br /> 이메일: [creativej4u@gmail.com]
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  부칙
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  본 개인정보처리방침은 2025년 8월부터 적용됩니다.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col space-y-5">
            <div className="flex justify-between">
              <p className="text-subhead2 font-bold text-left">
                이용약관 및 개인정보처리방침에 모두 동의합니다.
              </p>
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={allChecked}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
                <img
                  src={
                    allChecked
                      ? "/images/TosCheck.svg"
                      : "/images/TosNotCheck.svg"
                  }
                  className="h-8 w-8"
                />
              </label>
            </div>
          </section>

          <div className="w-full flex gap-3">
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              disabled={!allChecked}
              className="flex w-110 h-16 bg-primary rounded-[5px] text-white text-body1 
              font-medium cursor-pointer hover:bg-blue-700 disabled:bg-gray-400"
            >
              <span className="flex w-full justify-center items-center">
                확인
              </span>
            </button>

            <button
              type="button"
              className="flex flex-1 h-16 bg-onPrimary rounded-[5px] text-[#5076F3] text-body1 
              font-medium cursor-pointer hover:scale-105 duration-300"
              onClick={onClose}
            >
              <span className="flex w-full justify-center items-center">
                닫기
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToSModal;
