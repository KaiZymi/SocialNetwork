import {profileSlice} from "./profile_reducer"
import sidebarReducer from "./sidebar_reducer"
import {usersSlice} from "./users_reducer"
import {authSlice} from "./auth_reducer"
import thunk, {ThunkAction} from "redux-thunk"
import {Action, configureStore} from "@reduxjs/toolkit"
import {reducer as formReducer} from 'redux-form'
import {appSlice} from "./app_reducer"
import {chatSlice} from "./chat_reducer";
import {useDispatch} from "react-redux";

let rootReducer = {
    profilePage: profileSlice.reducer,
    sidebar: sidebarReducer,
    usersPage: usersSlice.reducer,
    auth: authSlice.reducer,
    form: formReducer,
    app: appSlice.reducer,
    chat: chatSlice.reducer
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware):any => getDefaultMiddleware().concat(thunk),
    devTools: true
})



// @ts-ignore
window.store = store


export default store


export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
