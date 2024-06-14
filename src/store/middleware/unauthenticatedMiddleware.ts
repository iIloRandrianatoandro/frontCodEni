import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit'
import { resetStateAction } from '../actions'

const unauthenticatedMiddleware: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        if (isRejectedWithValue(action) && action.payload.status === 401) {
            dispatch(resetStateAction())
        }

        return next(action)
    }

export default unauthenticatedMiddleware
