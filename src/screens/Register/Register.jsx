import { useNavigation } from "@react-navigation/native";
import { HStack, Text, useColorMode, VStack } from "native-base";
import React from "react";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import InputForm from "./components/InputForm/InputForm";

export default function Register() {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();

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
                        mt={"30px"}
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
                    my={4}
                    alignItems={"center"}
                    justifyContent="center"
                    space={2}
                >
                    <Text
                        color={"gray.100"}
                        fontWeight={500}
                        fontSize={13}
                        _dark={{
                            color: "light.100",
                        }}
                    >
                        Need an account?
                    </Text>
                    <Text
                        onPress={() => navigation.navigate("Register")}
                        color={"gray.200"}
                        fontWeight={500}
                        fontSize={13}
                        _dark={{
                            color: "light.100",
                        }}
                    >
                        Sign Up
                    </Text>
                </HStack>
            </Scroller>
        </ImageBg>
    );
}
