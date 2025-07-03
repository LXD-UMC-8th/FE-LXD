const LoginPage = () => {
  return (
    <div
      className="flex flex-col min-h-screen 
    items-center justify-center space-y-6 px-4"
    >
      <header className="flex flex-col items-center space-y-2">
        <div
          className="w-[96px] h-[96px] bg-gradient-to-r from-blue-400 to-purple-500
        flex items-center justify-center text-white font-bold text-4xl rounded-2xl "
        >
          LXD
        </div>
        <h1 className="text-center text-[28px] text-bold text-gray-600">
          LanguageXchange Diary | 언어교환일기
        </h1>
      </header>

      <div className="w-[400px] bg-gray-100 p-4 space-y-3">
        <form className="flex flex-col">
          <input
            type="email or ID"
            placeholder="이메일 또는 아이디"
            className="px-3 py-2 border-x border-t border-gray-400 bg-white
            text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className=" px-3 py-2 border-1 border-gray-400 bg-white
            text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </form>

        <div className="flex items-center space-x-2 text-sm">
          <input type="checkbox" className="accent-blue-600 w-[15px]" />
          <span>로그인상태유지</span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-sm py-2 rounded-sm
        hover:bg-blue-700 cursor-pointer transition"
        >
          로그인
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

      <button
        className="flex justify-center w-[420px] border border-gray-400 py-3 rounded-md
      hover:bg-gray-50 cursor-pointer transition"
      >
        <img
          src="images/Google__G__logo.svg"
          className="px-2 justify-center items-center text-center"
        />
        <span className="text-gray-800">Google로 시작하기</span>
      </button>

      <div className="flex w-[420px] justify-end px-2 text-sm text-gray-800">
        <label className="flex items-center gap-3">
          Language
          <select
            className="cursor-pointer focus:outline-none"
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default LoginPage;
