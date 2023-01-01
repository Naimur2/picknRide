import clockFill from "@assets/images/clock-fill.png";
import locationFilled from "@assets/images/location-filled.png";
import locationOutline from "@assets/images/location-outline.png";
import CModal from "@components/CModal/CModal";
import H3 from "@components/H3/H3";
import { Box, Center, HStack, Image, VStack } from "native-base";
import React from "react";
import { Text } from "react-native";
import { Rating } from "react-native-ratings";
import { scale } from "react-native-size-matters";
import MarkerBar from "../../../LocationMarker/LocationMarker";

export default function RideCompleteModal({ isOpen, onClose }) {
    return (
        <CModal
            isOpen={isOpen}
            p="0"
            _dark={{
                bg: "dark.100",
            }}
            onClose={onClose}
        >
            <VStack bg="primary.100" w="100%" p={2}>
                <Text
                    fontSize={scale(16)}
                    fontWeight={700}
                    textAlign={"center"}
                    color="#fff"
                >
                    Ride completed
                </Text>
            </VStack>
            <VStack>
                <HStack alignItems={"center"}>
                    <MarkerBar justifyContent="center" alignItems="center" />
                    <H3 fontSize={scale(14)}>Ride Parked Successfully</H3>
                </HStack>
            </VStack>

            <VStack w={"full"} px={8}>
                <HStack space={8}>
                    <Text
                        fontSize={scale(13)}
                        fontWeight={500}
                        color="gray.100"
                        _dark={{
                            color: "#fff",
                        }}
                        w="20%"
                    >
                        Start
                    </Text>
                    <HStack space={4} w="80%">
                        <Center
                            borderRadius={50}
                            h={"30px"}
                            w={"30px"}
                            bg="red.100"
                            borderWidth={2}
                            borderColor="#fff"
                        >
                            <Image
                                w="12px"
                                resizeMode="contain"
                                source={locationOutline}
                                alt="loc"
                                tintColor={"#fff"}
                            />
                        </Center>
                        <Text
                            fontSize={scale(13)}
                            fontWeight={500}
                            color="gray.100"
                            _dark={{
                                color: "#fff",
                            }}
                            maxW="150px"
                        >
                            Masraf Al-Rayan Building
                        </Text>
                    </HStack>
                </HStack>

                <HStack>
                    <VStack>
                        <Box
                            ml={"60%"}
                            mt={-4}
                            h="60px"
                            w="5px"
                            bg="primary.100"
                        />
                    </VStack>
                </HStack>

                <HStack space={8}>
                    <Text
                        fontSize={scale(13)}
                        fontWeight={500}
                        color="gray.100"
                        _dark={{
                            color: "#fff",
                        }}
                        w="20%"
                    >
                        End
                    </Text>
                    <HStack space={4} w={"80%"}>
                        <Center
                            borderRadius={50}
                            h={"30px"}
                            w={"30px"}
                            bg="primary.100"
                            borderWidth={2}
                            borderColor="#fff"
                        >
                            <Image
                                w="12px"
                                resizeMode="contain"
                                source={locationOutline}
                                alt="loc"
                                tintColor={"#fff"}
                            />
                        </Center>
                        <Text
                            fontSize={scale(13)}
                            fontWeight={500}
                            color="gray.100"
                            _dark={{
                                color: "#fff",
                            }}
                            maxW="150px"
                        >
                            Al Wakra
                        </Text>
                    </HStack>
                </HStack>
            </VStack>

            <HStack mt={4} w="100%" py={4} pr={6}>
                <HStack
                    borderRadius={14}
                    py={2}
                    px={4}
                    bg={"primary.100"}
                    position="relative"
                    ml={1}
                    alignItems="center"
                    ml={"40px"}
                >
                    <VStack
                        h={"35px"}
                        w={"45px"}
                        shadow={9}
                        bg={"#fff"}
                        borderRadius={"10px"}
                        alignItems="center"
                        justifyContent="center"
                        ml={"-40px"}
                        mr={"8px"}
                    >
                        <Image
                            h="20px"
                            w="20px"
                            source={locationFilled}
                            alt="icon"
                            resizeMode="contain"
                        />
                    </VStack>
                    <VStack>
                        <Text
                            fontWeight={700}
                            fontSize={scale(16)}
                            color={"#fff"}
                        >
                            28 km
                        </Text>
                        <Text
                            fontWeight={500}
                            fontSize={scale(10)}
                            color={"#fff"}
                        >
                            Distance
                        </Text>
                    </VStack>
                </HStack>
                <HStack
                    borderRadius={14}
                    py={2}
                    px={4}
                    bg={"primary.100"}
                    position="relative"
                    ml={"40px"}
                    alignItems="center"
                >
                    <VStack
                        h={"35px"}
                        w={"45px"}
                        shadow={9}
                        bg={"#fff"}
                        borderRadius={"10px"}
                        alignItems="center"
                        justifyContent="center"
                        ml={"-40px"}
                        mr={"8px"}
                    >
                        <Image
                            h="20px"
                            w="20px"
                            source={clockFill}
                            alt="icon"
                            resizeMode="contain"
                        />
                    </VStack>
                    <VStack>
                        <Text
                            fontWeight={700}
                            fontSize={scale(16)}
                            color={"#fff"}
                        >
                            15 min
                        </Text>
                        <Text
                            fontWeight={500}
                            fontSize={scale(10)}
                            color={"#fff"}
                        >
                            Time
                        </Text>
                    </VStack>
                </HStack>
            </HStack>

            <H3 pt={4} fontSize={scale(15) + "px"}>
                How was your trip?
            </H3>
            <VStack py={2} bg="#fff" w="full">
                <Rating
                    count={5}
                    defaultRating={3}
                    imageSize={20}
                    ratingColor="#52BF04"
                    style={{
                        backgroundColot: "transparent",
                    }}
                    ratingContainerStyle={{
                        backgroundColor: "transparent",
                    }}
                />
            </VStack>
        </CModal>
    );
}
