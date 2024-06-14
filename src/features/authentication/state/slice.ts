import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthenticationState } from './types'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { RootState } from '@/store'
import { UserDto } from '@/features/admin/types'

const initialState: AuthenticationState = {
    accessToken: null,
    currentUser: null,
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        updateAccessToken(state, action: PayloadAction<string | undefined>) {
            state.accessToken = action.payload
        },

        setCurrentUser(state, action: PayloadAction<UserDto | undefined>) {
            state.currentUser = {
                ...action.payload!,
            }
        },
        logoutUser(state, _action: PayloadAction<UserDto | undefined>) {
            state.accessToken = ''
            state.currentUser = null
        },
    },
})

export const { updateAccessToken, setCurrentUser, logoutUser } =
    authenticationSlice.actions

export const authenticationReducer = persistReducer(
    {
        key: 'authentication',
        storage,
    },
    authenticationSlice.reducer
)

export const selectAuth = (state: RootState) => state
