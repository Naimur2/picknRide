import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { HStack, Image, Text, VStack, Factory } from "native-base";
import swipe from "../../../assets/images/swipe.png";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
    PanGestureHandlerGestureEvent,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import colors, { gradient } from "../../theme-config/colors";

const width = Dimensions.get("window").width;

const DELETE_THRESHOLD = -width * 0.4;
const CONTAINER_HEIGHT = 50;
const CONTAINER_WIDTH = 60;

interface IContext {
    translateX: number;
    translateY: number;
}

export default function SwitchToUnlock({
    setStatus,
}: {
    setStatus: (status: boolean) => void;
}) {
    const LinGrad = Factory(LinearGradient);

    const containerWidth = useSharedValue(width);
    const translateX = useSharedValue(0);
    const [isLocked, setIsLocked] = React.useState(true);

    const handleLocked = (lockStatus) => {
        if (lockStatus === 1) {
            setStatus?.(true);
            setIsLocked?.(true);
        } else {
            setIsLocked?.(false);
            setStatus?.(false);
        }
    };

    const message = isLocked ? "SWIPE RIGHT TO UNLOCK" : "SWIPE LEFT TO LOCK";

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
        {
            onStart: (event, context: IContext) => {
                context.translateX = translateX.value;
            },
            onActive: (event, context: IContext) => {
                translateX.value = event.translationX + context.translateX;
            },
            onEnd: (event, context: IContext) => {
                if (event.velocityX < 100) {
                    translateX.value = withTiming(0, undefined, (isEnded) => {
                        if (isEnded) {
                            runOnJS(handleLocked)(1);
                        }
                    });
                } else if (event.velocityX > containerWidth.value / 2) {
                    const transVal = containerWidth.value - CONTAINER_WIDTH;
                    translateX.value = withTiming(
                        transVal,
                        undefined,
                        (isEnded) => {
                            if (isEnded) {
                                runOnJS(handleLocked)(0);
                            }
                        }
                    );
                }
            },
        }
    );

    const keyStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const secondaryContent = useAnimatedStyle(() => {
        return {
            width: translateX.value + CONTAINER_WIDTH / 2,
        };
    });

    const AniText = Animated.createAnimatedComponent(Text);
    const AnimatedImage = Animated.createAnimatedComponent(Image);

    return (
        <Animated.View
            style={[styles.container]}
            onLayout={(e) => {
                containerWidth.value = e.nativeEvent.layout.width;
            }}
        >
            <Animated.View>
                <PanGestureHandler onGestureEvent={panGesture}>
                    <Animated.View style={[keyStyle, styles.box]}>
                        <LinGrad
                            colors={gradient[100]}
                            start={[1, 0]}
                            end={[1, 1]}
                            alignItems={"center"}
                            justifyContent="center"
                            w="100%"
                            h="100%"
                        >
                            <AnimatedImage source={swipe} alt="swipe" />
                        </LinGrad>
                    </Animated.View>
                </PanGestureHandler>
                <Animated.View
                    style={[styles.innerContainer, secondaryContent]}
                />
                <VStack
                    w={"full"}
                    h="full"
                    alignItems={"center"}
                    justifyContent="center"
                    zIndex={-21}
                >
                    <AniText
                        textTransform={"uppercase"}
                        textAlign={"center"}
                        color={"#fff"}
                        fontWeight={600}
                    >
                        {message}
                    </AniText>
                </VStack>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    box: {
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        backgroundColor: "red",
        borderRadius: CONTAINER_HEIGHT / 3,
        overflow: "hidden",
        position: "absolute",
    },
    container: {
        position: "relative",
        backgroundColor: colors.primary[100],
        borderRadius: CONTAINER_HEIGHT / 3,
        height: CONTAINER_HEIGHT,
        overflow: "hidden",
        marginTop: 16,
    },
    innerContainer: {
        backgroundColor: colors.red[100],
        height: CONTAINER_HEIGHT,
        position: "absolute",
        zIndex: -22,
        width: 0,
    },
});
