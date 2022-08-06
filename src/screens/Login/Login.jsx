import { Center, Input, Text, useColorMode, VStack } from "native-base";
import React from "react";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "./../../components/Scroller/Scroller";

export default function Login() {
    const { colorMode } = useColorMode();
    return (
        <ImageBg type={colorMode}>
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 40,
                    paddingVertical: 20,
                }}
            >
                <VStack alignItems={"center"} space="4">
                    <Text
                        mt={"16"}
                        color="primary.200"
                        fontSize={17}
                        fontWeight="bold"
                    >
                        Login
                    </Text>
                    <Text
                        color="gray.100"
                        fontSize={13}
                        fontWeight="500"
                        w="170"
                        textAlign={"center"}
                    >
                        Enter your login details toaccess your account
                    </Text>
                </VStack>
                <VStack mt={10} space={4}>
                    <Input
                        borderWidth={0}
                        bg="white"
                        shadow="4"
                        px={6}
                        py={6}
                        borderRadius={20}
                        placeholder="Enter email"
                        _focus={{
                            bg: "white",
                        }}
                        color="gray.200"
                        fontSize={14}
                        fontWeight="500"
                        placeholderTextColor="gray.300"
                    />
                    <Input
                        borderWidth={0}
                        bg="white"
                        shadow="4"
                        px={6}
                        py={6}
                        borderRadius={20}
                        placeholder="Enter email"
                        _focus={{
                            bg: "white",
                        }}
                        color="gray.200"
                        fontSize={14}
                        fontWeight="500"
                        placeholderTextColor="gray.300"
                    />
                </VStack>
            </Scroller>
        </ImageBg>
    );
}
