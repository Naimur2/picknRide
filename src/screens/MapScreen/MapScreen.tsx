import { HStack, Image, Spinner, VStack } from "native-base";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { carsData } from "./data";

import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import car from "../../../assets/images/car-small.png";
import cycle from "../../../assets/images/cycle-small.png";
import scooter from "../../../assets/images/veichle.png";
import config from "../../../config";
import { Search } from "../../components/Icons/Icons";
import Toggler from "../../svgs/Toggler";
import MapBox from "./components/MapBox/MapBox";
import VeichleTemp from "./components/VeichleTemp/VeichleTemp";

interface ILatLng {
    latitude: number;
    longitude: number;
}

const images = {
    car,
    cycle,
    scooter,
};
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
    const insets = useSafeAreaInsets();

    const [cars, setCars] = React.useState<IVeichle[] | null>(null);
    const [currentLocation, setCurrentLocation] =
        React.useState<ILatLng | null>(null);

    const [selectedType, setSelectedType] = React.useState<ICAR>("cycle");

    const [destinationLocation, setDestinationLocation] = React.useState(null);

    const handleSearchSelector = (d, details) => {
        const { lat, lng } = details.geometry.location;
        setDestinationLocation({
            latitude: lat,
            longitude: lng,
        });
    };

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

    const filteredCars = cars?.filter((car) => {
        return car.type === selectedType;
    });

    if (!currentLocation || !cars) {
        return (
            <VStack flex={1} alignItems="center" justifyContent={"center"}>
                <Spinner color="blue" />
            </VStack>
        );
    }

    return (
        <VStack flex={1} position="relative">
            <MapBox markers={cars}>
                <VStack space="6" pt={insets.top + 30 + "px"} py={4} w="full">
                    <HStack space={3} alignItems={"center"}>
                        <HStack mt={2} mr={2} space={2}>
                            <Toggler />
                            <Image
                                h="25px"
                                w="25px"
                                source={images[selectedType]}
                                alt="tyy"
                                resizeMode="contain"
                                tintColor={"#000"}
                            />
                        </HStack>
                        <GooglePlacesAutocomplete
                            position={"absolute"}
                            zIndex={10000}
                            placeholder="Search"
                            fetchDetails={true}
                            onPress={handleSearchSelector}
                            renderLeftButton={() => (
                                <Search
                                    position="absolute"
                                    zIndex={100000}
                                    left={0.5}
                                    top={3}
                                />
                            )}
                            query={{
                                key: config.GOOGLE_MAP_KEY,
                                language: "en",
                            }}
                            styles={{
                                textInputContainer: {
                                    marginVertical: 10,
                                    width: "100%",
                                    borderRadius: 20,
                                    overflow: "hidden",
                                },
                                textInput: {
                                    height: 45,
                                    color: "#5d5d5d",
                                    fontSize: 16,
                                    paddingLeft: 30,
                                    paddingRight: 15,
                                    borderRadius: 20,
                                },
                                predefinedPlacesDescription: {
                                    color: "#1faadb",
                                },
                            }}
                        />
                    </HStack>
                    <VeichleTemp
                        selected={selectedType}
                        setSelected={setSelectedType}
                    />
                </VStack>
            </MapBox>
        </VStack>
    );
}
