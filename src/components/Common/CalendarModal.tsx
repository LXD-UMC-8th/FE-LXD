import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface value {
  date: string;
  count: number;
}

const CalendarModal = () => {
  //시험용 더미 데이터
  function formatLocalYMDD(date: Date) {
    // “en-CA” → “YYYY-MM-DD”
    return date.toLocaleDateString("en-CA");
  }

  const _values: value[] = [
    { date: "2025-07-23", count: 1 },
    { date: "2025-07-21", count: 3 },
    { date: "2025-07-13", count: 2 },
    { date: "2025-07-12", count: 3 },
    { date: "2025-07-31", count: 1 },
  ];

  const _dateToCount = _values.reduce<Record<string, number>>(
    (acc, { date, count }) => {
      acc[date] = count;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Return heat class
  const _getHeatClass = (count: number | undefined) => {
    if (!count) return "";
    return `heat-${count}`;
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
