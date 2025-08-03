import { useEffect, useState } from "react";

// type이 검색창에서 모든 것이 다 사용될 수 있으니 어떠한 type으로 올지 모름. -> generic type으로 설정해줘야 함.

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value); // n초 후에 debouncedValue를 저장하면 됨. ㅋ드가 실행될 수 있도록 ㅇ
  //debouncedValue 가 최종적으로 바뀌어야 하는 값

  //value, delay가 변경될 때마다 실행됨.

  useEffect(() => {
    //delay 시간 후에 value를 debouncedValue로 업데이트하는 타이머를 시작함.
    //unmount됐을 때도 취소하는 cleanup함수를 제공해야 함.
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    //value가 변경되면, 기존 타이머를 지워서 업데이트를 취소함.  cleanup함수도 꼭 해줘야 함. 같이 배우는 2탄 useEffect부분을 찾아보기!

    return () => clearTimeout(handler); // 값이 계속 바뀔 때마다 마지막에 멈춘 값만 업데이트 됨.
  }, [value, delay]);

  return debouncedValue; //잠시 기다린 후의 값을 반환함.
}

export default useDebounce;
