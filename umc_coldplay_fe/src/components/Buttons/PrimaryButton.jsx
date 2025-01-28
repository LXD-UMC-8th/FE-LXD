import styled from "styled-components";

const PrimaryButton = styled.button`
  width: 198px;
  height: 59px;
  padding: 0;
  border-radius: 5px;
  a {
    color: white;
    font-family: Pretendard, sans-serif;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    text-decoration: none;
  }
  border: none;
  cursor: pointer;
  background: linear-gradient(90deg, #6f3da1 0%, #7185e1 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: linear-gradient(90deg, #5a3182 0%, #5c6dc9 100%);
  }

  &:active {
    background: linear-gradient(90deg, #4b256d 0%, #4d5ba7 100%);
  }

  &:disabled {
    background: linear-gradient(90deg, #6f3da1 0%, #7185e1 100%);
    cursor: not-allowed;
  }
  &:focus {
    outline: none; /* 클릭 시 포커스 스타일 제거 */
  }
`;

export default PrimaryButton;
