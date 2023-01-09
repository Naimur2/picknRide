import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation } from "@react-navigation/native";
import { fontSizes } from "@theme/typography";
import { Text, VStack, useColorMode } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import GradientBtn from "../../../components/GradientBtn/GradientBtn";

export default function SelectOtpType() {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();
    const inset = useSafeAreaInsets();

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
                        Request OTP
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
                        Select method to receive OTP
                    </Text>
                </VStack>

                <VStack
                    space="4"
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <GradientBtn title="OTP via Email" />
                    <GradientBtn title="OTP via Whatsapp" />
                    <GradientBtn title="OTP via Whatsapp" />
                </VStack>
            </Scroller>
        </ImageBg>
    );
}
