export const INVALID_DATE_STRING = [
  "", // empty
  " ", // whitespace
  "abc",
  "not-a-date",
  "2024-13-01", // invalid month
  "2024-00-10", // month 0
  "2024-01-32", // invalid day
  "2024-04-31", // April has 30 days
  "2023-02-29", // not leap year
  "2024-02-30", // Feb invalid day
  "2024/99/01",
  "99/99/9999",
  "31/02/2024",
  "2024-1-1", // malformed if strict YYYY-MM-DD expected
  "24-01-01",
  "2024-01",
  "01-01-2024",
  "2024-01-01T25:00:00", // invalid hour
  "2024-01-01T25:00:00Z", // invalid hour
  "2024-01-01T12:60:00", // invalid minute
  "2024-01-01T12:60:00Z", // invalid minute
  "2024-01-01T12:30:60", // invalid second
  "2024-01-01T12:30:60Z", // invalid second
  "2024-01-01T12:30", // incomplete if strict datetime expected
  "2024-01-01Z",
  "0000-00-00",
  "9999-99-99",
];
