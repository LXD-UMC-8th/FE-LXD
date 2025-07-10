const SignupPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <form className="flex w-[400px]">
        <div className="flex flex-col w-full items-center space-y-4">
          <div className="flex gap-2">
            <div>이메일</div>
            <input placeholder="이메일" className="border" />
          </div>
          <div className="flex gap-2">
            <div>비밀번호</div>
            <input placeholder="비밀번호" className="border" />
          </div>
          <div className="flex gap-2">
            <div>비밀번호확인</div>
            <input placeholder="비밀번호확인" className="border" />
          </div>
        </div>
      </form>

      <button className="items-end border">다음</button>
    </div>
  );
};

export default SignupPage;
