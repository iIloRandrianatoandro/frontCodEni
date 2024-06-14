import api from '@/services/api'
import { Role, UserDto } from './types'
import { UserResponse } from './state/type'
import constants from '@/core/constants'

export const adminApi = api.injectEndpoints({
    endpoints: (build) => ({
        addUser: build.query<Omit<UserDto, 'password'>, UserDto>({
            query: (payload) => ({
                url: `user-management/user`,
                method: 'POST',
                data: payload,
            }),
        }),
        getAllUsers: build.query<UserResponse, number | null>({
            query: (page) => ({
                url: `user-management/user?offset=${page ? page : 0}&limit=${
                    constants.pagination.perPage
                }`,
                method: 'GET',
            }),
        }),
        changeUserStatus: build.query<
            null,
            { userId: number; status: { enable: boolean } }
        >({
            query: (payload) => ({
                url: `user-management/user/enable/${payload.userId}`,
                method: 'PUT',
                data: payload.status,
            }),
        }),

        getUserByRoleAndCommuneAndEnabled: build.query<Omit<UserDto, 'password'>, { role: Role, communeId: number, enabled: boolean }>({
            query: (payload) => ({
                url: `user-management/user/user-signature?role=${payload.role}&communeId=${payload.communeId}&enabled=${payload.enabled}`,
                method: 'GET',
            }),
        }),

        displayOrHideSignature: build.mutation<
            null,
            { userId: number; displayOrHide: { isSignatureDisplayed: boolean } }
        >({
            query: (payload) => ({
                url: `user-management/user/display-or-hide-signature/${payload.userId}`,
                method: 'PUT',
                data: payload.displayOrHide,
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useLazyAddUserQuery,
    useLazyGetAllUsersQuery,
    useLazyChangeUserStatusQuery,
    useDisplayOrHideSignatureMutation,
    useLazyGetUserByRoleAndCommuneAndEnabledQuery,
} = adminApi
