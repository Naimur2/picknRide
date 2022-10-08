import { Factory, HStack, Pressable, Text } from "native-base";
import React from "react";
import { Touchable, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { fontSizes } from "../../theme-config/typography";

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
        <Touchable
            w={scale(300) + "px"}
            mt={6}
            mb={8}
            px={6}
            borderWidth={2}
            borderColor="primary.100"
            borderRadius={20}
            onPress={onPress}
            display="flex"
            flexDir={"row"}
            alignItems="center"
            py={2}
            {...rest}
        >
            <Text
                fontWeight={700}
                color={"primary.100"}
                textTransform={"uppercase"}
                ml={"auto"}
                fontSize={fontSizes.xs}
                {...titleStyle}
            >
                {title}
            </Text>
            {rightIcon && rightIcon()}
        </Touchable>
    );
}
