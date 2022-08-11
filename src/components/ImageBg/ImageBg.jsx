import { Factory, Image, Stack } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";
const imageeBg = require("../../../assets/images/background-map.png");
const imageeBgDark = require("../../../assets/images/background-map-dark.png");
const imageeBgLight = require("../../../assets/images/background-map-light.png");

function ImageBg({ children, type, ...rest }) {
    const ImageBack = Factory(ImageBackground);
    const image = type && type === "dark" ? imageeBgDark : imageeBgLight;

    const DarkImage = () => (
        <Image
            position={"absolute"}
            alt="dark"
            h="full"
            w="full"
            source={imageeBgDark}
            {...rest}
        />
    );

    const LightImage = () => (
        <Image
            position={"absolute"}
            alt="light"
            h="full"
            w="full"
            source={imageeBgLight}
            {...rest}
        />
    );

    const NormalImage = () => (
        <Image
            position={"absolute"}
            alt="light"
            h="full"
            w="full"
            source={imageeBg}
            {...rest}
        />
    );

    return (
        <Stack flex="1" position="relative" {...rest}>
            {type === "dark" && <DarkImage />}
            {type === "light" && <LightImage />}
            {type !== "dark" && type !== "light" && <NormalImage />}
            {children}
        </Stack>
    );
}

export default React.memo(ImageBg);
