import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiReducer";


const store = configureStore({
    reducer: {
        api: apiReducer,
    },
})

export default store