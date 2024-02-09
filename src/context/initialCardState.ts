
interface CardState {
    cardNumber: string;
    cardHolder: string;
    cardMonth: string;
    cardYear: string;
    cardCvv: string;
    setCard: (card: object) => object
  }
  
  export const initialCardState: CardState = {
    cardNumber: "0000000000000000",
    cardHolder: "John Doe",
    cardMonth: "MM",
    cardYear: "YY",
    cardCvv: "***",
    setCard: async () => null
  }