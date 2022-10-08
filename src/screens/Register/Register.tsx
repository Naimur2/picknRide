import { HStack, Image, Text, useColorMode, VStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { Telephone, Whatsapp } from "../../components/Icons/Icons";
import Scroller from "../../components/Scroller/Scroller";
import InputForm from "./components/InputForm/InputForm";

import dark from "../../../assets/images/background-map-dark.png";
import light from "../../../assets/images/background-map-light.png";
import { fontSizes } from "../../theme-config/typography";

export default function Register() {
    const { colorMode } = useColorMode();

    const insets = useSafeAreaInsets();

    return (
        <>
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                    alignItems: "center",
                }}
            >
                <Image
                    source={colorMode === "dark" ? dark : light}
                    h="full"
                    w="full"
                    alt="map"
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                />
                <VStack maxW={scale(320) + "px"} w="full" px={4} py={5}>
                    <VStack alignItems={"center"} space="3">
                        <Text
                            color="primary.200"
                            fontSize={17}
                            fontWeight="bold"
                        >
                            Sign Up
                        </Text>
                        <Text
                            color="gray.100"
                            fontSize={13}
                            fontWeight="500"
                            w="180"
                            textAlign={"center"}
                            _dark={{
                                color: "light.200",
                            }}
                        >
                            Enter your Sign Up details to Create your account
                        </Text>
                    </VStack>
                    <InputForm />
                    <HStack
                        alignItems={"center"}
                        mt={4}
                        py={4}
                        justifyContent={"space-between"}
                    >
                        <HStack alignItems={"center"} space="2">
                            <Whatsapp color="primary.100" />
                            <Text
                                fontSize={fontSizes.xs}
                                fontWeight={500}
                                color={"gray.100"}
                            >
                                Whatsapp
                            </Text>
                        </HStack>
                        <HStack alignItems={"center"} space="2">
                            <Telephone color="primary.100" />
                            <Text
                                fontSize={fontSizes.xs}
                                fontWeight={500}
                                color={"gray.100"}
                            >
                                +974 0000 0000
                            </Text>
                        </HStack>
                    </HStack>
                </VStack>
            </Scroller>
        </>
    );
}
