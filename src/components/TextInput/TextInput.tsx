import React from "react";
import { Input } from "native-base";
import { scale } from "react-native-size-matters";

export default function TextInput({
    onChangeText,
    value,
    placeholder,
    ...rest
}: {
    onChangeText: (text: string) => void;
    value: string;
    placeholder: string;
}) {
    return (
        <Input
            borderWidth={0}
            bg="white"
            shadow="9"
            px={6}
            py={4}
            borderRadius={20}
            _focus={{
                bg: "white",
            }}
            color="gray.200"
            fontSize={scale(12)}
            fontWeight="500"
            placeholderTextColor="gray.300"
            mb={2}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            {...rest}
        />
    );
}
