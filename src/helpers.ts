import moment from "moment";

export const formatDate = (date: Date, dateFormat = "M/D/Y") => {
  const d = moment(date).format(dateFormat);
  console.log("formatDate", d);
  return d === "Invalid date" ? "" : d;
};
