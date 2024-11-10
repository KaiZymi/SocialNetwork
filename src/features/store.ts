import {profileReducer} from "./profile/profile_reducer"
import {usersReducer} from "./users/users_reducer"
import {authReducer} from "./auth/auth_reducer"
import thunk from "redux-thunk"
import {configureStore} from "@reduxjs/toolkit"

import {appReducer} from "./app/app_reducer"
import {chatReducer} from "./chat/chat_reducer";

const rootReducer = {
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
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


// export type AppDispatch = typeof store.dispatch;
// export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
// export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
