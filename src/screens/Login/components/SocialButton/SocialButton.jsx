import { HStack, Image, Pressable, Text } from "native-base";
import React from "react";
const fb = require("../../../../../assets/images/facebook.png");
const google = require("../../../../../assets/images/google.png");

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
                py={5}
                borderRadius={20}
                space="6"
                width={"100%"}
                maxWidth={[400, null, null, 300]}
            >
                <Image
                    source={type === "facebook" ? fb : google}
                    alt="facebook"
                />
                <Text fontWeight={500} fontSize={15} mr={"auto"} color="#fff">
                    Continue with {type === "facebook" ? "Facebook" : "Google"}
                </Text>
            </HStack>
        </Pressable>
    );
}
