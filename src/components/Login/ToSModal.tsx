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
            <p className="text-body1 text-gray-700 whitespace-pre-line">
              {t.ToSPPSubHeader}
            </p>
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
                <p className="mb-4 text-subhead3 font-semibold text-gray-700">
                  {t.LXDToS}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.ENGToSTitle_0}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.ENGToSBody_0}
                </p>
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
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.TosBody_12}
                </p>
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
              <p className="text-subhead2 font-bold text-left">{t.PPHeader}</p>
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
                <p className="mb-4 text-subhead3 font-semibold text-gray-700">
                  {t.LXDPP}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.ENGPPTitle_0}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.ENGPPBody_0}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_1}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.PPBody_1}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_2}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.PPBody_2}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_3}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.PPBody_3}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_4}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.PPBody_4}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_5}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.PPBody_5}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_6}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.PPBody_6}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_7}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.PPBody_7}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_8}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.PPBody_8}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_9}
                </p>
                <p className="mb-4 text-body2 text-gray-700">{t.PPBody_9}</p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_10}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.PPBody_10}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_11}
                </p>
                <p className="mb-4 text-body2 text-gray-700 whitespace-pre-line">
                  {t.PPBody_11}
                </p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_12}
                </p>
                <p className="mb-4 text-body2 text-gray-700">{t.PPBody_12}</p>
                <p className="mb-1 text-body1 font-semibold text-gray-700">
                  {t.PPTitle_13}
                </p>
                <p className="mb-4 text-body2 text-gray-700">{t.PPBody_13}</p>
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
              <p className="text-subhead2 font-bold text-left">{t.TosAgreed}</p>
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
                {t.accept}
              </span>
            </button>

            <button
              type="button"
              className="flex flex-1 h-16 bg-onPrimary rounded-[5px] text-[#5076F3] text-body1 
              font-medium cursor-pointer hover:scale-105 duration-300"
              onClick={onClose}
            >
              <span className="flex w-full justify-center items-center">
                {t.Close}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToSModal;
