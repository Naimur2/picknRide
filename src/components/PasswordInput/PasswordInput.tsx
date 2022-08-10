import React from "react";
import { Input } from "native-base";
import { EyeClose, EyeOpen } from "../Icons/Icons";

export default function PasswordInput({
    onChangeText,
    value,
    placeholder,
    ...rest
}: {
    onChangeText: (text: string) => void;
    value: string;
    placeholder: string;
}) {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    return (
        <Input
            borderWidth={0}
            bg="white"
            shadow="9"
            px={6}
            py={6}
            borderRadius={20}
            placeholder="Password"
            _focus={{
                bg: "white",
            }}
            color="gray.200"
            fontSize={14}
            fontWeight="500"
            placeholderTextColor="gray.300"
            mb={2}
            type={isPasswordVisible ? "default" : "password"}
            rightElement={
                isPasswordVisible ? (
                    <EyeOpen
                        onPress={() => setIsPasswordVisible((prev) => !prev)}
                        color="gray.300"
                        mx="4"
                    />
                ) : (
                    <EyeClose
                        onPress={() => setIsPasswordVisible((prev) => !prev)}
                        color="gray.300"
                        mx="4"
                    />
                )
            }
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            {...rest}
        />
    );
}
