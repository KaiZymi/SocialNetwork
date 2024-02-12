
import profileReducer from "./profile_reducer";
import dialogsReducer from "./dialogs_reducer";
import sidebarReducer from "./sidebar_reducer";
import usersReducer from "./users_reducer";
import authReducer from "./auth_reducer";
import thunkMiddleWare  from "redux-thunk"
import {applyMiddleware, combineReducers, createStore} from "@reduxjs/toolkit";
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app_reducer";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
	app: appReducer
})




let store = createStore( reducers, applyMiddleware(thunkMiddleWare))

window.store = store


export default store