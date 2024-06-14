import { UserDto } from "../types";

export interface UserResponse{
    total: number,
    users: UserDto[]
}