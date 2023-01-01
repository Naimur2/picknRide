import { HStack, Image, Pressable, Text } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import fb from "@assets/images/facebook.png";
import google from "@assets/images/google.png";

export default function SocialButton({ type, onPress, ...rest }) {
    return (
        <Pressable
            onPress={onPress}
            {...rest}
            alignItems="center"
            mx={"auto"}
            w="100%"
        >
            <HStack
                alignItems="center"
                bg={type === "facebook" ? "blue.100" : "red.100"}
                px={6}
                py={4}
                borderRadius={20}
                space="6"
                width={"100%"}
                maxWidth={[400, null, null, 300]}
            >
                <Image
                    source={type === "facebook" ? fb : google}
                    alt="facebook"
                    height={scale(20) + "px"}
                    width={scale(20) + "px"}
                />
                <Text
                    fontWeight={500}
                    fontSize={scale(13) + "px"}
                    mx={"auto"}
                    color="#fff"
                >
                    Continue with {type === "facebook" ? "Facebook" : "Google"}
                </Text>
            </HStack>
        </Pressable>
    );
}
