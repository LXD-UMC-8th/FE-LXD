import { useState } from "react";

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(false); // 언어선택 버튼 상태관리
  const [selected, setSelected] = useState("한국어"); // 언어 옵션 상태관리

  return (
    <div
      className="flex flex-col min-h-screen 
    items-center justify-center space-y-12 px-4"
    >
      {/* language */}
      <div className="absolute top-10 right-30 flex items-center space-x-4">
        <span className="text-body2 text-gray-700 font-medium">language</span>
        {/* 언어선택버튼 */}
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-[99px] bg-gray-100 px-4 py-2.5 
              text-left text-sm border border-gray-400 cursor-pointer
              rounded-md focus:outline-none focus:ring-1"
          >
            <span className="block truncate text-gray-900">{selected}</span>

            {/* Arrow Icon */}
            <span
              className="absolute inset-y-0 right-0 flex items-center 
              pr-3 pointer-events-none"
            >
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>

          {isOpen && (
            <div
              className="absolute z-10 w-full mt-1 bg-white border 
              border-gray-300 rounded-md shadow-md"
            >
              <ul className="max-h-60 py-1 overflow-auto text-sm">
                {["한국어", "English"].map((lang) => (
                  <li
                    key={lang}
                    className="cursor-pointer select-none px-4 py-2 
                      hover:bg-gray-100 text-gray-900"
                    onClick={() => {
                      setSelected(lang);
                      setIsOpen(false);
                    }}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <header className="flex flex-col items-center space-y-8">
        <img src="images/LXD_logo.svg" />
        <img src="images/language_x_diary.svg" />
      </header>

      <div className="flex flex-col w-[430px] p-4 space-y-10">
        <form className="flex flex-col space-y-5">
          <div className="space-y-[10px]">
            <div className="px-3 text-subhead3 font-medium">이메일</div>
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              className="w-full h-[55px] px-[32px] py-[16px] border rounded-md 
              border-gray-400 bg-gray-50 text-gray-500 text-body1
             focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="space-y-[10px]">
            <div className="px-3 text-subhead3 font-medium">비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="w-full h-[55px] px-[32px] py-[16px] border rounded-md 
              border-gray-400 bg-gray-50 text-gray-500 text-body1
             focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </form>

        <div className="buttonSection flex flex-col space-y-3">
          <button
            type="submit"
            disabled={true}
            className="w-full h-[55px] justify-center py-3 rounded-md  
      bg-blue-600 hover:bg-blue-700 cursor-pointer transition 
      disabled:bg-gray-300"
          >
            <span className="text-subhead3 text-white">로그인</span>
          </button>
          <button
            className="w-full h-[55px] justify-center border border-gray-500 
            py-3 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
          >
            <span className="text-subhead3 text-gray-600 font-medium">
              Google로 시작하기
            </span>
          </button>

          <div
            className="flex w-full justify-between text-body3 text-gray-700 py-3 
        underline underline-offset-2 cursor-pointer"
          >
            <a href="/signup">회원가입</a>
            <a href="/find_idpw">비밀번호 변경</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
