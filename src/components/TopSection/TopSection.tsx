import { Text, VStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

interface ITopSection {
    title: string;
    subtitle: string;
}

export default function TopSection({ title, subtitle }: ITopSection) {
    const insets = useSafeAreaInsets();

    return (
        <VStack
            borderBottomRadius={40}
            bg="green.200"
            w="full"
            pb={10}
            px={8}
            _dark={{
                bg: "primary.100",
            }}
        >
            <Text
                lineHeight={scale(40) + "px"}
                fontWeight={700}
                fontSize={scale(35) + "px"}
                pt={7}
                maxW={scale(300)}
                color="primary.200"
                _dark={{
                    color: "#000",
                }}
            >
                {title}
            </Text>
            <Text
                color={"green.300"}
                pt={2}
                fontWeight={500}
                fontSize={scale(13) + "px"}
                _dark={{
                    color: "#000",
                }}
            >
                {subtitle}
            </Text>
        </VStack>
    );
}
