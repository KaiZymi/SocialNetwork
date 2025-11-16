import {UsersType} from "../../shared/types/typeReducers";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {rootReducer} from "../../shared/lib/redux";


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 2,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }


};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        followSuccess: (state, action: PayloadAction<number>) => {
            state.users = state.users.map(u => {
                if (u.id === action.payload) {
                    return {...u, followed: true}
                }
                return u;
            })
        },
        unfollowSuccess: (state, action: PayloadAction<number>) => {
            state.users = state.users.map(u => {
                if (u.id === action.payload) {
                    return {...u, followed: false}
                }
                return u;
            })
        },
        setUsers: (state, action: PayloadAction<UsersType[]>) => {
            state.users = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = action.payload
        },
        setTotalUserCount: (state, action: PayloadAction<number>) => {
            state.totalUsersCount = action.payload
        },
        toggleIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },
        toggleFollowingProgress: (state, action: PayloadAction<{ isFetching: boolean, userId: number }>) => {
            if (action.payload.isFetching) {
                state.followingInProgress.push(action.payload.userId)
            } else {
                state.followingInProgress = state.followingInProgress.filter(id => id !== action.payload.userId)
            }

        }

    }
}).injectInto(rootReducer)

export type FilterType = typeof initialState.filter
export type UsersState = typeof initialState

export const { actions: usersActions } = usersSlice;






