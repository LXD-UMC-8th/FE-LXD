interface AccountInfoProps {
  id: string;
  email: string;
  password: string;
  onChangePw: () => void;
}

const AccountInfo = ({ id, email, password, onChangePw }: AccountInfoProps) => {
  return (
    <div
      className="flex flex-col w-full rounded-md pt-7 pb-7 pl-10 pr-10 bg-white"
    >
      <h2 className="text-subhead2 font-semibold">계정 정보</h2>
      <div className="pt-3 text-body1">
        <div className="flex h-11 items-center">
          <div className="w-32 font-medium">아이디</div>
          <div className="pl-4">@{id}</div>
        </div>
        <div className="flex h-11 items-center">
          <div className="w-32 font-medium">이메일</div>
          <div className="pl-4">{email}</div>
        </div>
        <div className="flex h-11 items-center justify-between">
          <div className="flex">
            <div className="w-32 font-medium">비밀번호</div>
            <span className="pl-4">{password}</span>
          </div>
          <div className="flex">
            <button
              onClick={onChangePw}
              className="px-3 py-3 bg-gray-300 rounded 
              cursor-pointer hover:bg-gray-300"
            >
              비밀번호 변경하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
