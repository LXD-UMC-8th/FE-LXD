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

  //시험용 더미 데이터
  function formatLocalYMDD(date: Date) {
    // “en-CA” → “YYYY-MM-DD”
    return date.toLocaleDateString("en-CA");
  }

  useEffect(() => {
    getDiaryStats({
      year: 2025,
      month: 7,
    })
      .then((response) => {
        console.log("Diary Stats:", response);
        setValues(response?.result);
      })
      .catch((err) => {
        console.error("Error fetching diary stats:", err);
      });
  }, []);

  const _dateToCount = useMemo<Record<string, number>>(() => {
    return _values.reduce<Record<string, number>>(
      (acc: Record<string, number>, { date, count }: value) => {
        acc[date] = count;
        return acc;
      },
      {},
    );
  }, [_values]);

  // Return heat class
  const _getHeatClass = (count: number | undefined) => {
    if (!count) return "";
    return `heat-${count}`; // ensure your CSS defines .heat-1, .heat-2, etc.
  };

  return (
    <div className="w-70">
      <Calendar
        className="border-radius-lg "
        formatDay={(_locale, date) => date.getDate().toString()}
        formatMonthYear={(_locale, date) =>
          `${date.getFullYear()} ${date
            .toLocaleString("default", {
              month: "short",
            })
            .toUpperCase()}`
        }
        formatShortWeekday={(_locale, date) =>
          ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()]
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
