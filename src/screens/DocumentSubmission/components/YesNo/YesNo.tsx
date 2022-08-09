import React from "react";
import { VStack, Text, HStack, Pressable } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function YesNo({
    setSelected,
}: {
    selected: string;
    setSelected: (selected: string) => void;
}) {
    const [value, setValue] = React.useState("yes");

    const YesNoBtn = ({
        title,
        isSelected,
    }: {
        title: string;
        isSelected: boolean;
        onPress: () => void;
    }) => {
        return (
            <VStack space="2" w={"130px"}>
                <HStack
                    px={2}
                    bg={isSelected ? "primary.100" : "transparent"}
                    borderRadius={35}
                    alignItems="center"
                    h={isSelected ? "34px" : "32px"}
                    borderWidth={isSelected ? 0 : 1}
                    borderColor={isSelected ? "#329D9C" : ""}
                    w="full"
                >
                    <Text
                        fontSize={"13"}
                        ml={"auto"}
                        mr={isSelected ? 0 : "auto"}
                        textAlign={"center"}
                        color={isSelected ? "white" : "gray.100"}
                        textTransform={"uppercase"}
                        fontWeight={"600"}
                    >
                        {title}
                    </Text>
                    {isSelected ? (
                        <Octicons
                            name="check-circle-fill"
                            size={20}
                            color="#fff"
                            style={{
                                marginLeft: "auto",
                            }}
                        />
                    ) : null}
                </HStack>
            </VStack>
        );
    };

    React.useEffect(() => {
        setSelected(value);
    }, [value]);

    return (
        <VStack my={4} space={4}>
            <Text mt={2} w="280px" fontSize={20} fontWeight={600}>
                International License
            </Text>
            <HStack space={4}>
                <TouchableOpacity onPress={() => setValue?.("yes")}>
                    <YesNoBtn title="Yes" isSelected={value === "yes"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setValue?.("no")}>
                    <YesNoBtn title="No" isSelected={value === "no"} />
                </TouchableOpacity>
            </HStack>
        </VStack>
    );
}
