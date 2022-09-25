import React from "react";
import { IAuthProviderProps } from "../../interfaces/context";
import { AuthContext } from "../contexts";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// let users = AsyncStorage.getItem('user').then((value) => {
//     setUser(value);
// })
// console.log(user);

const defaultState = {
    isAuthenciated: false,
    user: {
        name: "John Doe",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    currentLocation: {
        latitude: 0,
        longitude: 0,
    },
    isLoading: true,
    error: null,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION";
const SET_ERROR = "SET_ERROR";
const LOADING = "LOADING";
const UPDATE_STATE = "UPDATE_STATE";

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenciated: true,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenciated: false,
                user: null,
            };
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: {
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                },
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case UPDATE_STATE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default function AuthProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, defaultState);

    const value = React.useMemo(() => {
        const login = (user) => {
            dispatch({ type: LOGIN, payload: user });
        };

        const logout = () => {
            dispatch({ type: LOGOUT });
        };

        const register = (user) => {
            dispatch({ type: LOGIN, payload: user });
        };

        return {
            isAuthenciated: state.isAuthenciated,
            user: state.user,
            isLoading: state.isLoading,
            error: state.error,
            login,
            logout,
            register,
            currentLocation: state.currentLocation,
            setCurrentLocation: (location) => {
                dispatch({ type: SET_CURRENT_LOCATION, payload: location });
            },
            setError: (error) => {
                dispatch({ type: SET_ERROR, payload: error });
            },
            setLoading: (isLoading) => {
                dispatch({ type: LOADING, payload: isLoading });
            },
        } as IAuthProviderProps;
    }, [state]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
