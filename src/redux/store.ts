import { configureStore } from "@reduxjs/toolkit";
import toursReducer from "./features/toursSlice";

export const store = configureStore({
    reducer: {
        toursReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;