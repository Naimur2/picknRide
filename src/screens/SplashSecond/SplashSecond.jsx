import { useNavigation } from "@react-navigation/native";
import { Pressable, Text } from "native-base";
import React from "react";
import ImageBg from "../../components/ImageBg/ImageBg";
import Logo from "../../svgs/Logo";
import Next from "../../svgs/Next";
import Scroller from "./../../components/Scroller/Scroller";

export default function SplashSecond() {
    const navigation = useNavigation();
    return (
        <Scroller
            contentContainerStyle={{
                flexGrow: 1,
            }}
        >
            <ImageBg justifyContent={"center"} alignItems={"center"}>
                <Logo />
                <Text
                    mt={"30%"}
                    textAlign={"center"}
                    fontSize="15"
                    maxW={270}
                    color="white"
                    fontWeight={"400"}
                >
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Minus obcaecati sint dolore modi doloremque ducimus porro!
                    Distinctio ut quo velit.{" "}
                </Text>
                <Pressable
                    mt="30%"
                    onPress={() => navigation.navigate("SplashThird")}
                >
                    <Next />
                </Pressable>
            </ImageBg>
        </Scroller>
    );
}
