import { Pressable } from "native-base";
import React from "react";

interface ICard {
    onPress?: () => void;
    children: React.ReactNode;
}

export default function Card({ children, onPress, ...rest }: ICard) {
    return (
        <Pressable
            bg="#fff"
            p="4"
            borderRadius={"20px"}
            shadow={7}
            onPress={onPress}
            {...rest}
        >
            {children}
        </Pressable>
    );
}
