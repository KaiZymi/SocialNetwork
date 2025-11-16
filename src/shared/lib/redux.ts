import {useDispatch, useSelector} from "react-redux";
import {store} from "../../app/store";
import {combineSlices, createAsyncThunk, createSelector} from "@reduxjs/toolkit";


export const rootReducer = combineSlices();

export type AppState = any
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const createAppSelector = createSelector.withTypes<AppState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppState;
    dispatch: AppDispatch;
    extra: unknown;
}>();
