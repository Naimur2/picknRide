import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Input, Text, Toast, VStack } from "native-base";
import React, { useRef, useState } from "react";

import { Alert, useWindowDimensions } from "react-native";
import { scale } from "react-native-size-matters";

import GradientBtn from "@components/GradientBtn/GradientBtn";
import { IRegisterProps } from "@screens/auth-screens/Register/SignUpInputForm/SignUpInputForm.types";
import {
    useOtpVerifyApiMutation,
    useResendOtpApiMutation,
} from "@store/api/v1/authApi/authApiSlice";
import { fontSizes } from "@theme/typography";
import ErrorToast from "../../../../components/ErrorToast/ErrorToast";
import { IOtpVerify } from "../../../../redux/api/v1/authApi/authApiSlice.types";

const inputs = Array(6).fill("");
let newInputIndex = 0;
const INPUT_WIDTH = scale(45) + "px";
const INPUT_HEIGHT = scale(50) + "px";

const INPUT_BORDER_RADIUS = 10;
const INPUT_FONT_SIZE = fontSizes.xs;

interface Iotp {
    [key: number]: string;
}

interface IResendOtpTextProps {
    onResend?: () => void;
    leftText?: string;
    rightText?: string;
}

const ResetOtp = ({
    onResend,
    leftText = "Didn’t receive any code?",
    rightText = "Resend",
}: IResendOtpTextProps) => (
    <HStack my={4} alignItems={"center"} justifyContent="center" space={2}>
        <Text
            color={"gray.100"}
            fontWeight={500}
            fontSize={13}
            _dark={{
                color: "light.100",
            }}
        >
            {leftText}
        </Text>
        <Text
            onPress={onResend}
            color={"gray.200"}
            fontWeight={500}
            fontSize={13}
            _dark={{
                color: "light.100",
            }}
        >
            {rightText}
        </Text>
    </HStack>
);

export default function OtpForm() {
    const navigation = useNavigation();
    const { dialing_code, phone } = useRoute().params as IRegisterProps;
    const [verifyOtp, otpResult] = useOtpVerifyApiMutation();
    const [resendOtp, resendOtpResult] = useResendOtpApiMutation();

    const [showResendOtp, setShowResendOtp] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);

    React.useEffect(() => {
        if (otpResult.data?.status === 400) {
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
        if (resendOtpResult.data?.status === 400) {
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

    const [timer, setTimer] = useState(60);

    React.useEffect(() => {
        if (startTimer && !showResendOtp) {
            setShowResendOtp(false);
            const interval = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);

            if (timer === 0) {
                setShowResendOtp(true);
                setStartTimer(false);
                setTimer(60);
            }
            return () => clearInterval(interval);
        }
    }, [startTimer, timer]);

    console.log("result", otpResult);

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
            dialing_code: dialing_code,
            phone: phone,
            otp: OTP,
        };

        await verifyOtp(submitFromData);
    };

    React.useEffect(() => {
        setStartTimer(true);
    }, []);

    // Resend Otp api call
    const handelResendOtp = async () => {
        const resendOtpData = {
            dialing_code: dialing_code,
            phone: phone,
        };
        setShowResendOtp(false);
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

            {showResendOtp && !startTimer ? (
                <ResetOtp onResend={handelResendOtp} />
            ) : null}
            {startTimer && !showResendOtp ? (
                <ResetOtp
                    onResend={handelResendOtp}
                    leftText={"Retry in"}
                    rightText={` ${timer} seconds`}
                />
            ) : null}

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
