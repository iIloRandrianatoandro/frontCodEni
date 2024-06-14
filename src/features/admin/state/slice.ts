import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserDto, UserState } from '../types'

const initialState: UserState = {
    users: undefined,
    userStatusChanged: false
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        updateUserList(state, action: PayloadAction<UserDto | undefined>) {
            state.users = [{ ...action.payload! }]
        },
        updateUserStatus(state, action: PayloadAction<boolean | undefined>){
            state.userStatusChanged = action.payload!
        }
    },
})

export const { updateUserList, updateUserStatus } = adminSlice.actions
export const adminReducer = adminSlice.reducer
