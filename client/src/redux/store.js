import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice'
import diaryReducer from './features/diarySlice'
import favoritesReducer from "./features/favoritesSlice";

export const store = configureStore({
    reducer:{
        user:userReducer,
        diary:diaryReducer,
        allFavorites:favoritesReducer

    }
})
