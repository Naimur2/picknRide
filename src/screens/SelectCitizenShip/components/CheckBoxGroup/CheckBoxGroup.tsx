import { VStack } from "native-base";
import React from "react";
import CheckBoxWithText from "../../../../components/CheckBoxWithText/CheckBoxWithText";

function CheckBoxGroup({ onSelect, selected, items }) {
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
                    onPress={() => onSelect(item)}
                    isChecked={selected.id === item.id}
                />
            ))}
        </VStack>
    );
}

export default React.memo(CheckBoxGroup);
