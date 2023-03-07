import { useNavigation } from "@react-navigation/native";
import { Image, useColorMode, VStack } from "native-base";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import scooterBoyDark from "@assets/images/scooter-boy-dark.png";
import scooterBoy from "@assets/images/scooter-boy.png";
import BackButton from "@components/BackButton/BackButton";
import Balance from "@components/Balance/Balance";
import Card from "@components/Card/Card";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import Scroller from "@components/Scroller/Scroller";
import colors from "@theme/colors";

import SettingsMenu, { ISettingsMenu } from "./SettingsMenu/SettingsMenu";
import ThemeToggler from "./ThemeToggler/ThemeToggler";
import { ISelectAuthOtpTypeParams } from "../../auth-screens/SelectAuthOtpType/SelectAuthOtpType.types";

export default function Settings() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const colormode = useColorMode();
    const headerColor =
        colormode.colorMode === "dark" ? colors.dark[100] : colors.light[300];

    const settingsMenus: ISettingsMenu[] = [
        {
            title: "Notifications",
            onPress: () => navigation.navigate("Notifications"),
        },
        {
            title: "Account Verification Status",
            onPress: () => navigation.navigate("VarificationStatus"),
        },
        {
            title: "Change Password",
            onPress: () =>
                navigation.navigate("SelectAuthOtpType", {
                    authType: "Changepassword",
                } as ISelectAuthOtpTypeParams),
        },
        {
            title: "Privacy Policy",
            onPress: () => {},
        },
        {
            title: "Terms & Conditions",
            onPress: () => {},
        },
        {
            title: "Report An Issue",
            onPress: () => navigation.navigate("ReportIssue"),
        },
    ];

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Settings" />,
            headerTitleAlign: "center",
            headerLeft: () => (
                <BackButton
                    color={colormode.colorMode === "dark" ? "white" : "black"}
                />
            ),
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: headerColor,
            },
        });
    }, [navigation, colormode.colorMode]);

    return (
        <Scroller
            contentStyle={{
                flexGrow: 1,
            }}
            bg="light.300"
            _dark={{
                bg: "dark.100",
            }}
        >
            <VStack
                space={6}
                mt={4}
                px="6"
                pb={8}
                h="full"
                maxWidth={scale(500)}
                mx="auto"
                pt={Platform.OS === "android" ? 55 : 0}
            >
                <ThemeToggler />
                <Card py={3}>
                    {settingsMenus.map((menu, index) => (
                        <SettingsMenu py="3" key={index} {...menu} />
                    ))}
                </Card>

                <Image
                    alt="a boy with scotter"
                    source={scooterBoy}
                    _dark={{
                        source: scooterBoyDark,
                    }}
                    mx="auto"
                    height={scale(200) + "px"}
                    resizeMode="contain"
                    mt={6}
                />
            </VStack>
        </Scroller>
    );
}
