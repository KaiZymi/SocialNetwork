import thunk from "redux-thunk"
import {configureStore} from "@reduxjs/toolkit"
import {rootReducer} from "../shared/lib/redux";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})

// @ts-ignore
window.store = store


