import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { InputText } from "primereact/inputtext";
import moment from "moment";
import { formatDate } from "./helpers";

export default function BasicDemo() {
  const [departureDate, setDepartureDate] = useState<Nullable<Date>>(null);
  const [returnDate, setReturnDate] = useState<Nullable<Date>>(null);
  const [date, setDate] = useState<Nullable<Date>>(null);

  console.log("selectedDate", date);

  // default date format mm/dd/yy
  // set active days from today
  const today = new Date();
  // set a list of disabled days
  const disabledDateList = ["12/09/23", "12/15/23", "12/22/23", "12/25/23"];
  const disabledDates = disabledDateList.map((date) => new Date(date));

  const handleDateChage = (e) => {
    console.log(e);
    setDepartureDate(formatDate(e.value[0]));
    setReturnDate(formatDate(e.value[1]));
  };

  return (
    <div>
      <div className="card flex justify-content-center">
        <InputText
          value={departureDate}
          //   onChange={(e) => setValue(e.target.value)}
          type="search"
        />

        <InputText
          value={returnDate}
          //   onChange={(e) => setValue(e.target.value)}
          type="search"
        />
      </div>

      <Calendar
        inline
        type="search"
        value={date}
        onChange={handleDateChage}
        selectionMode="range"
        disabledDates={disabledDates}
        minDate={today}
        numberOfMonths={2}
      />
    </div>
  );
}
