import { Factory } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";
import imageeBg from "../../../assets/images/background-map.png";
import imageeBgDark from "../../../assets/images/background-map-dark.png";
import imageeBgLight from "../../../assets/images/background-map-light.png";

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
