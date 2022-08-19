import { useNavigation } from "@react-navigation/native";
import { Image, Text, useColorMode, VStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import scooterBoy from "../../../assets/images/scooter-boy.png";
import scooterBoyDark from "../../../assets/images/scooter-boy-dark.png";
import Balance from "../../components/Balance/Balance";
import Card from "../../components/Card/Card";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";
import SettingsMenu, {
    ISettingsMenu,
} from "./components/SettingsMenu/SettingsMenu";
import ThemeToggler from "./components/ThemeToggler/ThemeToggler";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import { scale } from "react-native-size-matters";

export default function Settings() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

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
            onPress: () => {},
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
            headerLeft: null,
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
        });
    }, [navigation]);

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
                mt={TOP_PADDING + insets.top + "px"}
                px="6"
                pb={8}
                h="full"
                maxWidth={scale(500)}
                mx="auto"
            >
                <ThemeToggler />
                <Card>
                    {settingsMenus.map((menu, index) => (
                        <SettingsMenu key={index} {...menu} />
                    ))}
                </Card>

                <Image
                    alt="a boy with scotter"
                    source={scooterBoy}
                    _dark={{
                        source: scooterBoyDark,
                    }}
                    mx="auto"
                />
            </VStack>
        </Scroller>
    );
}
