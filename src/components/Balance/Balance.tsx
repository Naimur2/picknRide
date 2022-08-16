import { HStack, Pressable, Text } from "native-base";
import React from "react";
import Wallet from "../../svgs/Wallet";

export default function Balance({
    balance,
    onPress,
    iconColor,
    textColor,
    currency,
}: {
    onPress?: () => void;
    balance?: number;
    iconColor?: string;
    textColor?: string;
    currency?: string;
}) {
    return (
        <Pressable onPress={onPress}>
            <HStack alignItems={"center"} space={2}>
                <Wallet color={iconColor || "white"} />
                <Text fontWeight={500} color={textColor || "white"}>
                    {balance || 50} {currency || "QAR"}
                </Text>
            </HStack>
        </Pressable>
    );
}
