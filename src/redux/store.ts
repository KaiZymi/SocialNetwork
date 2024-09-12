
import profileReducer from "./profile_reducer"
import dialogsReducer from "./dialogs_reducer"
import sidebarReducer from "./sidebar_reducer"
import usersReducer from "./users_reducer"
import authReducer from "./auth_reducer"
import thunkMiddleWare, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {Action, AnyAction, applyMiddleware, combineReducers, createStore} from "@reduxjs/toolkit"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app_reducer"
import chatReducer from "./chat_reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
	app: appReducer,
    chat: chatReducer
})


type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>



export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>




// @ts-ignore
let store = createStore( rootReducer, applyMiddleware(thunkMiddleWare))

// @ts-ignore
window.store = store


export default store