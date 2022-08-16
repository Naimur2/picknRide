import { Factory } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";
const imageeBg = require("../../../assets/images/background-map.png");
const imageeBgDark = require("../../../assets/images/background-map-dark.png");
const imageeBgLight = require("../../../assets/images/background-map-light.png");
const bg = require("../../../assets/images/bg.png");

function ImageBg({ children, type, ...rest }) {
    const ImageBack = Factory(ImageBackground);
    const image = type && type === "dark" ? imageeBgDark : imageeBgLight;

    return (
        <ImageBack
            tintColor={"amber.100"}
            source={type ? image : imageeBg}
            flex="1"
            {...rest}
        >
            {children}
        </ImageBack>
    );
}

export default React.memo(ImageBg);
