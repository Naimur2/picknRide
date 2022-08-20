import { LinearGradient } from "expo-linear-gradient";
import { Factory, HStack, Image, Text, VStack } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";
import { ErrorOutline } from "../../../../components/Icons/Icons";
import Toggler from "../../../../svgs/Toggler";
import VeichleTemp from "../VeichleTemp/VeichleTemp";

import car from "../../../../../assets/images/car-small.png";
import cycle from "../../../../../assets/images/cycle-small.png";
import locate from "../../../../../assets/images/locate.png";
import speedMeter from "../../../../../assets/images/progress.png";
import scan from "../../../../../assets/images/scan.png";
import scooter from "../../../../../assets/images/veichle.png";
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
}) {
    const Lg = Factory(LinearGradient);
    const ImageBg = Factory(ImageBackground);

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
                <HStack space={2} alignItems={"center"}>
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

            <MapBox markers={filteredCars} />
        </>
    );
}
