import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from './axiosBaseQuery'
import constants from '@/core/constants'

const api = createApi({
    reducerPath: 'judgementAPI',
    baseQuery: axiosBaseQuery(constants.api.baseURL),
    endpoints: () => ({}),
})

export default api
