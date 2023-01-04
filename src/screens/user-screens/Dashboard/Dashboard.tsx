import Toggler from "@assets/svgs/Toggler";
import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import TopSection from "@components/TopSection/TopSection";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import useAuth from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import colors from "@theme/colors";
import { Factory, Text, useColorMode } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { NavigationStackOptions } from "react-navigation-stack";
import DashModal from "./DashModal/DashModal";
import VeichleCards from "./VeichleCards/VeichleCards";

export default function Dashboard() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const Touchable = Factory(TouchableOpacity);

    const auth = useAuth();
    const user = auth?.user;

    React.useEffect(() => {
        const navigationOptions: NavigationStackOptions = {
            headerTitle: "",
            headerStyle: {
                alignItems: "center",
                backgroundColor:
                    colorMode === "dark"
                        ? colors.primary[100]
                        : colors.green[200],
            },
            headerLeft: () => (
                <Touchable onPress={() => navigation.openDrawer()}>
                    <Toggler
                        mx={4}
                        _dark={{
                            color: "#000",
                        }}
                        py={2}
                        px={4}
                    />
                </Touchable>
            ),
            headerRight: () => (
                <UserAvatar
                    avatarStyle={{
                        size: scale(35) + "px",
                    }}
                />
            ),
            headerShadowVisible: false,
        };
        navigation.setOptions(navigationOptions);
    }, [navigation, colorMode]);

    if (auth?.error) {
        return (
            <ImageBg
                type={colorMode}
                flex={1}
                alignItems="center"
                justifyContent={"center"}
            >
                <Text fontWeight={700}>{auth?.error}</Text>
            </ImageBg>
        );
    }

    return (
        <ImageBg type={colorMode}>
            <Scroller
                contentStyle={{
                    alignItems: "center",
                    flexGrow: 1,
                }}
            >
                <TopSection
                    title="Good Evening Alexis"
                    subtitle="Select your ride"
                />

                <VeichleCards />
                <DashModal />
            </Scroller>
        </ImageBg>
    );
}
