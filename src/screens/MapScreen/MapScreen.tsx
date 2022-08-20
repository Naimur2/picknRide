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
    const [currentLocation, setCurrentLocation] =
        React.useState<ILatLng | null>(null);

    const [selectedType, setSelectedType] = React.useState<ICAR>("cycle");

    const getUserLocation = async () => {
        try {
            const current = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
                maximumAge: 10000,
            });

            const locationCurr = {
                latitude: current.coords.latitude,
                longitude: current.coords.longitude,
            };

            setCars(carsData);

            console.log("sdfdsfdsf", locationCurr);

            setCurrentLocation(locationCurr);
        } catch (error) {
            console.log("error 300", error);
        }
    };

    React.useEffect(() => {
        (async () => {
            let forePermission =
                await Location.requestForegroundPermissionsAsync();
            let backPermission =
                await Location.requestBackgroundPermissionsAsync();

            if (
                forePermission.status !== "granted" ||
                backPermission.status !== "granted"
            ) {
                alert("Permission to access location was denied");
                return;
            }

            await getUserLocation();
        })();
    }, []);

    console.log("currentLocation", currentLocation);

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
            <MapscreenComp
                currentLocation={currentLocation}
                selectedType={"cycle"}
                filteredCars={cars}
            />
        </VStack>
    );
}
