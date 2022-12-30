import { ILatLng } from "../../screens/MapScreen/MapScreen";
import { IUser } from "./index";

export interface IAuthProviderProps {
    isAuthenciated: boolean;
    user: IUser;
    login: (user: any) => void;
    logout: () => void;
    register: (user: any) => void;
    currentLocation: ILatLng;
    setCurrentLocation: (location: ILatLng) => void;
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
    error: string | null;
    setError: (error: string) => void;
}
