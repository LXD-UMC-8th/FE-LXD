import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarMap = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());

  return (
    <div className="w-70">
      <Calendar
        className="no-holiday-colors border-radius-lg shadow-md"
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => date.getDate().toString()}
        formatMonthYear={(locale, date) =>
          `${date.getMonth() + 1}. ${date.getFullYear()} `
        }
        formatShortWeekday={() => ""}
        locale="en-US"
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";
          const isNotCurrentMonth =
            date.getMonth() !== activeStartDate.getMonth();
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          return isNotCurrentMonth || isWeekend ? "text-gray-300 " : "";
        }}
      />
    </div>
  );
};

export default CalendarMap;
