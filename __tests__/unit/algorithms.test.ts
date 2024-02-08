import {
  removeIdenticalLetters,
  maximumOddSum,
} from "../../src/algorithms/index";

describe("Test algorithms", () => {
  describe("test remove identical letters", () => {
    it("should remove identical letters", () => {
      const acctualString1 = removeIdenticalLetters("ffdttttyy");
      const acctualString2 = removeIdenticalLetters("iiikigggg");
      const acctualString3 = removeIdenticalLetters("aaaaabbbbcccc");

      expect(acctualString1).toBe("ffdtttyy");
      expect(acctualString2).toBe("iiikiggg");
      expect(acctualString3).toBe("aaabbbccc");
    });

    it("should return same string if no four identical consecutive lowercase letters are found", () => {
        const acctualString3 = removeIdenticalLetters("aabbcc");
        expect(acctualString3).toBe("aabbcc");
      });
  });

  describe("test remove identical letters", () => {
    it("should find the highest possible sum of two numbers, when added together, form an odd number", () => {
      const maximumOddSum1 = maximumOddSum([19, 2, 42, 18]);
      const maximumOddSum2 = maximumOddSum([61, 32, 51]);

      expect(maximumOddSum1).toBe(61);
      expect(maximumOddSum2).toBe(93);
    });

    it("should return 0 if no odd sum is found", () => {
        const maximumOddSumWhenAllEvens = maximumOddSum([60, 30, 50]);
        expect(maximumOddSumWhenAllEvens).toBe(0);
      });
  });
});
