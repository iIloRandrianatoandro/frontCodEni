import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import { AxiosError, RawAxiosRequestHeaders } from 'axios';
import axiosInstance from './axiosInstance'
import { RootState } from '@/store'
import { omit } from 'lodash'

const axiosBaseQuery =
    (baseUrl: string): BaseQueryFn =>
    async (args, { getState }) => {
        try {
            const token = (getState() as RootState).authentication.accessToken

            const headers: RawAxiosRequestHeaders | null = token
                ? {
                      ...omit(args.headers, ['user-agent']),
                      Authorization: `Bearer ${token}`,
                      'Access-Control-Allow-Credentials':true
                  }
                : null

            const result = await axiosInstance({
                ...args,
                baseURL: baseUrl,
                headers,
            })

            return {
                data: result.data,
            }
        } catch (axiosError) {
            const err = axiosError as AxiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data,
                },
            }
        }
    }

export default axiosBaseQuery
