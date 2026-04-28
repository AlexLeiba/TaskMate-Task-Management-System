import { isValidDateString } from "./isValidDateString";

export function parseDateToTimeString(date: Date) {
  const isValidDate = isValidDateString(date.toISOString());
  if (!isValidDate) return "";

  const hours = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`;
  const minutes =
    date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${hours}:${minutes}:00`;
}
