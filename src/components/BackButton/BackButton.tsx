import { useNavigation } from "@react-navigation/native";
import { Pressable } from "native-base";
import React from "react";
import { ChevronLeft } from "../Icons/Icons";

export default function BackButton({ onPress, color }) {
    const navigation = useNavigation();
    const goBack = () => navigation.goBack();

    return (
        <Pressable onPress={onPress || goBack}>
            <ChevronLeft px="1" color={color || "#000"} />
        </Pressable>
    );
}
