import LoadingView from "@components/LoadingView/LoadingView";
import config from "@config";
import { useNavigation } from "@react-navigation/native";
import { useGetNearestCarsApiQuery } from "@store/api/v2/carApi/carApiSlice";
import { selectToken } from "@store/features/auth/authSlice";
import { IAuthState } from "@store/features/auth/authSlice.types";
import {
    selectCurrentRegion,
    setCurrentLocation,
} from "@store/features/user-location/userLocationSlice";
import { selectAuth, selectLoading } from "@store/store";
import * as TaskManager from "expo-task-manager";
import { VStack, useColorMode } from "native-base";
import React from "react";
import { Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import AuthRoute from "./routes/auth.routes";
import DrawerRoute from "./routes/drawer.routes";
import { setCurrentSpeed } from "@store/features/cars/carsSlice";

export default function Main() {
    const auth = useSelector(selectAuth) as IAuthState;
    const loading = useSelector(selectLoading);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const currentRegion = useSelector(selectCurrentRegion) as Region;
    const token = useSelector(selectToken);

    console.log("token", token);

    const locationData = useGetNearestCarsApiQuery(
        {
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
            pageNumber: 1,
            pageSize: 10,
        },
        { skip: !currentRegion.latitude || !currentRegion.longitude }
    );

    const [goToDashboard, setGoToDashboard] = React.useState(false);

    const currentRoute = navigation.getCurrentRoute();
    const { colorMode } = useColorMode();

    React.useEffect(() => {
        if (auth?.token && !auth.checkOtherInformation) {
            setGoToDashboard(true);
        } else {
            setGoToDashboard(false);
        }
    }, [auth?.token, auth.checkOtherInformation]);

    const Content = goToDashboard ? DrawerRoute : AuthRoute;

    const getNearestLocation = async ({
        latitude,
        longitude,
        pageSize = 10,
        pageNumber = 1,
    }: {
        latitude: number;
        longitude: number;
        pageSize: number;
        pageNumber: number;
    }) => {
        const URL =
            config.API_V2 +
            `Cars/AllNearestCars?PageNumber=${pageNumber}&PageSize=${pageSize}&Latitude=${latitude}&Longitude=${longitude}`;
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "Pick&Ride-Token": token,
                token: token,
            },
        });
        const data = await response.json();
        const cars = data?.items;
        console.log({ data });
        // dispatch(setNearestCars(cars));
    };

    TaskManager.defineTask(config.LOCATION_TASK_NAME, ({ data, error }) => {
        if (error) {
            // Error occurred - check `error.message` for more details.
            return;
        }
        if (data) {
            const { locations } = data;
            console.log("locations: ", locations);

            const speed = locations[0].coords.speed;
            const toKmPerHour: number = speed * 3.6;

            dispatch(setCurrentSpeed(toKmPerHour));

            // getNearestLocation({
            //     latitude: locations[0].coords.latitude,
            //     longitude: locations[0].coords.longitude,
            //     pageSize: 10,
            //     pageNumber: 1,
            // });

            dispatch(
                setCurrentLocation({
                    latitude: locations[0].coords.latitude,
                    longitude: locations[0].coords.longitude,
                })
            );
            // do something with the locations captured in the background
        }
    });

    let loadingView = null;
    if (loading) {
        loadingView = (
            <VStack
                position={"absolute"}
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg={"#ffffff50"}
                zIndex={1000}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <LoadingView />
            </VStack>
        );
    }

    if (locationData.isLoading) {
        loadingView = null;
    }

    return (
        <>
            {loadingView}

            <Content />
        </>
    );
}
