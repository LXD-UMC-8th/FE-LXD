import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface value {
  date: string;
  count: number;
}
const CalendarModal = () => {
  //titleDisable -> 일시적으로 설정한 것임. 지우면 됨.
  const _values: value[] = [
    { date: "2016-01-01", count: 1 },
    { date: "2016-01-03", count: 4 },
    { date: "2016-01-06", count: 2 },
  ];

  return (
    <div className="w-70">
      <Calendar
        className="no-holiday-colors border-radius-lg shadow-md"
        formatDay={(locale, date) => date.getDate().toString()}
        formatMonthYear={(locale, date) =>
          `${date.getMonth() + 1}. ${date.getFullYear()} `
        }
        formatShortWeekday={() => ""}
        locale="en-US"
      />
    </div>
  );
};

export default CalendarModal;
