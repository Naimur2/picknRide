import { Factory, Spinner, Text, VStack } from "native-base";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import speedMeter from "../../../assets/images/progress.png";
import BottomScan from "./components/BottomScan/BottomScan";
import LocationSearch from "./components/LocationSearch/LocationSearch";
import VeichleTemp from "./components/VeichleTemp/VeichleTemp";
import { carsData } from "./data";
import SpeedMeter from "./components/SpeedMeter/SpeedMeter";
import MapBox from "./components/MapBox/MapBox";
import MapscreenComp from "./components/MapScreenComp/MapscreenComp";

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

export default function MapScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | undefined>(undefined);

    const [cars, setCars] = React.useState<IVeichle[] | null>(null);
    const [currentLocation, setCurrentLocation] =
        React.useState<ILatLng | null>(null);

    const [selectedType, setSelectedType] = React.useState<ICAR>("cycle");

    const [destinationLocation, setDestinationLocation] = React.useState(null);

    React.useEffect(() => {
        let clear = true;
        const getUserLocation: Promise<ILatLng | null> = async () => {
            try {
                const current = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Highest,
                });

                const locationCurr: ILatLng = {
                    latitude: current.coords.latitude,
                    longitude: current.coords.longitude,
                };

                return locationCurr;
            } catch (err) {
                console.log("error 300", err);
                return null;
            }
        };

        (async () => {
            setIsLoading(true);
            let forePermission =
                await Location.requestForegroundPermissionsAsync();
            let backPermission =
                await Location.requestBackgroundPermissionsAsync();

            if (
                forePermission.status !== "granted" ||
                backPermission.status !== "granted"
            ) {
                setError("Permission to access location was denied");
                return;
            }

            const currLoc = await getUserLocation();

            await new Promise((resolve) =>
                setTimeout(() => {
                    setCars(carsData);
                    setCurrentLocation(currLoc);
                    setIsLoading(false);
                    clearTimeout(resolve);
                }, 1000)
            );
        })();

        if (clear) {
            setCars(null);
            setCurrentLocation(null);
            return () => (clear = false);
        }
    }, []);

    React.useLayoutEffect(() => {
        let clear = true;
        navigation.setOptions({
            headerShown: false,
        });

        if (clear) {
            return () => (clear = false);
        }
    }, [navigation]);

    if (isLoading) {
        return (
            <VStack flex={1} alignItems="center" justifyContent={"center"}>
                <Spinner color="blue" size={"lg"} />
            </VStack>
        );
    }

    if (error) {
        return (
            <VStack flex={1} alignItems="center" justifyContent={"center"}>
                <Text fontWeight={700}>{error}</Text>
            </VStack>
        );
    }

    return (
        <VStack
            flex={1}
            position="relative"
            pt={insets.top + 15 + "px"}
            justifyContent="space-between"
        >
            <MapscreenComp
                type={selectedType}
                setType={(type) => setSelectedType(type)}
            />
            <MapBox markers={cars} />
        </VStack>
    );
}
