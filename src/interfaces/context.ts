import { IUser } from "./index";
export interface IAuthProviderProps {
    isAuthenciated: boolean;
    user: IUser;
    login: (user: any) => void;
    logout: () => void;
    register: (user: any) => void;
}
