import React from "react";
import { Input } from "native-base";

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
            py={6}
            borderRadius={20}
            placeholder="Email"
            _focus={{
                bg: "white",
            }}
            color="gray.200"
            fontSize={14}
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
