import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useHomeLanguage } from "../../context/HomeLanguageProvider";
import { translate } from "../../context/translate";

type TosModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ToSModal = ({ open, onClose, onConfirm }: TosModalProps) => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const allChecked = agreeTerms && agreePrivacy;
  const { language } = useHomeLanguage();
  const t = translate[language];

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
        <div ref={ref} className="p-10 space-y-8">
          {/* 헤더 */}
          <section className="text-center space-y-5">
            <p className="text-subhead1 font-bold">{t.ToSPPHeader}</p>
            <p className="text-body1 text-gray-700">{t.ToSPPSubHeader}</p>
          </section>

          <section className="flex flex-col space-y-3">
            <div className="flex justify-between">
              <p className="text-subhead2 font-bold text-left">{t.TosHeader}</p>
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
              <div className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-outside pr-2">
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_1}
                </p>
                <p className="mb-4 text-body2 text-gray-700">{t.TosBody_1}</p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_2}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.TosBody_2}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_3}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.TosBody_3}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_4}
                </p>
                <p className="mb-4 text-body2 text-gray-700">{t.TosBody_4}</p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_5}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.TosBody_5}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_6}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.TosBody_6}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_7}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.TosBody_7}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_8}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.TosBody_8}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_9}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.TosBody_9}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_10}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.TosBody_10}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_11}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.TosBody_11}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_12}
                </p>
                <p className="mb-4 text-body2 text-gray-700">{t.TosBody_12}</p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.TosTitle_13}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.TosBody_13}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.SupplementaryTitle}
                </p>
                <p className="mb-4 text-body2 text-gray-700">
                  {t.SupplementaryBody}
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col space-y-3">
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
              <div className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-outside pr-2">
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

          <section className="flex flex-col space-y-3">
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
