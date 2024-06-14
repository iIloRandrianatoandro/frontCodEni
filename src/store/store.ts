import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { RESET_STATE_ACTION_TYPE } from './actions'
import {
    authenticationSlice,
    authenticationReducer,
} from '@/features/authentication/state/slice'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import unauthenticatedMiddleware from './middleware/unauthenticatedMiddleware'
import api from '@/services/api'
import {
    judgementReducer,
    judgementSlice,
} from '@/features/judgement/state/slice'
import { adminReducer, adminSlice } from '@/features/admin/state/slice'
import {
    locationReducer,
    locationSlice,
} from '@/features/common/location/state/slice'
import { locationApi } from '@/services/locationApi'
import { judgementApi } from '@/features/judgement/judgementApi'

const reducers = {
    [authenticationSlice.name]: authenticationReducer,
    [adminSlice.name]: adminReducer,
    [judgementSlice.name]: judgementReducer,
    [locationSlice.name]: locationReducer,
    [api.reducerPath]: api.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
}

const combinedReducer = combineReducers<typeof reducers>(reducers)

const rootReducer: Reducer<RootState> = (state, action) => {
    if (action.type === RESET_STATE_ACTION_TYPE) {
        state = {} as RootState
    }

    return combinedReducer(state, action)
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(
            unauthenticatedMiddleware,
            api.middleware,
            locationApi.middleware,
            judgementApi.middleware
        ),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof combinedReducer>
export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
