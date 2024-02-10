import { z } from "zod";

/**Pattern to match format of various credit card numbers including
 * Visa, Mastercard, American Express and Discover. 
 */
const creditCardPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

export const creditCardSchema = z.object({
  cardNumber: z
    .string()
    .regex(creditCardPattern, "Enter a valid credit card number."),
  cardHolder: z
    .string()
    .regex(/^[a-zA-Z ]+$/, "Card holder name is required")
    .min(3, { message: "Holder name is required and must be atleast 3 charecters long" })
    .max(16, { message: "Holder name is required and must be less than 16 charecters long" }),
  cardMonth: z.string().regex(/\d{2}/, "Expiration month is required"),
  cardYear: z.string().regex(/\d{2}/, "Expiration year is required"),
  cardCvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  cardNumberValue: z.string().nullish(),
});

export type Card = z.infer<typeof creditCardSchema>;
