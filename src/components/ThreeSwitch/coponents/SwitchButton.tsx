import { HStack, Pressable } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
} from "react-native-reanimated";

interface Switchprops {
    onPress: () => void;
    title: string;
    isActive: boolean;
}

const SwitchButton = ({ onPress, title, isActive }: Switchprops) => {
    const activeState = useDerivedValue(() => {
        return isActive ? withTiming(1) : withTiming(0);
    }, [isActive]);

    const textStyle = useAnimatedStyle(() => ({
        color: interpolateColor(activeState.value, [0, 1], ["#E3E3E3", "#fff"]),
    }));

    return (
        <Pressable w="33.36%" py="12px" onPress={onPress}>
            <HStack justifyContent={"center"}>
                <Animated.Text style={[styles.text, textStyle]}>
                    {title}
                </Animated.Text>
            </HStack>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: "500",
    },
});

export default SwitchButton;
