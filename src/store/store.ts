import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { CardSlice } from "./redux/features/cardSlice";

const reducer = combineReducers({
    card: CardSlice.reducer,
})

export const store = configureStore({
    reducer
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;