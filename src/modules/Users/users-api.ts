
import {instance, APIResponseType} from "../../shared/api/api";
import {UsersType} from "../../shared/types/typeReducers";



type GetUsersItemsType = {
    items: Array<UsersType>,
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 2, term = '', friend: null | boolean = null) {
        return instance.get<GetUsersItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>

    }
}