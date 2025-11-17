import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { isMobile } from "react-device-detect";
import MobileLanding from "../pages/Etc/MobileLanding";

const MobileGateway = () => {
  // 초기값: 모바일 기기이고, 아직 '강제 진행'을 안 했다면 true (랜딩 페이지 보여줌)
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    // 세션 스토리지 확인 (새로고침 해도 유지, 탭 닫으면 초기화)
    const hasAgreedToBrokenLayout = sessionStorage.getItem("agreedToBrokenLayout");

    // 모바일인데 + 동의한 적 없으면 -> 안내 페이지 띄움
    if (isMobile && !hasAgreedToBrokenLayout) {
      setShowLanding(true);
    }
  }, []);

  const handleContinue = () => {
    // 사용자가 "깨져도 보겠다"고 했으므로 기록 저장
    sessionStorage.setItem("agreedToBrokenLayout", "true");
    setShowLanding(false); // 안내 페이지 끄고 본문 보여줌
  };

  if (showLanding) {
    return <MobileLanding onContinue={handleContinue} />;
  }

  return <Outlet />;
};

export default MobileGateway;