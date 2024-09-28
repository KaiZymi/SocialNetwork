import {UsersType} from "../../types/typeReducers";
import {usersAPI} from "../../api/users-api";
import {APIResponseType} from "../../api/api";
import {Dispatch} from "redux";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialState = {
    users: [ ] as Array<UsersType>,
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


export const requestUsers = createAsyncThunk('users/requestUsers', async (payload:{currentPage: number, pageSize: number, filter: FilterType}, {dispatch}) => {
    dispatch(toggleIsFetching(true))
    dispatch(setFilter(payload.filter))

    let data = await usersAPI.getUsers(payload.currentPage, payload.pageSize, payload.filter.term, payload.filter.friend)
    dispatch(setCurrentPage(payload.currentPage))
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUserCount(data.totalCount))
})

const _followUnfollowFlow = async (dispatch: Dispatch<any>,
                                   userId: number,
                                   apiMethod: (userId: number) => Promise<APIResponseType>,
                                   actionCreator: (userId: number) => any) => {
    dispatch(toggleFollowingProgress({isFetching: true, userId}))
    let response = await apiMethod(userId)

    if (response.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress({isFetching: false, userId}))
}

export const follow = createAsyncThunk('users/follow', async(userId: number, {dispatch}) =>{
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
})

export const unfollow = createAsyncThunk('users/unfollow', async(userId: number, {dispatch}) =>{
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
})


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
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
        setUsers: (state, action: PayloadAction<UsersType[]>) =>{
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
        toggleFollowingProgress: (state, action: PayloadAction<{isFetching:boolean, userId: number}>) => {
            if(action.payload.isFetching){
                state.followingInProgress.push(action.payload.userId)
            }else{
                state.followingInProgress = state.followingInProgress.filter(id => id !== action.payload.userId)
            }

        }

    }
})

export type FilterType = typeof initialState.filter
// type initialStateType = typeof initialState
// type ActionsTypes = InferActionsTypes<typeof actions>
// type ThunkType = BaseThunkType<ActionsTypes>

export const {followSuccess, unfollowSuccess, setFilter , setTotalUserCount,
    setUsers, toggleFollowingProgress, toggleIsFetching, setCurrentPage} = usersSlice.actions;



// const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
//     switch(action.type) {
//         case 'SN/USERS/FOLLOW':
//             return {
//                 ...state,
//                 users: state.users.map( u =>  {
//                     if (u.id === action.userId) {
//                         return {...u, followed: true}
//                     }
//                     return u;
//                 })
//             }
//         case 'SN/USERS/UNFOLLOW':
//             return {
//                 ...state,
//                 users: state.users.map( u =>  {
//                     if (u.id === action.userId) {
//                         return {...u, followed: false}
//                     }
//                     return u;
//                 })
//             }
//         case 'SN/USERS/SET_USERS': {
//             return { ...state, users: action.users}
//         }
//         case 'SN/USERS/SET_CURRENT_PAGE': {
//             return { ...state, currentPage: action.currentPage }
//         }
//         case 'SN/USERS/SET_FILTER': {
//             return {...state, filter: action.payload}
//         }
//         case 'SN/USERS/SET_TOTAL_COUNT': {
//             return { ...state, totalUsersCount: action.totalUsersCount }
//         }
//         case "SN/USERS/TOGGLE_IS_FETCHING": {
//             return { ...state, isFetching: action.isFetching }
//         }
//         case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
//             return { ...state,
//                 followingInProgress: action.isFetching
//                     ? [...state.followingInProgress, action.userId]
//                     : state.followingInProgress.filter(id => id !== action.userId)
//             }
//         }
//         default:
//             return state;
//     }
// }
//
//
//
//
// export const actions = {
//     followSuccess: (userId:number)  => ({ type: 'SN/USERS/FOLLOW', userId } as const),
//     unfollowSuccess: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
//     setUsers: (users: Array<UsersType>)  => ({ type: 'SN/USERS/SET_USERS', users } as const),
//     setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
//     setFilter: (filter: FilterType) => ({type:'SN/USERS/SET_FILTER', payload:filter} as const),
//     setTotalUserCount: (totalUsersCount: number) => ({ type: 'SN/USERS/SET_TOTAL_COUNT', totalUsersCount } as const),
//     toggleIsFetching: (isFetching: boolean)=> ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
//     toggleFollowingProgress: (isFetching: boolean, userId: number)=> ({ type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
// }

// export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType):ThunkType =>{
//     return async (dispatch) => {
//         dispatch(actions.toggleIsFetching(true))
//         dispatch(actions.setFilter(filter))
//
//         let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
//         dispatch(actions.setCurrentPage(currentPage))
//         dispatch(actions.toggleIsFetching(false))
//         dispatch(actions.setUsers(data.items))
//         dispatch(actions.setTotalUserCount(data.totalCount))
//
//     }
// }
//
// const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
//                                    userId: number,
//                                    apiMethod: (userId: number) => Promise<APIResponseType>,
//                                    actionCreator: (userId: number) => ActionsTypes) => {
//     dispatch(actions.toggleFollowingProgress(true, userId))
//     let response = await apiMethod(userId)
//
//     if (response.resultCode == 0) {
//         dispatch(actionCreator(userId))
//     }
//     dispatch(actions.toggleFollowingProgress(false, userId))
// }
//
// export const follow = (userId: number): ThunkType => {
//     return async (dispatch) => {
//         await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
//     }
// }
//
// export const unfollow = (userId: number): ThunkType => {
//     return async (dispatch) => {
//         await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
//     }
// }
//





