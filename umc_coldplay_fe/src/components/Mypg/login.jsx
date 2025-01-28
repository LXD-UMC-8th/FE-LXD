import  { useState } from 'react';

const LoginModal = () => {
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          gap: '10px',
        }}
      >
        <img
          src="images/Codeplay_logo.svg"
          alt="Codeplay Logo"
          style={{ width: '50px' }}
        />
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#4c358a' }}>
          CODEPLAY
        </span>
      </div>
      <h2
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#000',
          textAlign: 'left',
          marginBottom: '25px',
          paddingLeft: '20px',
        }}
      >
        LOG IN
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
          alert('로그인 성공!');
        }}
      >
        <input
          type="email"
          placeholder="이메일을 입력해주세요."
          style={{
            width: 'calc(100% - 40px)',
            maxWidth: '300px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '25px',
            fontSize: '14px',
          }}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          style={{
            width: 'calc(100% - 40px)',
            maxWidth: '300px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '25px',
            fontSize: '14px',
          }}
        />
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
          로그인
        </button>
      </form>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        <img
          src="images/login_google.svg"
          alt="Google Login"
          style={{ width: '40px', height: '40px', cursor: 'pointer' }}
        />
        <img
          src="images/login_kakaotalk.svg"
          alt="Kakao Login"
          style={{ width: '40px', height: '40px', cursor: 'pointer' }}
        />
      </div>
      <div
        style={{
          textAlign: 'center',
          marginTop: '10px',
          fontSize: '12px',
          color: '#666',
        }}
      >
        <span>아직 회원이 아니신가요? </span>
        <a href="#" style={{ color: '#6a4cb3', textDecoration: 'none' }}>
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default LoginModal;
