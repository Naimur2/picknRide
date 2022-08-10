import { Box, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import { Tick } from "../../../components/Icons/Icons";

const items = [
    {
        id: 1,
        type: "Qatar Citizen / Resident",
    },
    {
        id: 2,
        type: "GCC Resident",
    },
    {
        id: 3,
        type: "Visitor / Tourist",
    },
];

function CheckBoxGroup({ onSelect, selected }) {
    return (
        <VStack
            mt={8}
            bg="#fff"
            px="6"
            py={6}
            w={[320, 360, 500]}
            borderRadius={26}
            space={4}
            _dark={{
                bg: "primary.100",
            }}
        >
            {items?.map((item, index) => (
                <Pressable key={index} onPress={() => onSelect(item.id)}>
                    <HStack
                        justifyContent={"space-between"}
                        alignItems="center"
                        py={2}
                    >
                        <Text
                            color={"#000"}
                            fontWeight={600}
                            fontSize={15}
                            _dark={{
                                color: "white",
                            }}
                        >
                            {item.type}
                        </Text>
                        {selected === item.id ? (
                            <Tick
                                color={"primary.100"}
                                _dark={{
                                    color: "white",
                                }}
                            />
                        ) : (
                            <Box
                                borderColor={"primary.100"}
                                borderWidth={"2"}
                                h="24px"
                                w="24px"
                                borderRadius={100}
                                _dark={{
                                    borderColor: "white",
                                }}
                            />
                        )}
                    </HStack>
                </Pressable>
            ))}
        </VStack>
    );
}

export default React.memo(CheckBoxGroup);
