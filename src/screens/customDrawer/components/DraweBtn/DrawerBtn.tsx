import { ChevronRightIcon, HStack, Pressable, Text } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";

interface Props {
    onPress: () => void;
    title: string;
}

export default function DrawerBtn({ onPress, title }: Props) {
    return (
        <Pressable onPress={onPress}>
            <HStack
                justifyContent={"space-between"}
                alignItems="center"
                py={"14px"}
            >
                <Text
                    color={"#fff"}
                    fontSize={scale(14)}
                    fontWeight={500}
                    textTransform={"uppercase"}
                >
                    {title}
                </Text>
                <ChevronRightIcon color={"#fff"} />
            </HStack>
        </Pressable>
    );
}
