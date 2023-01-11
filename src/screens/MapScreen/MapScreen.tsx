import config from "@config";
import { useNavigation } from "@react-navigation/native";
import { useGetNearestCarsApiQuery } from "@store/api/v2/carApi/carApiSlice";
import {
    selectCurrentLocation,
    setCurrentLocation,
} from "@store/features/user-location/userLocationSlice";
import colors from "@theme/colors";
import * as Location from "expo-location";
import { Spinner, VStack } from "native-base";
import * as React from "react";
import { Alert } from "react-native";
import { Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import ActualMap from "./ActualMap";
import AskBackgroundPermission from "./components/AskBackGroundPermission/AskBackgroundPermission";

function MapScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [selectedType, setSelectedType] = React.useState<ICAR>("cycle");

    const getCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission to access location was denied",
                "Please enable location services in your settings"
            );
            return;
        }
        const location = await Location.getCurrentPositionAsync({});

        dispatch(
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.01,
            })
        );
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
    }, []);

    return (
        <>
            <ActualMap type={selectedType} setType={setSelectedType} />
            <AskBackgroundPermission />
        </>
    );
}

export default React.memo(MapScreen);
