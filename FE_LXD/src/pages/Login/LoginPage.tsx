const LoginPage = () => {
  return (
    <div
      className="flex flex-col min-h-screen 
    items-center justify-center space-y-6 px-4"
    >
      <div className="fixed top-0 right-0 w-[217px] justify-end px-2 text-sm text-gray-800">
        <label className="flex items-center gap-3">
          Language
          <select className="cursor-pointer focus:outline-none">
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>

      <header className="flex flex-col items-center space-y-8">
        <img src="images/LXD_logo.svg" />
        <img src="images/language_x_diary.svg" />
      </header>

      <div className="w-[384px] p-4 space-y-3">
        <form className="flex flex-col">
          <div>
            <div className="text-headline1">이메일</div>
            <input
              type="email or ID"
              placeholder="이메일 또는 아이디"
              className="px-3 py-2 border-x border-t border-gray-400 bg-white
            text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <div>비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호"
              className=" px-3 py-2 border-1 border-gray-400 bg-white
            text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </form>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-sm py-2 rounded-sm
        hover:bg-blue-700 cursor-pointer transition"
        >
          로그인
        </button>

        <button
          className="flex justify-center border border-gray-400 py-3 rounded-md
      hover:bg-gray-50 cursor-pointer transition"
        >
          <span className="text-gray-800">Google로 시작하기</span>
        </button>

        <div className="flex w-full justify-between text-sm cursor-pointer">
          <a href="/signup" className="hover:underline">
            회원가입
          </a>
          <a href="/find_idpw" className="hover:underline">
            아이디 · 비밀번호 찾기
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
