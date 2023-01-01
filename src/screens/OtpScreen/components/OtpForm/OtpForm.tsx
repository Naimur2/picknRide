import { useNavigation, useRoute } from "@react-navigation/native";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Box, HStack, Input, Text, VStack } from "native-base";
import React, { useRef, useState } from "react";

import { Alert, useWindowDimensions } from "react-native";
import { scale } from "react-native-size-matters";
import apiConfig from "../../../../api_config/ApiConfig";

import GradientBtn from "../../../../components/GradientBtn/GradientBtn";
import { fontSizes } from "../../../../theme-config/typography";
import { IRegisterProps } from "../../../Register/components/SignUpInputForm/SignUpInputForm.types";

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
    const { dialing_code, phone } = useRoute().params as IRegisterProps;

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

    const submitOtpHander = async () => {
        const OTP = Object.values(otp).join("");

        if (OTP.length < 4 && typeof OTP !== "number") {
            Alert.alert("Invalid OTP", "Please enter a valid OTP");

            return;
        }
        const submitFromData = {
            dialing_code: dialing_code,
            phone: phone,
            otp: OTP,
        };
        // otp verification api
        try {
            const res: AxiosResponse = axios.post(
                `${apiConfig.apiUrl}/otp_verify`,
                submitFromData
            );
            if (res.data && res.status === 200) {
                console.log(res.data);
                navigation.navigate("SelectCitizenShip", { OTP });
            } else {
                console.log(res.data);
                Alert.alert("Error", "Invalid OTP");
                navigation.navigate("SelectCitizenShip", { OTP });
            }
        } catch (error) {
            alert(error);
        }
    };

    // Resend Otp api call
    const handelResendOtp = () => {
        const resendOtpData = {
            dialing_code: dialing_code,
            phone: phone,
        };
        axios
            .post(`${apiConfig.apiUrl}/resend_otp`, resendOtpData)
            .then((res) => {
                console.log(res.data);
                setOtp({ 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" });
                setNextInputIndex(0);
                // alert("OTP Resend");
            })
            .catch((err) => {
                console.log(err);
                alert("Opps! Something went wrong");
            });
    };

    const textChangeHandler = (text, index) => {
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
                    I didn’t receive the code,
                </Text>
                <Text
                    onPress={() => handelResendOtp()}
                    color={"gray.200"}
                    fontWeight={500}
                    fontSize={13}
                    _dark={{
                        color: "light.100",
                    }}
                >
                    Resend{" "}
                </Text>
            </HStack>

            <GradientBtn onPress={submitOtpHander} title={"Continue"} />
        </VStack>
    );
}
