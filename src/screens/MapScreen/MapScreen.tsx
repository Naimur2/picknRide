import { Factory, HStack, Image, Pressable, VStack } from "native-base";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { useNavigation } from "@react-navigation/native";
import MapLoc from "./components/MapLoc/MapLoc";
import { carsData } from "./data";

import car from "../../../assets/images/car-small.png";
import cycle from "../../../assets/images/cycle-small.png";
import scooter from "../../../assets/images/veichle.png";

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

export default function MapScreen() {
    const navigation = useNavigation();

    const Map = Factory(MapView);
    const initialRegion = {
        latitude: 25.286106,
        longitude: 51.534817,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const [cars, setCars] = React.useState<IVeichle[]>([]);

    const [selectedType, setSelectedType] = React.useState<
        "scooter" | "park" | "cycle" | "car"
    >("scooter");

    React.useEffect(() => {
        setCars(carsData);
    }, []);

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
            <HStack position={"absolute"} zIndex={10000} p={4} space={2}>
                <Pressable
                    bg="primary.100"
                    borderWidth={2}
                    borderColor="#fff"
                    p="3"
                    borderRadius={50}
                    onPress={() => setSelectedType("cycle")}
                >
                    <Image
                        w="25px"
                        h="25px"
                        resizeMode="contain"
                        source={cycle}
                        alt="cycle"
                        tintColor={"#fff"}
                    />
                </Pressable>
                <Pressable
                    bg="primary.100"
                    borderWidth={2}
                    borderColor="#fff"
                    p="3"
                    borderRadius={50}
                    onPress={() => setSelectedType("car")}
                >
                    <Image
                        w="25px"
                        h="25px"
                        resizeMode="contain"
                        source={car}
                        alt="car"
                        tintColor={"#fff"}
                    />
                </Pressable>
                <Pressable
                    bg="primary.100"
                    borderWidth={2}
                    borderColor="#fff"
                    p="3"
                    borderRadius={50}
                    onPress={() => setSelectedType("scooter")}
                >
                    <Image
                        w="25px"
                        h="25px"
                        resizeMode="contain"
                        source={scooter}
                        alt="scooter"
                        tintColor={"#fff"}
                    />
                </Pressable>
            </HStack>
            <Map
                initialRegion={initialRegion}
                flex={1}
                provider={PROVIDER_GOOGLE}
            >
                {filteredCars.map((car) => (
                    <MapLoc key={car._id} car={car} />
                ))}
            </Map>
        </VStack>
    );
}
