import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface value {
  date: string;
  count: number;
}

const CalendarModal = () => {
  //시험용 더미 데이터
  const _values: value[] = [
    { date: "2025-07-23", count: 1 },
    { date: "2025-07-21", count: 3 },
    { date: "2025-07-13", count: 2 },
  ];

  const _dateToCount = _values.reduce<Record<string, number>>((acc, cur) => {
    acc[cur.date] = cur.count;
    return acc;
  }, {});

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
        formatShortWeekday={(locale, date) =>
          ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()]
        }
        locale="en-US"
        prev2Label={null}
        next2Label={null}
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";
          const dateStr = date.toISOString().split("T")[0];
          const count = _dateToCount[dateStr];
          return _getHeatClass(count);
        }}
      />
    </div>
  );
};

export default CalendarModal;
