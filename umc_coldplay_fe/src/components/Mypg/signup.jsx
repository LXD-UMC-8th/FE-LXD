import  { useState } from 'react';

const SignupModal = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        padding: '40px 30px',
        position: 'relative',
        fontFamily: "'Pretendard', sans-serif",
      }}
    >
      <img
        src="images/close_button.svg"
        alt="Close"
        style={{
          width: '16px',
          position: 'absolute',
          top: '15px',
          right: '15px',
          cursor: 'pointer',
        }}
        onClick={() => setVisible(false)}
      />
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#000',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        코드플레이 시작하기
      </h2>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          alignItems: 'center',
        }}
        onSubmit={(event) => {
          event.preventDefault();
          alert('회원가입 성공!');
        }}
      >
        {['닉네임', '이메일', '비밀번호', '비밀번호 확인'].map((label, index) => (
          <div key={index} style={{ width: '100%', maxWidth: '300px' }}>
            <label
              style={{
                fontSize: '14px',
                color: '#333',
                textAlign: 'left',
                marginBottom: '5px',
                display: 'block',
              }}
            >
              {label}
            </label>
            <input
              type={label.includes('비밀번호') ? 'password' : 'text'}
              placeholder={`${label}을(를) 입력해주세요.`}
              style={{
                width: 'calc(100% - 40px)',
                maxWidth: '300px',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '25px',
                fontSize: '14px',
              }}
            />
          </div>
        ))}
        <button
          type="submit"
          style={{
            width: 'calc(100% - 40px)',
            maxWidth: '300px',
            padding: '15px',
            background: '#6a4cb3',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          회원가입
        </button>
      </form>
      <div
        style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '12px',
          color: '#666',
        }}
      >
        <span>이미 계정이 있으신가요? </span>
        <a href="#" style={{ color: '#6a4cb3', textDecoration: 'none' }}>
          Log In
        </a>
      </div>
    </div>
  );
};

export default SignupModal;
