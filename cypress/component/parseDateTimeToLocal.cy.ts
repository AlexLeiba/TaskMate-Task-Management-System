import { parseDateTimeToLocal } from "@/lib/parseDateTimeToLocal";
import { INVALID_DATE_STRING } from "../data/invalidDateString";

describe("parseDateTimeToLocal", () => {
  it("should return a valid date string", () => {
    const dateString = "2022-10-13T00:00:00.000Z";
    const timeString = "2022-01-01T13:30:00.000Z";
    const result = parseDateTimeToLocal(dateString, timeString);

    expect(result).to.be.eq("2022-10-13T15:30:00.000");
  });
  it("should return local date string", () => {
    const utcDateString = "2022-10-01T00:00:00.000Z";
    const utcTimeString = "2022-01-01T13:00:00.000Z";
    const result = parseDateTimeToLocal(utcDateString, utcTimeString);

    const localTime = new Date(result).getHours();
    const utcTime = new Date(utcTimeString).getUTCHours();

    expect(localTime).to.eq(15); // 2 hours ahead of UTC
    expect(utcTime).to.eq(13); // 2 hours behind of BUCHAREST
  });
  it("should return empty string for invalid date string", () => {
    INVALID_DATE_STRING.forEach((invalidDateString) => {
      const result = parseDateTimeToLocal(invalidDateString, invalidDateString);
      expect(result).eq("");
    });
  });
});
