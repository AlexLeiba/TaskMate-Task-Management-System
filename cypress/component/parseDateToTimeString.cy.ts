import { parseDateToTimeString } from "@/lib/parseDateToTimeString";
import { VALID_DATE_STRING } from "../data/validDateString";
import { INVALID_DATE_STRING } from "../data/invalidDateString";
import { isValidDateString } from "@/lib/isValidDateString";

describe("parseDateToTimeString", () => {
  it("should return a valid hh:mm:ss structure string", () => {
    const dateString = "2022-10-13T13:14:00.000";
    const timeObj = new Date(dateString);
    const result = parseDateToTimeString(timeObj);
    expect(result).to.be.eq("13:14:00");
  });
  it("should return empty string for invalid date string", () => {
    INVALID_DATE_STRING.forEach((invalidDateString) => {
      const isValidDate = isValidDateString(invalidDateString); //isValidDateString is used inside parseDateToTimeString function
      if (isValidDate) {
        const result = parseDateToTimeString(new Date(invalidDateString));
        expect(result).to.be.eq("");
      }
    });
  });
  it("should return time string format hh:mm:ss for any valid date string", () => {
    VALID_DATE_STRING.forEach((validDateString) => {
      const result = parseDateToTimeString(new Date(validDateString));
      expect(result).to.have.length(8);
    });
  });
});
