import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Input, Text, useColorMode, VStack } from "native-base";
import React, { useEffect, useRef, useState } from "react";

import { Alert, useWindowDimensions } from "react-native";

import GradientBtn from "../../components/GradientBtn/GradientBtn";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "./../../components/Scroller/Scroller";

const inputs = Array(4).fill("");
let newInputIndex = 0;

export default function OtpScreen({}) {
    const navigation = useNavigation();

    const { width } = useWindowDimensions();
    const { colorMode } = useColorMode();

    const input = useRef();
    const [nextInputIndex, setNextInputIndex] = useState(0);

    const [otp, setOtp] = useState({ 0: "", 1: "", 2: "", 3: "" });

    const submitOtpHander = () => {
        const OTP = Object.values(otp).join("");

        if (OTP.length < 4) {
            Alert.alert("Invalid OTP", "Please enter a valid OTP");

            return;
        }

        navigation.navigate("SelectCitizenShip", { OTP });
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

    useEffect(() => {
        input.current.focus();
    }, [nextInputIndex]);

    useEffect(() => {
        input.current.focus();
    }, []);

    return (
        <ImageBg type={colorMode}>
            <Scroller>
                <VStack
                    flex="1"
                    justifyContent={"center"}
                    px={4}
                    space="3"
                    alignItems={"center"}
                >
                    <Text
                        fontSize={"17"}
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
                    <HStack mb={4} justifyContent="space-around" space="4">
                        {inputs.map((val, index) => (
                            <Box
                                shadow={9}
                                w={"70px"}
                                key={index.toString()}
                                bg={otp[index] ? "primary.100" : "white"}
                                h={"70px"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                borderRadius={"20px"}
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
                                    ref={
                                        nextInputIndex === index ? input : null
                                    }
                                    type="number"
                                    fontSize={17}
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
                            onPress={() => navigation.navigate("Register")}
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
            </Scroller>
        </ImageBg>
    );
}
