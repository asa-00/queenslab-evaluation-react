import { visa, mastercard, amex } from "../components/credit-card/logo";

export function handleCreditCardNumber(
  maskedCreditCard: string,
  inputValue: string,
  maskMiddleDigits: boolean
): string {
  // Unmask the credit card number by replacing characters with user input
  const newCreditCardNumber: string[] = [...maskedCreditCard];
  for (let i = 0; i < inputValue.length; i++) {
    if (i >= 16) break; // Limit to 16 characters
    // Replace the corresponding character in the masked credit card number
    newCreditCardNumber[i] = inputValue[i];
  }
  let unmaskedCreditCard = newCreditCardNumber.join("");

  // Mask or replace 8 digits in the center of the credit card number with stars if requested
  if (maskMiddleDigits) {
    const first4Characters = unmaskedCreditCard.slice(0, 4);
    const last4Characters = unmaskedCreditCard.slice(-4);
    const middleCharacters = unmaskedCreditCard
      .substring(4, unmaskedCreditCard.length - 4)
      .replace(/\d/g, "*");
    unmaskedCreditCard = `${first4Characters}${middleCharacters}${last4Characters}`;
  }

  // Format the credit card number
  const pattern = /(.)(?=(.{4})+(?!.))/g;
  const formattedCreditCardNumber = unmaskedCreditCard.replace(pattern, "$1 ");

  return formattedCreditCardNumber;
}

// American Express 378282246310005
// MasterCard 5555555555554444
// Visa 4111111111111111

export function creditCardTypeByNumber(creditCardNumber: string): string {
  const cardPatterns: { [key: string]: RegExp } = {
    Visa: /^(4[0-9]{12}(?:[0-9]{3})?)$/,
    Mastercard:
      /^(5[1-5][0-9]{14}|2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9]{2}|7(?:[0-1][0-9]|20))[0-9]{12})$/,
    "American Express": /^(34|37)[0-9]{13}$/,
  };

  for (const [cardType, pattern] of Object.entries(cardPatterns)) {
    if (pattern.test(creditCardNumber)) {
      return cardType;
    }
  }

  return "";
}

export function creditCardLogoByType(cardType: string): string {
  switch (cardType.toLowerCase()) {
    case "visa":
      return visa;
    case "mastercard":
      return mastercard;
    case "american express":
      return amex;
    default:
      return visa;
  }
}
