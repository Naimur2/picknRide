import { useNavigation } from "@react-navigation/native";
import { HStack, useColorMode, VStack, Text } from "native-base";
import React from "react";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";
import Veichle from "../../svgs/Veichle";
import colors from "../../theme-config/colors";

export default function ReportIssue() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const insets = useSafeAreaInsets();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Report An Issue" />,
            headerTitleAlign: "center",
            headerLeft: null,
        });
    }, [navigation]);

    return (
        <ImageBg flex={1} type={colorMode}>
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                }}
            >
                <VStack
                    space={6}
                    mt={TOP_PADDING + insets.top + "px"}
                    px="6"
                    pb={8}
                    h="full"
                >
                    <HStack>
                        <Animated.View
                            style={{
                                width: "25%",
                                backgroundColor: colors.primary[100],
                                padding: 10,
                            }}
                        >
                            <Veichle color={"#fff"} />
                            <Text>Vehicle</Text>
                        </Animated.View>
                    </HStack>
                </VStack>
            </Scroller>
        </ImageBg>
    );
}
