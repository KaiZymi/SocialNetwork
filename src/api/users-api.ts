import {profileAPI} from "./profile-api";
import {instance, APIResponseType} from "./api";
import {UsersType} from "../types/typeReducers";



type GetUsersItemsType = {
    items: Array<UsersType>,
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)

    }
}