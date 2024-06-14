import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LocationState, MyLocation } from './type'

const initialState: LocationState = {
    location: undefined,
}

export const locationSlice = createSlice({
    name: 'location',
    initialState: initialState,
    reducers: {
        updateCurrentLocation(
            state,
            action: PayloadAction<MyLocation | undefined>
        ) {
            state.location = action.payload
        },
    },
})

export const locationReducer = locationSlice.reducer
export const { updateCurrentLocation } = locationSlice.actions
