export interface IAuthProviderProps {
    isAuthenciated: boolean;
    user: any;
    login: (user: any) => void;
    logout: () => void;
    register: (user: any) => void;
}
