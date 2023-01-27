import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Input, Text, Toast, VStack } from "native-base";
import React, { useRef, useState } from "react";

import { Alert, useWindowDimensions } from "react-native";
import { scale } from "react-native-size-matters";

import ErrorToast from "@components/ErrorToast/ErrorToast";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import { IRegisterProps } from "@screens/auth-screens/Register/SignUpInputForm/SignUpInputForm.types";
import {
    useOtpVerifyApiMutation,
    useResendOtpApiMutation,
} from "@store/api/v1/authApi/authApiSlice";
import { IOtpVerify } from "@store/api/v1/authApi/authApiSlice.types";
import { setCheckOtherInformation } from "@store/features/auth/authSlice";
import { fontSizes } from "@theme/typography";
import { useDispatch } from "react-redux";
import ResetOtp from "./ResendOtp";

const inputs = Array(6).fill("");
let newInputIndex = 0;
const INPUT_WIDTH = scale(45) + "px";
const INPUT_HEIGHT = scale(50) + "px";

const INPUT_BORDER_RADIUS = 10;
const INPUT_FONT_SIZE = fontSizes.xs;

interface Iotp {
    [key: number]: string;
}

export default function OtpForm() {
    const navigation = useNavigation();
    const routeParams = useRoute().params as IRegisterProps;
    const [verifyOtp, otpResult] = useOtpVerifyApiMutation();
    const [resendOtp, resendOtpResult] = useResendOtpApiMutation();
    const dispatch = useDispatch();

    console.log(otpResult);

    console.log("routeParams", routeParams);

    const [startTimer, setStartTimer] = useState(false);

    React.useEffect(() => {
        if (
            otpResult.data?.status === 400 ||
            otpResult.data?.status === 500 ||
            otpResult.isError
        ) {
            Toast.show({
                id: "otpError",
                render: () => (
                    <ErrorToast
                        message={
                            otpResult.data?.message || "Something went wrong"
                        }
                    />
                ),
                placement: "top",
            });
        }
        if (
            resendOtpResult.data?.status === 400 ||
            resendOtpResult.data?.status === 500 ||
            resendOtpResult.isError
        ) {
            Toast.show({
                id: "otpError",
                render: () => (
                    <ErrorToast
                        message={
                            resendOtpResult.data?.message ||
                            "Something went wrong"
                        }
                    />
                ),
                placement: "top",
            });
        }
    }, [otpResult.data, resendOtpResult.data]);

    const { width } = useWindowDimensions();

    const input = useRef();
    const [nextInputIndex, setNextInputIndex] = useState(0);

    const [otp, setOtp] = useState<Iotp>({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
    });

    const OTP = Object.values(otp).join("");

    const submitOtpHander = async () => {
        if (OTP.length < 4 && typeof OTP !== "number") {
            Alert.alert("Invalid OTP", "Please enter a valid OTP");

            return;
        }
        const submitFromData: IOtpVerify = {
            dialing_code: routeParams?.dialing_code,
            phone: routeParams?.phone,
            otp: OTP,
        };
        console.log({ submitFromData });

        try {
            const data = await verifyOtp(submitFromData).unwrap();
            console.log(data?.data);

            if (data?.status === 200) {
                if (
                    data?.data?.resident_status === "0" &&
                    data?.data?.userdocuments_status === "0" &&
                    data?.data?.card_status === "0"
                ) {
                    navigation.navigate("SelectCitizenShip");
                } else {
                    dispatch(setCheckOtherInformation(true));
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        setStartTimer(true);
    }, []);

    // Resend Otp api call
    const handelResendOtp = async () => {
        const resendOtpData = {
            dialing_code: routeParams?.dialing_code,
            phone: routeParams?.phone,
        };
        setOtp({
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
        });
        setStartTimer(true);
        await resendOtp(resendOtpData);
    };

    const textChangeHandler = (text: string, index: string | number) => {
        // TODO: add only number

        const newOtp = { ...otp };
        newOtp[index] = text;
        setOtp(newOtp);
        const lastInputIndex = inputs.length - 1;
        if (!text) newInputIndex = index === 0 ? 0 : index - 1;
        else
            newInputIndex =
                index === lastInputIndex ? lastInputIndex : index + 1;
        setNextInputIndex(newInputIndex);
    };

    React.useEffect(() => {
        input.current.focus();
    }, [nextInputIndex]);

    React.useEffect(() => {
        input.current.focus();
    }, []);

    return (
        <VStack flex="1" px={4} space="3" alignItems={"center"}>
            <Text
                fontSize={fontSizes.md}
                color="primary.200"
                mt={Math.round(width / 2.5)}
                mx="auto"
                fontWeight={700}
                maxW={220}
                textAlign={"center"}
            >
                Verify your number with codes sent to you
            </Text>
            <Text fontSize={"sm"} color="blue" mb="4" mx="auto"></Text>
            <HStack mb={4} justifyContent="space-around" space="2">
                {inputs.map((val, index) => (
                    <Box
                        shadow={5}
                        w={INPUT_WIDTH}
                        key={index.toString() + "otp"}
                        bg={otp[index] ? "primary.100" : "white"}
                        h={INPUT_HEIGHT}
                        alignItems={"center"}
                        justifyContent={"center"}
                        borderRadius={INPUT_BORDER_RADIUS}
                    >
                        <Input
                            maxLength={1}
                            textAlign="center"
                            value={otp[index]}
                            onChangeText={(text) =>
                                textChangeHandler(text, index)
                            }
                            bg="transparent"
                            _focus={{
                                bg: "transparent",
                            }}
                            borderWidth={0}
                            px="3"
                            mx="2"
                            keyboardType="numeric"
                            ref={nextInputIndex === index ? input : null}
                            fontSize={INPUT_FONT_SIZE}
                            fontWeight={700}
                            color={otp[index] ? "white" : "black"}
                        />
                    </Box>
                ))}
            </HStack>

            <ResetOtp
                onResend={handelResendOtp}
                startTimer={startTimer}
                setStartTimer={(val) => setStartTimer(val)}
            />

            <GradientBtn
                disabled={
                    OTP.length !== 6 ||
                    otpResult.isLoading ||
                    resendOtpResult.isLoading
                }
                mt={10}
                onPress={submitOtpHander}
                title={"Submit"}
            />
        </VStack>
    );
}
