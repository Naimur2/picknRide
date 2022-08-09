import React from "react";
import { VStack, Text, HStack, Pressable } from "native-base";
import { Plus } from "../../../../components/Icons/Icons";

export default function AddImage({
    title,
    onLeftPress,
    onRightPress,
}: {
    title: string;
}) {
    return (
        <VStack my={4} space={4}>
            <Text mt={2} w="280px" fontSize={20} fontWeight={600}>
                {title}
            </Text>
            <HStack justifyContent={"space-between"}>
                <VStack space="2" w={"48%"}>
                    <Pressable
                        h={"90px"}
                        w="full"
                        borderRadius={35}
                        bg="#fff"
                        shadow="9"
                        alignItems={"center"}
                        justifyContent={"center"}
                        onPress={onLeftPress}
                    >
                        <Plus color={"light.200"} />
                    </Pressable>
                    <Text textAlign={"center"}>Back Side</Text>
                </VStack>
                <VStack space="2" w={"48%"}>
                    <Pressable
                        h={"90px"}
                        w="full"
                        borderRadius={35}
                        bg="#fff"
                        shadow="9"
                        alignItems={"center"}
                        justifyContent={"center"}
                        onPress={onRightPress}
                    >
                        <Plus color={"light.200"} />
                    </Pressable>
                    <Text textAlign={"center"}>Back Side</Text>
                </VStack>
            </HStack>
        </VStack>
    );
}
