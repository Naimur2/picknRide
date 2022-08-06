import { useColorMode } from "native-base";
import React from "react";
import { Text } from "react-native";
import ImageBg from "../../components/ImageBg/ImageBg";

export default function Register() {
    const { colorMode } = useColorMode();

    return (
        <ImageBg type={colorMode}>
            <Text>Register</Text>
        </ImageBg>
    );
}
