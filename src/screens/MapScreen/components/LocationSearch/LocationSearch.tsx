import React from "react";
import { HStack, Image } from "native-base";
import Toggler from "../../../../svgs/Toggler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import config from "../../../../../config";
import { ILatLng } from "../../MapScreen";

import car from "../../../../../assets/images/car-small.png";
import cycle from "../../../../../assets/images/cycle-small.png";
import scooter from "../../../../../assets/images/veichle.png";
import { Search } from "../../../../components/Icons/Icons";

const images = {
    car,
    cycle,
    scooter,
};

export default function LocationSearch({
    setDestinationLocation,
    selectedType,
}: {
    setDestinationLocation: (destinationLocation: ILatLng) => void;
    selectedType: "car" | "cycle" | "scooter";
}) {
    const handleSearchSelector = (d, details) => {
        const { lat, lng } = details.geometry.location;
        setDestinationLocation?.({
            latitude: lat,
            longitude: lng,
        });
    };

    console.log("selectedType", images[selectedType]);

    return (
        <HStack
            px={6}
            space={4}
            justifyContent="center"
            alignItems={"flex-start"}
        >
            <HStack width={"20%"} mt={6} mr={2} space={4} alignItems="center">
                <Toggler />
                {selectedType ? (
                    <Image
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
                renderLeftButton={() => (
                    <Search
                        position="absolute"
                        zIndex={100000}
                        left={1}
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
    );
}
