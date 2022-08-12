import { HStack, Pressable, Text } from "native-base";
import React from "react";
import Wallet from "../../svgs/Wallet";

export default function Balance({
    balance,
    onPress,
    color,
    currency,
}: {
    onPress?: () => void;
    balance?: number;
    color: string;
    currency: string;
}) {
    return (
        <Pressable onPress={onPress}>
            <HStack alignItems={"center"} space={2}>
                <Wallet color={color || "white"} />
                <Text fontWeight={500} color={color || "white"}>
                    {balance || 50} {currency || "QAR"}
                </Text>
            </HStack>
        </Pressable>
    );
}
