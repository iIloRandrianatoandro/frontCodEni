import api from '@/services/api'
import { AuthJwtResponse, LoginDto } from './state/types'
import { UserDto } from '../admin/types'

const authenticationApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.query<AuthJwtResponse, LoginDto>({
            query: (payload) => ({
                url: `auth/login`,
                method: 'POST',
                data: payload,
            }),
        }),
        profile: build.query<UserDto, null>({
            query: () => ({
                url: `session/profile`,
                method: 'GET',
            }),
        }),
        logout: build.query<string, null>({
            query: () => ({
                url: `session/logout`,
                method: 'POST',
            }),
        })
    }),
    overrideExisting: false,
})

export const { useLazyLoginQuery, useLazyProfileQuery, useLazyLogoutQuery } = authenticationApi
