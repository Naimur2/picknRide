import { useNavigation } from "@react-navigation/native";
import { Pressable } from "native-base";
import React from "react";
import { ChevronLeft } from "../Icons/Icons";

export default function BackButton() {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft px="2" />
        </Pressable>
    );
}
