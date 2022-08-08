import { Factory, HStack, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function OutlineButton({
    title,
    titleStyle,
    buttonStyle,
    rightIcon,
    onPress,
    ...rest
}) {
    const Touchable = Factory(TouchableOpacity);
    return (
        <Touchable onPress={onPress} {...rest}>
            <HStack
                w="330"
                mt={6}
                mb={8}
                px={6}
                py={3}
                borderWidth={2}
                borderColor="primary.100"
                borderRadius={20}
                {...buttonStyle}
            >
                <Text
                    fontWeight={700}
                    color={"primary.100"}
                    textTransform={"uppercase"}
                    ml={"auto"}
                    {...titleStyle}
                >
                    {title}
                </Text>
                {rightIcon && rightIcon()}
            </HStack>
        </Touchable>
    );
}
