import React from "react";
import loader from "@assets/lottie/pic-loading.json";
import LottieView from "lottie-react-native";

export default function LoadingView() {
    return (
        <LottieView
            style={{
                width: 150,
                height: 150,
            }}
            source={loader}
            autoPlay
            loop
        />
    );
}
