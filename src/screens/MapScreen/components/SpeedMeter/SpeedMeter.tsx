import { Factory, Text } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";
import speedMeter from "../../../../../assets/images/progress.png";

function SpeedMeter() {
    const ImageBg = Factory(ImageBackground);

    return (
        <ImageBg
            source={speedMeter}
            height={"70px"}
            width={"70px"}
            alignItems={"center"}
            justifyContent={"center"}
            my="auto"
            ml={6}
        >
            <Text lineHeight={24} color="#000" fontSize={"24"} fontWeight={700}>
                50
            </Text>
            <Text lineHeight={7} color="#000" fontSize={"7"} fontWeight={600}>
                km/h
            </Text>
        </ImageBg>
    );
}

export default React.memo(SpeedMeter);