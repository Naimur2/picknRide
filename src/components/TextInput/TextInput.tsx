import React from "react";
import { Input, Text, VStack } from "native-base";
import { scale } from "react-native-size-matters";
import colors from "../../theme-config/colors";
import { fontSizes } from "../../theme-config/typography";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function TextInput({
    onChangeText,
    value,
    placeholder,
    error,
    ...rest
}: {
    onChangeText: (text: string) => void;
    value: string;
    placeholder: string;
    error: string;
}) {
    return (
        <VStack>
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
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </VStack>
    );
}
