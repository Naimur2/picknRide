import config from "@config";
import { useNavigation } from "@react-navigation/native";
import { useGetNearestCarsApiQuery } from "@store/api/v2/carApi/carApiSlice";
import { IAuthState } from "@store/features/auth/authSlice.types";
import {
    selectCurrentRegion,
    setCurrentLocation,
} from "@store/features/user-location/userLocationSlice";
import { selectAuth, selectLoading } from "@store/store";
import * as TaskManager from "expo-task-manager";
import { Spinner, useColorMode } from "native-base";
import React from "react";
import { Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import AuthRoute from "./routes/auth.routes";
import DrawerRoute from "./routes/drawer.routes";

export default function Main() {
    const auth = useSelector(selectAuth) as IAuthState;
    const loading = useSelector(selectLoading);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const currentRegion = useSelector(selectCurrentRegion) as Region;

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

    TaskManager.defineTask(config.LOCATION_TASK_NAME, ({ data, error }) => {
        if (error) {
            // Error occurred - check `error.message` for more details.
            return;
        }
        if (data) {
            const { locations } = data;
            console.log(locations);

            dispatch(
                setCurrentLocation({
                    latitude: locations[0].coords.latitude,
                    longitude: locations[0].coords.longitude,
                })
            );
            // do something with the locations captured in the background
        }
    });

    const showLoading = locationData.isLoading || !locationData.isLoading;

    return (
        <>
            {loading && currentRoute?.name !== "MapScreen" && !showLoading ? (
                <Spinner
                    position={"absolute"}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    size={80}
                    color={colorMode === "light" ? "#2d064f" : "#fff"}
                    zIndex={1000}
                />
            ) : null}
            <Content />
        </>
    );
}
