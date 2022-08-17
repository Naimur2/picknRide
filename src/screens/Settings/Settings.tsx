import { useNavigation } from "@react-navigation/native";
import { Text, useColorMode, VStack, HStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Balance from "../../components/Balance/Balance";
import Card from "../../components/Card/Card";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";

export default function RideHistory() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const insets = useSafeAreaInsets();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text
                    textTransform={"uppercase"}
                    color={"#000"}
                    fontSize={17}
                    fontWeight={700}
                >
                    Settings
                </Text>
            ),
            headerTitleAlign: "center",
            headerLeft: null,
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
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
                    space={4}
                    mt={TOP_PADDING + insets.top + "px"}
                    px="4"
                    pb={8}
                    h="full"
                >
                    <Card>
                        <HStack>
                            <Text fontWeight={600} fontSize={15}>
                                Dark Mode
                            </Text>
                        </HStack>
                    </Card>
                </VStack>
            </Scroller>
        </ImageBg>
    );
}
