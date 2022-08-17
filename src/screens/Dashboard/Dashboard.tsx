import { useNavigation } from "@react-navigation/native";
import { Avatar, useColorMode } from "native-base";
import React from "react";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import TopSection from "../../components/TopSection/TopSection";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import Toggler from "../../svgs/Toggler";
import DashModal from "./component/DashModal/DashModal";
import VeichleCards from "./component/VeichleCards/VeichleCards";
import useAuth from "../../hooks/useAuth";

export default function Dashboard() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const { user } = useAuth();

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerStyle: {
                alignItems: "center",
            },
            headerLeft: () => (
                <Toggler
                    mx={4}
                    onPress={() => navigation.openDrawer()}
                    _dark={{
                        color: "#000",
                    }}
                />
            ),
            headerRight: () => (
                <UserAvatar
                    image={user?.image}
                    uname={user?.name?.slice(0, 1)}
                />
            ),
        });
    }, [navigation]);

    return (
        <ImageBg type={colorMode}>
            <Scroller
                h="full"
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
