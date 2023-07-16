import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation } from "@react-navigation/native";
import {
    useAppleSignInMutation,
    useGoogleSignInMutation,
} from "@store/api/v2/authorizationApi";
import { fontSizes } from "@theme/typography";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { HStack, Text, VStack, useColorMode } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import SignInInputForm from "./SignInInputForm/SignInInputForm";
import SocialButton from "./SocialButton/SocialButton";

export default function Login({ route }) {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();
    const inset = useSafeAreaInsets();
    const dispatch = useDispatch();
    const params = route.params as { data: string };

    const [googleSignInFn, googleSignInResult] = useGoogleSignInMutation();
    const [appleSignInFn, appleSignInInResult] = useAppleSignInMutation();

    const googleSignIn = async () => {
        try {
            const data = await googleSignInFn(undefined).unwrap();
            const { authUrl } = data?.data;
            console.log(authUrl);
            const redirectUrl = authUrl?.split("redirect_uri=")[1];
            const baseUrl = authUrl
                ?.split("redirect_uri=")[0]
                .replace(" ", "%20");
            const authUrlWithoutSpace = authUrl?.replace(" ", "%20");
            const linkingUrl = Linking.createURL(redirectUrl, {
                scheme: "picknride",
            });
            const baseUrlWithlinkingUrl =
                baseUrl + "redirect_uri=" + linkingUrl;

            // Open the browser
            console.log(linkingUrl);
            // const { type, url } = await WebBrowser.openAuthSessionAsync(
            //     authUrlWithoutSpace,
            //     redirectUrl
            // );
            navigation.navigate("RedirectionWebview", {
                url: baseUrlWithlinkingUrl,
                previousRoute: "Login",
                callBackUrl: redirectUrl,
            });
            // console.log({ type, url });
        } catch (error) {
            console.log({ error });
        }
    };
    const appleSignIn = async () => {
        try {
            const data = await appleSignInFn(undefined).unwrap();
            console.log(data);
            const { authUrl } = data?.data;
            if (authUrl) {
                const authUrlWithoutSpace = authUrl?.replace(" ", "%20");
                const redirectUrl = authUrl?.split("redirect_uri=")[1];
                const baseUrl = authUrl
                    ?.split("redirect_uri=")[0]
                    .replace(" ", "%20");

                navigation.navigate("RedirectionWebview", {
                    url: baseUrl + "redirect_uri=" + redirectUrl,
                    previousRoute: "Login",
                    callBackUrl: redirectUrl,
                });
            } else {
                alert("Something went wrong");
            }
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
                    <SocialButton type={"apple"} onPress={appleSignIn} />
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
