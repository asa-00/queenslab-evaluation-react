import {
  creditCardLogoByType,
  creditCardTypeByNumber,
  handleCreditCardNumber,
} from "../../src/utils/utils";

import { visa, mastercard, amex } from "../../src/components/credit-card/logo";

describe("Test utils", () => {
  describe("handle credit card number, mask and unmask", () => {
    it("should replace character at specified index with user input and format number", () => {
      const origString = "################";
      const inputValue = "5555";

      const expectedResult = handleCreditCardNumber(
        origString,
        inputValue,
        false
      );

      expect(expectedResult).toEqual("5555 #### #### ####");
    });

    it("should replace characters and mask certain values", () => {
      const origString = "################";
      const inputValue = "5555555555555555";

      const expectedResult = handleCreditCardNumber(
        origString,
        inputValue,
        true
      );

      expect(expectedResult).toEqual("5555 **** **** 5555");
    });

    it("should replace characters and unmask certain values", () => {
      const origString = "################";
      const inputValue = "5555555555555555";

      const expectedResult = handleCreditCardNumber(
        origString,
        inputValue,
        false
      );

      expect(expectedResult).toEqual("5555 5555 5555 5555");
    });
  });
  describe("display credit card type by bumber", () => {
    test("should identify Visa card type", () => {
      const visaNumbers = ["4111111111111111", "4916111111111111"];
      visaNumbers.forEach((number) => {
        expect(creditCardTypeByNumber(number)).toBe("Visa");
      });
    });

    test("Should identify Mastercard card type", () => {
      const mastercardNumbers = ["5111111111111111", "5555555555554444"];
      mastercardNumbers.forEach((number) => {
        expect(creditCardTypeByNumber(number)).toBe("Mastercard");
      });
    });

    test("should identify American Express card type", () => {
      const amexNumbers = ["341111111111111", "371111111111111"];
      amexNumbers.forEach((number) => {
        expect(creditCardTypeByNumber(number)).toBe("American Express");
      });
    });

    test("should return empty string for unknown card types", () => {
      const unknownNumbers = ["1234567890123456", "9876543210987654"];
      unknownNumbers.forEach((number) => {
        expect(creditCardTypeByNumber(number)).toBe("");
      });
    });
  });

  describe('credit card logo by type', () => {
    it('should return the correct logo for Visa', () => {
      expect(creditCardLogoByType('Visa')).toBe(visa);
      expect(creditCardLogoByType('VISA')).toBe(visa);
    });
  
    it('should return the correct logo for Mastercard', () => {
      expect(creditCardLogoByType('Mastercard')).toBe(mastercard);
      expect(creditCardLogoByType('MASTERCARD')).toBe(mastercard);
    });
  
    it('should return the correct logo for American Express', () => {
      expect(creditCardLogoByType('American Express')).toBe(amex);
      expect(creditCardLogoByType('AMERICAN EXPRESS')).toBe(amex);
    });
  
    it('should return the default logo for unknown card types', () => {
      expect(creditCardLogoByType('Unknown')).toBe(visa);
    });
  });
});
