import { VStack } from "native-base";
import React from "react";
import CheckBoxWithText from "../../../../components/CheckBoxWithText/CheckBoxWithText";

const items: {
    id: number;
    name: string;
}[] = [
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
                <CheckBoxWithText
                    text={item.type}
                    key={index}
                    onPress={() => onSelect(item.id)}
                    isChecked={selected === item.id}
                />
            ))}
        </VStack>
    );
}

export default React.memo(CheckBoxGroup);
