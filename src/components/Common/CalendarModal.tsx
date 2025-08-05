import { useEffect, useMemo, useState, useRef } from "react";
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

  const _isFirstRender = useRef(true);

  const _datesToRequest = useMemo(() => {
    const current = new Date(activeStartDate);

    return [
      {
        year: current.getFullYear(),
        month: current.getMonth(),
      },
      {
        year: current.getFullYear(),
        month: current.getMonth() + 1,
      },
    ];
  }, [activeStartDate]);

  useEffect(() => {
    if (_isFirstRender.current) {
      _isFirstRender.current = false;
      return;
    }
    console.log("calendarModal re-rendering");

    Promise.all(_datesToRequest.map(getDiaryStats))
      .then((response) => {
        const merged: value[] = response.flatMap((r) => r?.result || []);
        setValues(merged);
      })
      .catch((err) => {
        console.error("Error fetching diary stats:", err);
      });
  }, [_datesToRequest]);

  // useEffect(() => {
  //   const current = new Date(activeStartDate);
  //   const prev = new Date(current);
  //   const next = new Date(current);

  //   prev.setMonth(current.getMonth() - 1);
  //   next.setMonth(current.getMonth() + 1);

  //   const datesToRequest = [
  //     { year: prev.getFullYear(), month: prev.getMonth() + 1 },
  //     { year: current.getFullYear(), month: current.getMonth() + 1 },
  //   ];

  //   Promise.all(datesToRequest.map(getDiaryStats))
  //     .then((responses) => {
  //       const merged: value[] = responses.flatMap((r) => r?.result || []);
  //       setValues(merged);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching diary stats:", err);
  //     });
  // }, [activeStartDate]);

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
