import { useColorMode } from "native-base";
import React from "react";
import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";

import OtpForm from "./OtpForm/OtpForm";

export default function OtpScreen({}) {
    const { colorMode } = useColorMode();

    return (
        <Scroller
            contentStyle={{
                flexGrow: 1,
            }}
        >
            <ImageBg type={colorMode}>
                <OtpForm />
            </ImageBg>
        </Scroller>
    );
}
