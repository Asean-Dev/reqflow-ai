import type { Dayjs } from "dayjs";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

// ----------------------------------------------------------------------

dayjs.extend(duration);
dayjs.extend(relativeTime);

// ----------------------------------------------------------------------

export type DurationProps = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

export type DatePickerFormat =
  | Dayjs
  | Date
  | string
  | number
  | null
  | undefined;

export function today(format?: string) {
  return dayjs(new Date()).startOf("day").format(format);
}

export function fToNow(date: DatePickerFormat) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid ? dayjs(date).toNow(true) : "Invalid time value";
}

export function fSub({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
}: DurationProps) {
  const result = dayjs()
    .subtract(
      dayjs.duration({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
      })
    )
    .format();

  return result;
}
