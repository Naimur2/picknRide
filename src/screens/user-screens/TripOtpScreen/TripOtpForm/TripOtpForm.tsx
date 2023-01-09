import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Input, Text, VStack } from "native-base";
import React, { useRef, useState } from "react";

import { Alert, useWindowDimensions } from "react-native";
import { scale } from "react-native-size-matters";

import GradientBtn from "@components/GradientBtn/GradientBtn";
import { useStartCarTripMutation } from "@store/api/v2/tripApi/tripApiSlice";
import { setTripInfo } from "@store/features/car-trip/carTripSlice";
import { ICarTripState } from "@store/features/car-trip/carTripSlice.types";
import { fontSizes } from "@theme/typography";
import { useDispatch } from "react-redux";
import { IStartEndTripParams } from "../../StartEndRide/StartEnTrip.types";

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

export default function TripOtpForm() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [verifyTripOtp, result] = useStartCarTripMutation();
    const params = useRoute().params as IStartEndTripParams;
    console.log("params", params);
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
        try {
            const res = await verifyTripOtp({
                otp: OTP,
                tripToken: params.data.tripToken,
            }).unwrap();

            if (res.succeeded) {
                const tripState: ICarTripState = {
                    tripInfo: params.data,
                    hasStartedJourney: true,
                };
                console.log("tripState", tripState);

                dispatch(setTripInfo(tripState));
                navigation.navigate("MapScreen");
            }
        } catch (error) {
            alert("Invalid OTP");
        }
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
        input?.current?.focus?.();
    }, [nextInputIndex]);

    React.useEffect(() => {
        input?.current?.focus?.();
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

            <GradientBtn
                disabled={OTP.length !== 6 || result.isLoading}
                mt={10}
                onPress={submitOtpHander}
                title={"Submit"}
            />
        </VStack>
    );
}