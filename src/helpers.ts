import moment from "moment";

export const formatDate = (date: Date, dateFormat = "M/D/Y") =>
  moment(date).format(dateFormat);
