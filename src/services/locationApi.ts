import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from './axiosBaseQuery'
import constants from '@/core/constants'
import {
    BoroughsLocationItem,
    DistrictLocationItem,
    FokontanyLocationItem,
    LocationRawResponse,
    MunicipalityLocationItem,
    RegionLocationItem,
} from '@/features/common/location/state/type'

export const locationApi = createApi({
    reducerPath: 'locationAPI',
    baseQuery: axiosBaseQuery(constants.api.locationBaseURL),
    endpoints: (build) => ({
        getRegions: build.query<RegionLocationItem[], null>({
            query: () => ({
                url: `regions?order=asc&page=1&take=1000`,
                method: 'GET',
            }),
            transformResponse: (response: LocationRawResponse, _meta, _arg) =>
                response.data as RegionLocationItem[],
        }),
        getRegion: build.query<RegionLocationItem, number>({
            query: (regionId) => ({
                url: `regions/${regionId}`,
                method: 'GET',
            }),
        }),
        getDistricts: build.query<DistrictLocationItem[], number>({
            query: (regionId) => ({
                url:
                    regionId === 0
                        ? `districts?order=asc&page=1&take=250`
                        : `districts/region/${regionId}`,
                method: 'GET',
            }),
        }),

        getDistrict: build.query<DistrictLocationItem, number>({
            query: (districtId) => ({
                url: `districts/${districtId}`,
                method: 'GET',
            }),
        }),

        getMunicipalities: build.query<MunicipalityLocationItem[], number>({
            query: (districtId) => ({
                url: `municipalities/district/${districtId}`,
                method: 'GET',
            }),
        }),
        getBoroughs: build.query<BoroughsLocationItem[], number>({
            query: (municipalityId) => ({
                url: `boroughs/municipality/${municipalityId}`,
                method: 'GET',
            }),
        }),
        getFokontanys: build.query<FokontanyLocationItem[], number>({
            query: (boroughId) => ({
                url: `fokontany/borough/${boroughId}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useLazyGetRegionsQuery,
    useLazyGetRegionQuery,
    useLazyGetDistrictsQuery,
    useLazyGetDistrictQuery,
    useLazyGetMunicipalitiesQuery,
    useLazyGetBoroughsQuery,
    useLazyGetFokontanysQuery,
} = locationApi
