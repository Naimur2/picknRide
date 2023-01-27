import Toggler from "@assets/svgs/Toggler";
import { Factory, HStack, Image } from "native-base";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ILatLng } from "../../MapScreen";

import carImage from "@assets/images/car-small.png";
import cycleImage from "@assets/images/cycle-small.png";
import scooterImage from "@assets/images/veichle.png";
import { Search } from "@components/Icons/Icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { selectSelectedVeichleType } from "../../../../redux/features/cars/carsSlice";

const Items = {
    car: (props: any): JSX.Element => {
        return (
            <Image
                h="25px"
                w="25px"
                source={carImage}
                alt="tyy"
                resizeMode="contain"
                tintColor={"#000"}
                mt="-1.5"
                {...props}
            />
        );
    },

    cycle: (props: any): JSX.Element => {
        return (
            <Image
                h="25px"
                w="25px"
                source={cycleImage}
                alt="tyy"
                resizeMode="contain"
                tintColor={"#000"}
                mt="-1.5"
                {...props}
            />
        );
    },
    scotter: (props: any): JSX.Element => {
        return (
            <Image
                h="25px"
                w="25px"
                source={scooterImage}
                alt="tyy"
                resizeMode="contain"
                tintColor={"#000"}
                mt="-1.5"
                {...props}
            />
        );
    },
};

function LocationSearch({
    setDestinationLocation,
    ...rest
}: {
    setDestinationLocation: (destinationLocation: ILatLng) => void;
}) {
    const selectedType = useSelector(selectSelectedVeichleType);
    const navigation = useNavigation();

    const handleSearchSelector = (d, details) => {
        const { lat, lng } = details.geometry.location;
        setDestinationLocation?.({
            latitude: lat,
            longitude: lng,
        });
    };

    const config = Constants?.manifest?.extra as { [key: string]: any };

    const Touchable = Factory(TouchableOpacity);

    let Smage = Items?.[selectedType] ?? null;

    console.log("Smage", Smage);

    console.log("selectedType", selectedType);

    return (
        <HStack
            px={6}
            space={4}
            justifyContent="center"
            alignItems={"flex-start"}
            {...rest}
        >
            <HStack width={"20%"} mt={6} mr={2} space={4} alignItems="center">
                <Touchable onPress={() => navigation.openDrawer()}>
                    <Toggler />
                </Touchable>
                <Smage />
            </HStack>
            <GooglePlacesAutocomplete
                placeholder="Search"
                fetchDetails={true}
                onPress={handleSearchSelector}
                keepResultsAfterBlur={true}
                renderLeftButton={() => (
                    <Search
                        position="absolute"
                        zIndex={100000}
                        left={1}
                        top={3}
                    />
                )}
                query={{
                    key: config?.GOOGLE_MAP_KEY ?? "",
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
    );
}

export default React.memo(LocationSearch);
