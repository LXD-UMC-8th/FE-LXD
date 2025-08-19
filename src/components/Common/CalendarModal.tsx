import { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getDiaryStats } from "../../apis/diary";
import { translate } from "../../context/translate";
import { useLanguage } from "../../context/LanguageProvider";

interface value {
  date: string;
  count: number;
}

const CalendarModal = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const [_values, setValues] = useState<value[]>([]);
  const [activeStartDate, _setActiveStartDate] = useState<Date>(new Date());

  const formatLocalYMDD = (date: Date) => date.toLocaleDateString("en-CA");

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

  console.log("this is CalendarModal");
  console.log("dates to request", _datesToRequest);

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
        formatMonthYear={(_locale, date) => {
          if (language === "KO") {
            return `${date.getFullYear()} ${date.getMonth() + 1}월`;
          }
          return `${date.getFullYear()} ${date
            .toLocaleString("default", {
              month: "short",
            })
            .toUpperCase()}`;
        }}
        formatShortWeekday={(_locale, date) =>
          [
            t.Sunday,
            t.Monday,
            t.Tuesday,
            t.Wednesday,
            t.Thursday,
            t.Friday,
            t.Saturday,
          ][date.getDay()]
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
