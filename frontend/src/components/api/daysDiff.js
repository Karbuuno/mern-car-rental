import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

export const dayDifference = (from, to) => {
  dayjs.extend(customParseFormat);
  // const d1 = new Date(from);
  // const d2 = new Date(to);
  // const timeDiff = Math.abs(d2 - d1);
  // const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const date1 = dayjs(from);
  const date2 = dayjs(to);

  const timeDiff = date2.diff(date1);
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
};
