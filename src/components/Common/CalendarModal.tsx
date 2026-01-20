import { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getDiaryStats } from "../../apis/diary";


interface value {
  date: string;
  count: number;
}

const CalendarModal = () => {
  
  const [_values, setValues] = useState<value[]>([]);
  const [activeStartDate, _setActiveStartDate] = useState<Date>(new Date());

  const formatLocalYMDD = (date: Date) => date.toLocaleDateString("en-CA");

  // ✅ [수정 1] 연도/월 계산 로직 수정 (13월 오류 해결)
  // 단순히 +1, +2를 하는 대신 Date 객체를 사용해 자동으로 연도가 넘어가게 처리
  const _datesToRequest = useMemo(() => {
    const current = new Date(activeStartDate);
    
    return [0, 1, 2].map((offset) => {
      // 현재 달에서 offset만큼 더한 날짜를 구함 (자동으로 연도 변경됨)
      const targetDate = new Date(current.getFullYear(), current.getMonth() + offset, 1);
      return {
        year: targetDate.getFullYear(),
        month: targetDate.getMonth() + 1, // 1월~12월로 맞춤
      };
    });
  }, [activeStartDate]);

  useEffect(() => {
    Promise.all(_datesToRequest.map(getDiaryStats))
      .then((response) => {
        const merged: value[] = response.flatMap((r) => r?.result || []);
        setValues(merged);
      })
      .catch((err) => {
        console.error("Error fetching diary stats:", err);
      });
  }, [_datesToRequest]);

  const _dateToCount = useMemo<Record<string, number>>(() => {
    return _values.reduce<Record<string, number>>(
      (acc: Record<string, number>, { date, count }: value) => {
        acc[date] = count;
        return acc;
      },
      {}
    );
  }, [_values]);

  // Return heat class
  const _getHeatClass = (count: number | undefined) => {
    if (!count) return "";
    const capCount = Math.min(count, 3);
    return `heat-${capCount}`;
  };

  return (
    <div className="w-70">
      <Calendar
        className="border-radius-lg "
        formatDay={(_locale, date) => date.getDate().toString()}
        // ✅ [수정 2] 월/년도 표기를 영어로 고정 (JAN 2024 형식)
        formatMonthYear={(_locale, date) => {
          return `${date.getFullYear()} ${date
            .toLocaleString("en-US", {
              month: "short",
            })
            .toUpperCase()}`;
        }}
        // ✅ [수정 3] 요일 표기를 영어로 고정 (Sun, Mon...)
        formatShortWeekday={(_locale, date) =>
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]
        }
        locale="en-US"
        prev2Label={null}
        next2Label={null}
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";
          const dateStr = formatLocalYMDD(date);
          const count = _dateToCount[dateStr];
          return _getHeatClass(count);
        }}
      />
    </div>
  );
};

export default CalendarModal;