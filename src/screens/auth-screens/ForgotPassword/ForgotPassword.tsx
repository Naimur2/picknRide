import GradientBtn from "@components/GradientBtn/GradientBtn";
import TextInput from "@components/TextInput/TextInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fontSizes } from "@theme/typography";
import { HStack, Text, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import ScreenWithScrollImage from "./ScreenWithScrollImage";
import PickCountry from "@components/PickCountry/PickCountry";
import { ISelectAuthTypeParams } from "../SelectAuthOtpType/SelectAuthOtpType.types";

export default function ForgotPassword() {
    const navigation = useNavigation();
    const params = useRoute().params as ISelectAuthTypeParams;

    const [phone, setPhone] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [dialingCode, setDialingCode] = React.useState("");

    console.log(params);

    return (
        <ScreenWithScrollImage>
            <VStack alignItems={"center"} space="4">
                <Text
                    mt={scale(30) + "px"}
                    color="primary.200"
                    fontSize={fontSizes.md}
                    fontWeight="bold"
                >
                    Forgot Password
                </Text>
                <Text
                    color="gray.100"
                    fontSize={scale(13) + "px"}
                    fontWeight="500"
                    textAlign={"center"}
                    _dark={{
                        color: "light.200",
                    }}
                >
                    Please enter your {params?.validationType === "email"}. We
                    will send you An email containing a recovery link to set an
                    new password for your account.
                </Text>
            </VStack>

            <PickCountry
                mt={10}
                setPhoneInfo={(phoneInfo) => {
                    setPhone(phoneInfo?.phoneNumber);
                    setCountry(phoneInfo?.countryCode);
                    setDialingCode(phoneInfo?.dialingCode.slice(1));
                }}
            />

            <GradientBtn
                gradientStyle={{ maxWidth: 250 }}
                title={"Log In"}
                mx={"auto"}
                mt={4}
            />

            <HStack
                my={10}
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
        </ScreenWithScrollImage>
    );
}
