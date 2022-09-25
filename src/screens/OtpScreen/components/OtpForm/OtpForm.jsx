import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { Box, HStack, Input, Text, VStack } from "native-base";
import React, { useRef, useState } from "react";

import { Alert, useWindowDimensions } from "react-native";
import apiConfig from "../../../../api_config/ApiConfig";

import GradientBtn from "../../../../components/GradientBtn/GradientBtn";

const inputs = Array(4).fill("");
let newInputIndex = 0;

export default function OtpForm() {
    const navigation = useNavigation();
    const { dialing_code, phone } = useRoute().params;

    const { width } = useWindowDimensions();

    const input = useRef();
    const [nextInputIndex, setNextInputIndex] = useState(0);

    const [otp, setOtp] = useState({ 0: "", 1: "", 2: "", 3: "" });

    const submitOtpHander = () => {
        const OTP = Object.values(otp).join("");

        if (OTP.length < 4) {
            Alert.alert("Invalid OTP", "Please enter a valid OTP");

            return;
        }
        const submitFromData = {
            "dialing_code": dialing_code,
            "phone": phone,
            "otp": OTP
        }
        // otp verification api
        axios.post(`${apiConfig.apiUrl}/otp_verify`, submitFromData)
            .then(res => {
                console.log(res.data);
                // if (res.data.status === "success") {
                // alert("OTP Verified");
                //     navigation.navigate("SelectCitizenShip", { OTP });
                // }
                alert("OTP Verified");
                navigation.navigate("SelectCitizenShip", { OTP });

            })
            .catch(err => {
                console.log(err);
                alert("Opps! Something went wrong");
            })


    };

    // Resend Otp api call
    const handelResendOtp = () => {
        const resendOtpData = {
            "dialing_code": dialing_code,
            "phone": phone
        }
        axios.post(`${apiConfig.apiUrl}/resend_otp`, resendOtpData)
            .then(res => {
                console.log(res.data);
                setOtp({ 0: "", 1: "", 2: "", 3: "" });
                setNextInputIndex(0);
                // alert("OTP Resend");
            })
            .catch(err => {
                console.log(err);
                alert("Opps! Something went wrong");
            })
    }

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
        <VStack
            flex="1"

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
                            ref={nextInputIndex === index ? input : null}
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
