import { useNavigation } from "@react-navigation/native";
import { HStack, Text, useColorMode, VStack } from "native-base";
import React from "react";
import { AsyncStorage } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import { fontSizes } from "../../theme-config/typography";
import InputForm from "./components/InputForm/InputForm";
import SocialButton from "./components/SocialButton/SocialButton";

export default function Login() {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    // store data in async storage
    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem("user", value);
        } catch (e) {
            // saving error
        }
    };

    return (
        <ImageBg type={colorMode}>
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 30,

                    paddingBottom: 20,
                }}
            >
                <VStack alignItems={"center"} space="4">
                    <Text
                        mt={scale(30) + "px"}
                        color="primary.200"
                        fontSize={fontSizes.md}
                        fontWeight="bold"
                    >
                        Login
                    </Text>
                    <Text
                        color="gray.100"
                        fontSize={scale(13) + "px"}
                        fontWeight="500"
                        w={scale(170) + "px"}
                        textAlign={"center"}
                        _dark={{
                            color: "light.200",
                        }}
                    >
                        Enter your login details toaccess your account
                    </Text>
                </VStack>

                <InputForm />

                <VStack space={4} mt={6}>
                    <SocialButton
                        type={"facebook"}
                        onPress={() => console.log("log")}
                    />
                    <SocialButton
                        type={"google"}
                        onPress={() => console.log("log")}
                    />
                </VStack>

                <HStack
                    my={4}
                    alignItems={"center"}
                    justifyContent="center"
                    space={2}
                >
                    <Text
                        color={"gray.100"}
                        fontWeight={500}
                        fontSize={scale(13) + "px"}
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
                        fontSize={scale(13) + "px"}
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
