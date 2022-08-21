import SwipeButton from "rn-swipe-unlock-button";
import React from "react";
import swipe from "../../../assets/images/swipe.png";
import { Image } from "native-base";

export default function SwitchToUnlock() {
    const [message, setMessage] = React.useState("");

    return (
        <SwipeButton
            enableReverseSwipe
            thumbIconBackgroundColor="#1F9E09"
            thumbIconComponent={() => <Image source={swipe} alt="swipe" />}
            title="Slide to unlock"
            onSwipeSuccess={() => setMessage("Slide success!")}
            containerStyle={{
                borderWidth: 0,
                borderRadius: 50,
            }}
            railBackgroundColor="#52BF04"
            railStyles={{
                borderRadius: 20,
                overflow: "hidden",
            }}
            titleColor="#fff"
            railBorderColor="#52BF04"
            railFillBackgroundColor="#E50000"
            railFillBorderColor="#E50000"
        />
    );
}
