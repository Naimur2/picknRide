import { useNavigation } from "@react-navigation/native";
import { Avatar, useColorMode } from "native-base";
import React from "react";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import TopSection from "../../components/TopSection/TopSection";
import Toggler from "../../svgs/Toggler";
import DashModal from "./component/DashModal/DashModal";
import VeichleCards from "./component/VeichleCards/VeichleCards";

export default function Dashboard() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();

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
                <Avatar
                    source={{
                        uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    }}
                    borderWidth={3}
                    borderColor="white"
                >
                    SS
                    <Avatar.Badge bg="green.500" />
                </Avatar>
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
