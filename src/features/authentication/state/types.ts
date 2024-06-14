import { UserDto } from "@/features/admin/types"

/*export interface UserResponse {
    id: number
    email: string
    name: string
    password: string
    role: string
    avatar: string
}*/

export interface AuthJwtResponse {
    accessToken: string
    tokenType: string
}

export interface LoginDto {
    usernameOrEmail: string
    password: string
}

export interface AuthenticationState {
    accessToken?: string | null
    currentUser: UserDto | null
}
