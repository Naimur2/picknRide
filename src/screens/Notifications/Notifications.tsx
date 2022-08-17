import { useNavigation } from "@react-navigation/native";
import { useColorMode, VStack, Text } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Balance from "../../components/Balance/Balance";
import Card from "../../components/Card/Card";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";
import { ISettingsMenu } from "./components/SettingsMenu/SettingsMenu";
import SwitchNotifications from "./components/SwitchNotifications/SwitchNotifications";
import { scale } from "react-native-size-matters";
import CheckBoxWithText from "../../components/CheckBoxWithText/CheckBoxWithText";
import NotifyAbout from "./components/NotifyAbout/NotifyAbout";

export default function Notifications() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const insets = useSafeAreaInsets();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Settings" />,
            headerTitleAlign: "center",
            headerLeft: null,
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
        });
    }, [navigation]);

    const H3 = ({ children }: { children: React.ReactNode }) => (
        <Text
            fontWeight={600}
            fontSize={scale(20)}
            _dark={{
                color: "#fff",
            }}
            mb={4}
            color="#000"
        >
            {children}
        </Text>
    );

    return (
        <ImageBg flex={1} type={colorMode}>
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                }}
            >
                <VStack
                    space={12}
                    mt={TOP_PADDING + insets.top + "px"}
                    px="6"
                    pb={8}
                    h="full"
                >
                    <VStack>
                        <H3>General Setings</H3>
                        <SwitchNotifications />
                    </VStack>
                    <VStack>
                        <H3>Notify About</H3>
                        <NotifyAbout />
                    </VStack>

                    <VStack>
                        <H3>Today</H3>
                    </VStack>
                </VStack>
            </Scroller>
        </ImageBg>
    );
}
