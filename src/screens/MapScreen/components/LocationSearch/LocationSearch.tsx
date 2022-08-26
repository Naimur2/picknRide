import { Factory, HStack } from "native-base";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Toggler from "../../../../svgs/Toggler";
import { ILatLng } from "../../MapScreen";

import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import car from "../../../../../assets/images/car-small.png";
import cycle from "../../../../../assets/images/cycle-small.png";
import scooter from "../../../../../assets/images/veichle.png";
import { Search } from "../../../../components/Icons/Icons";
import Constants from "expo-constants";

const images = {
    car,
    cycle,
    scooter,
};

function LocationSearch({
    setDestinationLocation,
    selectedType,
    ...rest
}: {
    setDestinationLocation: (destinationLocation: ILatLng) => void;
    selectedType: "car" | "cycle" | "scooter";
}) {
    const navigation = useNavigation();

    const handleSearchSelector = (d, details) => {
        const { lat, lng } = details.geometry.location;
        setDestinationLocation?.({
            latitude: lat,
            longitude: lng,
        });
    };

    const config = Constants?.manifest?.extra as { [key: string]: any };

    const RNImage = Factory(Image);
    const Touchable = Factory(TouchableOpacity);

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
                {selectedType ? (
                    <RNImage
                        h="25px"
                        w="25px"
                        source={images[selectedType]}
                        alt="tyy"
                        resizeMode="contain"
                        tintColor={"#000"}
                        mt="-1.5"
                    />
                ) : null}
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
