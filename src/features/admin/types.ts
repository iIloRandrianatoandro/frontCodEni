import { LocationItem } from '../common/location/state/type'

export enum Role {
    DOCTOR = 'DOCTOR',
    P_FOKONTANY = 'P_FOKONTANY',
    SEC = 'SEC',
    COURT_CLERK = 'COURT_CLERK',
    CENTRAL = 'CENTRAL',
    ADMIN = 'ADMIN',
    REGISTRAR = 'REGISTRAR',
    PROSECUTOR = 'PROSECUTOR',
    COMMUNITY_AGENT = 'COMMUNITY_AGENT',
    MAGISTRATE = 'MAGISTRATE',
}

export interface UserDto {
    id: number
    role: Role
    matriculation: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    workPlace: string
    username: string
    password: string
    province: LocationItem
    region: LocationItem
    district: LocationItem
    commune: LocationItem
    borough: LocationItem
    fokontany: LocationItem
    signature: any
    authority: string
    enabled: boolean
}

export interface UserState {
    users: UserDto[] | undefined
    userStatusChanged: boolean
}
