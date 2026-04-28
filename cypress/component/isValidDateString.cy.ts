import { isValidDateString } from "@/lib/isValidDateString";
import { INVALID_DATE_STRING } from "../data/invalidDateString";

import { VALID_UTC_DATE_STRING } from "../data/validUTCDateString";

describe("isValidDateString", () => {
  it("should return true for valid date string", () => {
    VALID_UTC_DATE_STRING.forEach((validDateString) => {
      expect(isValidDateString(validDateString)).to.be.true;
    });
  });
  it("should return false for invalid date string", () => {
    INVALID_DATE_STRING.forEach((invalidDateString) => {
      expect(isValidDateString(invalidDateString)).to.be.false;
    });
  });
});
