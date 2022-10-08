import { HStack, VStack } from "native-base";
import React from "react";
import { LayoutChangeEvent, StyleSheet } from "react-native";

import Animated, {
    runOnJS,
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
} from "react-native-reanimated";

import LinGradient from "../LinGrad/LinGrad";
import SwitchButton from "./coponents/SwitchButton";

interface ThreeSwitchProps {
    onPress?: (current: string) => void;
    leftTitle?: string;
    rightTitle?: string;
    centerTitle?: string;
}

const ThreeSwitch = ({
    onPress,
    leftTitle,
    rightTitle,
    centerTitle,
}: ThreeSwitchProps) => {
    const switchWidth = React.useRef(0);
    const containerWidth = React.useRef(0);
    const [swiitchPos, setSwitchPos] = React.useState(1);

    const switchPosition = useDerivedValue(() => {
        "worklet";
        switch (swiitchPos) {
            case 1:
                return withTiming(0, { duration: 100 }, (isFinished) => {
                    if (isFinished && onPress) {
                        runOnJS(onPress)?.("1");
                    }
                });
            case 2:
                return withTiming(
                    containerWidth.current / 3,
                    { duration: 100 },
                    (isFinished) => {
                        if (isFinished && onPress) {
                            runOnJS(onPress)?.("2");
                        }
                    }
                );
            case 3:
                return withTiming(
                    containerWidth.current - switchWidth.current,
                    { duration: 100 },
                    (isFinished) => {
                        if (isFinished && onPress) {
                            runOnJS(onPress)?.("3");
                        }
                    }
                );
            default:
                return withTiming(0);
        }
    }, [swiitchPos]);

    const switchLayoutHandler = (e: LayoutChangeEvent) => {
        switchWidth.current = e.nativeEvent.layout.width;
    };

    const containerLayoutHandler = (e: LayoutChangeEvent) => {
        containerWidth.current = e.nativeEvent.layout.width;
    };

    const rStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: switchPosition.value }],
    }));

    const handlePress = (type: string) => {
        "worklet";
        setSwitchPos(type);
    };

    return (
        <VStack
            my={4}
            bg="transparent"
            maxW={350}
            mt={4}
            shadow="1"
            borderRadius={20}
        >
            <HStack
                bg="#fff"
                onLayout={containerLayoutHandler}
                borderRadius={20}
                justifyContent={"space-between"}
                _dark={{
                    bg: "gray.400",
                }}
            >
                <SwitchButton
                    onPress={() => handlePress(1)}
                    title={leftTitle || "Left"}
                    isActive={swiitchPos === 1}
                />
                <SwitchButton
                    onPress={() => handlePress(2)}
                    title={centerTitle || "Center"}
                    isActive={swiitchPos === 2}
                />

                <SwitchButton
                    onPress={() => handlePress(3)}
                    title={rightTitle || "Right"}
                    isActive={swiitchPos === 3}
                />

                <Animated.View
                    onLayout={switchLayoutHandler}
                    style={[styles.active, rStyle]}
                >
                    <LinGradient h={"full"} w="full" />
                </Animated.View>
            </HStack>
        </VStack>
    );
};

const styles = StyleSheet.create({
    active: {
        backgroundColor: "#cfcccc",
        width: "33.34%",
        height: "100%",
        position: "absolute",
        zIndex: -1,
        borderRadius: 20,
        overflow: "hidden",
    },
});

export default ThreeSwitch;
