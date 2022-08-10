import { useNavigation } from "@react-navigation/native";
import { Pressable } from "native-base";
import React from "react";
import useUI from "../../hooks/useUI";
import { ChevronLeft } from "../Icons/Icons";

export default function BackButton() {
    const ui = useUI();
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft px="1" color={ui.backButtonColor} />
        </Pressable>
    );
}
