import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { InputText } from "primereact/inputtext";
import { formatDate } from "./helpers";

export default function BasicDemo() {
  const [departureDate, setDepartureDate] = useState<string | undefined>();
  const [returnDate, setReturnDate] = useState<string | undefined>();
  const [date, setDate] = useState<Nullable<Date>>(null);

  console.log("selectedDate", date);

  // default date format mm/dd/yy
  // set active days from today
  const today = new Date();
  // set a list of disabled days
  const disabledDateList = ["12/09/23", "12/15/23", "12/22/23", "12/25/23"];
  const disabledDates = disabledDateList.map((date) => new Date(date));

  const handleDateChage = (e: any) => {
    console.log(e);
    setDate(e.value);
    setDepartureDate(formatDate(e.value[0]));
    setReturnDate(formatDate(e.value[1]));
  };

  const dateTemplate = (date: any) => {
    console.log("date template", date);
    if (date.today) {
      return <strong className="text-blue-200 ">{date.day}</strong>;
    }

    return date.day;
  };

  return (
    <div>
      <div className="card flex justify-content-center">
        <InputText
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          type="search"
        />

        <InputText
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          type="search"
        />
      </div>

      <Calendar
        inline
        value={date}
        onChange={handleDateChage}
        selectionMode="range"
        disabledDates={disabledDates}
        minDate={today}
        numberOfMonths={2}
        dateTemplate={dateTemplate}
      />
    </div>
  );
}
