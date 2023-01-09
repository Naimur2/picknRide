import { useNavigation } from "@react-navigation/native";
import { useGetNearestCarsApiQuery } from "@store/api/v2/carApi/carApiSlice";
import * as React from "react";
import { useDispatch } from "react-redux";
import ActualMap from "./ActualMap";
import { ILatLng } from "./MapScreen.types";
import AskBackgroundPermission from "./components/AskBackGroundPermission/AskBackgroundPermission";
import { Region } from "react-native-maps";
import { Alert } from "react-native";
import * as Location from "expo-location";
import config from "@config";

function MapScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [initialRegion, setInitialRegion] = React.useState<Region | null>();

    const { data } = useGetNearestCarsApiQuery(
        {
            pageSize: 10,
            pageNumber: 1,
            latitude: 25.286106,
            longitude: 51.534817,
        },
        {
            skip: !initialRegion,
        }
    );

    console.log("data", data);

    const [selectedType, setSelectedType] = React.useState<ICAR>("cycle");

    const [destinationLocation, setDestinationLocation] = React.useState({
        latitude: 0,
        longitude: 0,
    });

    const handleAddDestination = (location: ILatLng) => {
        setDestinationLocation((prev) => ({
            ...prev,
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.01,
        }));
    };

    const region = {
        latitude: config.latitude,
        longitude: config.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.01,
    };

    React.useEffect(() => {
        const getCurrentLocation = async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permission to access location was denied",
                    "Please enable location services in your settings"
                );
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.01,
            });
        };
        if (config.DEV_MODE) {
            setInitialRegion(region);
        } else {
            getCurrentLocation();
        }
    }, []);

    return (
        <>
            <ActualMap
                type={selectedType}
                setType={setSelectedType}
                initialRegion={region}
                setDestination={handleAddDestination}
                destinationLocation={destinationLocation}
            />
            <AskBackgroundPermission />
        </>
    );
}

export default React.memo(MapScreen);
