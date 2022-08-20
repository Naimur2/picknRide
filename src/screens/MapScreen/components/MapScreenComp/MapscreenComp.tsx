import { LinearGradient } from "expo-linear-gradient";
import { Factory, HStack, Image, Text, VStack } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";
import { ErrorOutline, Search } from "../../../../components/Icons/Icons";
import Toggler from "../../../../svgs/Toggler";
import VeichleTemp from "../VeichleTemp/VeichleTemp";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import car from "../../../../../assets/images/car-small.png";
import cycle from "../../../../../assets/images/cycle-small.png";
import locate from "../../../../../assets/images/locate.png";
import speedMeter from "../../../../../assets/images/progress.png";
import scan from "../../../../../assets/images/scan.png";
import scooter from "../../../../../assets/images/veichle.png";
import config from "../../../../../config";
import MapBox from "../MapBox/MapBox";

const images = {
    car,
    cycle,
    scooter,
};

export default function MapscreenComp({
    selectedType,
    setSelectedType,
    filteredCars,
    currentLocation,
}) {
    const Lg = Factory(LinearGradient);
    const ImageBg = Factory(ImageBackground);
    const [destinationLocation, setDestinationLocation] = React.useState(null);

    const handleSearchSelector = (d, details) => {
        const { lat, lng } = details.geometry.location;
        setDestinationLocation({
            latitude: lat,
            longitude: lng,
        });
    };

    console.log("currentLocation", destinationLocation);

    return (
        <>
            <VStack
                space="6"
                position={"absolute"}
                zIndex={10000}
                px={6}
                py={4}
                w="full"
            >
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
                            mt={-2}
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

            <ImageBg
                position={"absolute"}
                zIndex={10000}
                source={speedMeter}
                height={"70px"}
                width={"70px"}
                bottom={"30%"}
                left={"5"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Text
                    lineHeight={24}
                    color="#000"
                    fontSize={"24"}
                    fontWeight={700}
                >
                    50
                </Text>
                <Text
                    lineHeight={7}
                    color="#000"
                    fontSize={"7"}
                    fontWeight={600}
                >
                    km/h
                </Text>
            </ImageBg>

            <VStack
                space="6"
                position={"absolute"}
                zIndex={10000}
                w="full"
                bottom={0}
            >
                <Lg
                    colors={["#ffffff", "#ffffff50"]}
                    start={[0, 1]}
                    end={[0, 0]}
                    py={6}
                >
                    <HStack alignItems="flex-end" px={4}>
                        <ErrorOutline />
                        <Image mx={"auto"} source={scan} alt="scan" />
                        <Image source={locate} alt="locate" />
                    </HStack>
                </Lg>
            </VStack>

            <MapBox
                markers={filteredCars}
                currentLocation={currentLocation}
                destinationLocation={destinationLocation}
            />
        </>
    );
}
