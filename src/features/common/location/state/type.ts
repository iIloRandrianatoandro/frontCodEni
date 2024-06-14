export type MyLocation = {
    provinceId: number
    regionId: number
    districtId: number
    communeId: number
    boroughId: number
    fokontanyId: number
}

export interface LocationState {
    location: MyLocation | undefined
}

export interface LocationItem {
    id: number
    name: string
}

export interface RegionLocationItem extends LocationItem {
    province_id: number
}

export interface DistrictLocationItem extends LocationItem {
    region_id: number
}

export interface MunicipalityLocationItem extends LocationItem {
    district_id: number
}

export interface BoroughsLocationItem extends LocationItem {
    common_id: number
}

export interface FokontanyLocationItem extends LocationItem {
    borough_id: number
}

export interface LocationRawResponse {
    data:
        | RegionLocationItem[]
        | DistrictLocationItem[]
        | MunicipalityLocationItem[]
        | BoroughsLocationItem[]
        | FokontanyLocationItem[]
    meta: {
        page: number
        take: number
        itemCount: number
        pageCount: number
        hasPreviousPage: boolean
        hasNextPage: boolean
    }
}
