import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Card {
  cardNumber: string;
  cardHolder: string;
  cardMonth: string;
  cardYear: string;
  cardCvv: string;
  cardNumberValue: string
}

export const initialState: Card = {
    cardNumber: "#### #### #### ####",
    cardHolder: "John Doe",
    cardMonth: "MM",
    cardYear: "YY",
    cardCvv: "***",
    cardNumberValue: ''
};

export const CardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => ({ ...state, ...action.payload }),
  },
});

export default CardSlice.reducer;
export const { addCard } = CardSlice.actions;
