import { useColorMode } from "native-base";
import React from "react";
import { Text } from "react-native";
import ImageBg from "../../components/ImageBg/ImageBg";

export default function Login() {
    const { colorMode } = useColorMode();
    return (
        <ImageBg type={colorMode}>
            <Text>Login</Text>
        </ImageBg>
    );
}
