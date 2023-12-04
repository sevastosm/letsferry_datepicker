import React, { useState, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { InputText } from "primereact/inputtext";
import { formatDate } from "./helpers";

export default function BasicDemo() {
  const op = useRef(null);
  const retrunInputRef = useRef(null);
  const [departureDate, setDepartureDate] = useState<string | undefined>();
  const [returnDate, setReturnDate] = useState<string | undefined>();
  const [date, setDate] = useState<Nullable<Date>>(null);

  // default date format mm/dd/yy
  // set active days from today
  const today = new Date();
  // set a list of disabled days
  const disabledDateList = ["12/09/23", "12/15/23", "12/22/23", "12/25/23"];
  const disabledDates = disabledDateList.map((date) => new Date(date));

  const handleDateChage = (e: any) => {
    retrunInputRef.current.focus();

    setDate(e.value);
    setDepartureDate(formatDate(e.value[0]));
    setReturnDate(formatDate(e.value[1]));
    if (e.value[1]) {
      op.current.hide();
    }
  };

  const dateTemplate = (date: any) => {
    if (date.today) {
      return <strong className="text-blue-200 ">{date.day}</strong>;
    }

    return date.day;
  };

  console.log("Panel,STATUS", op.current);

  const handleClick = (e) => {
    e.preventDefault();
    op.current.show(e);
  };

  return (
    <div>
      <div
        className="card flex justify-content-center"
        id="Parent"
        ref={retrunInputRef}
      >
        <InputText
          onFocus={handleClick}
          value={departureDate}
          onChange={(e) => {
            console.log("e.target.value", e.target.value);
            if (e.target.value === "") {
              setDepartureDate(e.target.value);

              return setDate(null);
            }
            setDepartureDate(e.target.value);
          }}
          type="search"
        />

        <InputText
          onFocus={handleClick}
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          type="search"
        />
      </div>
      <OverlayPanel showCloseIcon ref={op} appendTo={"self"}>
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
      </OverlayPanel>
    </div>
  );
}
