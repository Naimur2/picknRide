import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation } from "@react-navigation/native";
import { HStack, Text, VStack, useColorMode } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import { fontSizes } from "@theme/typography";
import SignInInputForm from "./SignInInputForm/SignInInputForm";
import SocialButton from "./SocialButton/SocialButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGoogleSignInMutation } from "@store/api/v2/authorizationApi";
import * as WebBrowser from "expo-web-browser";
import { useDispatch } from "react-redux";
import { login } from "@store/features/auth/authSlice";

export default function Login() {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();
    const inset = useSafeAreaInsets();
    const dispatch = useDispatch();

    const [googleSignInFn, googleSignInResult] = useGoogleSignInMutation();

    const googleSignIn = async () => {
        try {
            const data = await googleSignInFn(undefined).unwrap();
            const { authUrl } = data?.data;
            console.log(authUrl);
            const authUrlWithoutSpace = authUrl?.replace(" ", "%20");
            const redirectUrl = authUrl?.split("redirect_uri=")[1];

            const result = await WebBrowser.openAuthSessionAsync(
                authUrlWithoutSpace,
                redirectUrl
            );
            dispatch(login(result));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ImageBg type={colorMode}>
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 30,
                    paddingTop: inset.top + 20,
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

                <SignInInputForm />

                <VStack space={4} mt={6}>
                    <SocialButton
                        type={"facebook"}
                        onPress={() => console.log("log")}
                    />
                    <SocialButton type={"google"} onPress={googleSignIn} />
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
