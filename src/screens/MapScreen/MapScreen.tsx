import { useNavigation } from "@react-navigation/native";
import { Text, VStack, Spinner } from "native-base";
import * as React from "react";
import ActualMap from "./ActualMap";
import * as Location from "expo-location";
import { carsData } from "./data";

export interface ILatLng {
    latitude: number;
    longitude: number;
}

export interface IVeichle {
    _id: string;
    fuel: number;
    coordinates: ILatLng;
    fuel: number;
    type: "scooter" | "park" | "cycle" | "car";
}

export type ICAR = "scooter" | "park" | "cycle" | "car";

function MapScreen() {
    const navigation = useNavigation();

    const [cars, setCars] = React.useState<IVeichle[] | null>(null);

    const [selectedType, setSelectedType] = React.useState<ICAR>("cycle");

    const [destinationLocation, setDestinationLocation] = React.useState({
        latitude: 0,
        longitude: 0,
    });

    React.useLayoutEffect(() => {
        let clear = true;
        navigation.setOptions({
            headerShown: false,
        });

        setCars(carsData);

        if (clear) {
            return () => (clear = false);
            setCars(null);
        }
    }, [navigation]);

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
        latitude: 25.286106,
        longitude: 51.534817,
        latitudeDelta: 0.009,
        longitudeDelta: 0.01,
    };

    return (
        <ActualMap
            type={selectedType}
            setType={setSelectedType}
            cars={cars}
            initialRegion={region}
            setDestination={handleAddDestination}
            destinationLocation={destinationLocation}
        />
    );
}

export default React.memo(MapScreen);
