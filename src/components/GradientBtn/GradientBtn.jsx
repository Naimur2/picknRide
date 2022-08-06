import { Factory, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { gradient } from "../../theme-config/colors";
import { scale } from "react-native-size-matters";

export default function GradientBtn({
    title,
    onPress,
    children,
    gradientStyle,
    titleStyle,
    ...rest
}) {
    const LinearGard = Factory(LinearGradient);
    const Touchable = Factory(TouchableOpacity);

    return (
        <Touchable onPress={onPress} {...rest}>
            <LinearGard
                w={scale(265) + "px"}
                h={scale(50) + "px"}
                colors={gradient[100]}
                start={[1, 0]}
                end={[1, 1]}
                alignItems="center"
                justifyContent="center"
                borderRadius={22}
                {...gradientStyle}
            >
                {children ? (
                    children
                ) : (
                    <Text
                        color={"white"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        fontSize={"13px"}
                        textTransform={"uppercase"}
                        {...titleStyle}
                    >
                        {title}
                    </Text>
                )}
            </LinearGard>
        </Touchable>
    );
}
