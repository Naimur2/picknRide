import { VStack } from "native-base";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { carsData } from "./data";

import * as Location from "expo-location";
import MapscreenComp from "./components/MapScreenComp/MapscreenComp";

interface ILatLng {
    latitude: number;
    longitude: number;
}

interface IVeichle {
    _id: string;
    fuel: number;
    coordinates: ILatLng;
    fuel: number;
    type: "scooter" | "park" | "cycle" | "car";
}

type ICAR = "scooter" | "park" | "cycle" | "car";

export default function MapScreen() {
    const navigation = useNavigation();

    const [cars, setCars] = React.useState<IVeichle[]>([]);
    const [location, setLocation] = React.useState<ILatLng | null>(null);

    const [selectedType, setSelectedType] = React.useState<ICAR>("cycle");

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setCars(carsData);
        })();
    }, []);

    console.log(location);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const filteredCars = cars.filter((car) => {
        return car.type === selectedType;
    });

    return (
        <VStack flex={1} position="relative">
            <MapscreenComp selectedType={"cycle"} filteredCars={cars} />
        </VStack>
    );
}
