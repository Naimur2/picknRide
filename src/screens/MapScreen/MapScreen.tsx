import { VStack } from "native-base";
import React from "react";
import { ICAR } from "./MapScreen.types";
import MapBox, { IMapScreenProps } from "./components/MapBox/MapBox";
import MapscreenComp, {
    IMapTopDetailsProps,
} from "./components/MapScreenComp/MapscreenComp";
import {
    selectCurrentLocation,
    setCurrentLocation,
    setInitialLocation,
} from "@store/features/user-location/userLocationSlice";
import { useSelector, useDispatch } from "react-redux";
import config from "@config";
import { Alert, Platform } from "react-native";
import * as Location from "expo-location";
import useLocationPermissions from "../../hooks/useLocationPermissions";
import { useNavigation } from "@react-navigation/native";

interface IMapProps extends IMapScreenProps, IMapTopDetailsProps {}

function ActualMap({}: IMapProps) {
    const [carType, setCarType] = React.useState<ICAR>("scooter");
    const currentLocation = useSelector(selectCurrentLocation);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { hasForeGroundPermissions, checkPermissions } =
        useLocationPermissions();

    const getCurrentLocation = async () => {
        const { status, granted } =
            await Location.getForegroundPermissionsAsync();
        if (!granted || status !== "granted") {
            await checkPermissions();
        } else {
            const location = await Location.getCurrentPositionAsync({});

            dispatch(
                setInitialLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.01,
                })
            );
        }
    };

    React.useLayoutEffect(() => {
        if (config.DEV_MODE) {
            dispatch(
                setCurrentLocation({
                    latitude: config.latitude,
                    longitude: config.longitude,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.01,
                })
            );
        } else {
            getCurrentLocation();
        }
        // const interval = setInterval(() => {}, 10000);
        // return () => clearInterval(interval);
    }, []);

    console.log("currentLocation", currentLocation);

    return (
        <VStack
            flex={1}
            position="relative"
            justifyContent="space-between"
            h="full"
            w="full"
            collapsable={false}
        >
            <VStack flex="1" collapsable={false}>
                <MapscreenComp type={carType} setType={(t) => setCarType(t)} />
                <MapBox />
            </VStack>
        </VStack>
    );
}

export default React.memo(ActualMap);
