import { IUser } from "../../../types/interfaces";

export interface IAuthState extends IUser {
    token: string | null;
}
