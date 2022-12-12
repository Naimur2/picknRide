import { useNavigation } from "@react-navigation/native";
import { useColorMode, VStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Balance from "../../components/Balance/Balance";
import H3 from "../../components/H3/H3";

import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";
import NewNotification, {
    INotification,
} from "./components/NewNotification/NewNotification";
import NotifyAbout from "./components/NotifyAbout/NotifyAbout";
import SwitchNotifications from "./components/SwitchNotifications/SwitchNotifications";
import { scale } from "react-native-size-matters";
import BackButton from "../../components/BackButton/BackButton";
import colors from "../../theme-config/colors";
import { Platform } from "react-native";

const natifications: INotification[] = [
    {
        title: new Date(),
        data: [
            {
                _id: "1",
                user: {
                    name: "John Doe",
                    avatar: "https://thumbs.dreamstime.com/b/handsome-man-hair-style-beard-beauty-face-portrait-fashion-male-model-black-hair-high-resolution-handsome-man-125031765.jpg",
                    isActive: true,
                },
                description: "Booked scooter for Lusail trip",
                dateTime: new Date(),
            },
            {
                _id: "2",
                user: {
                    name: "John Doe",
                    avatar: "https://thumbs.dreamstime.com/b/handsome-man-hair-style-beard-beauty-face-portrait-fashion-male-model-black-hair-high-resolution-handsome-man-125031765.jpg",
                    isActive: true,
                },
                description: "Booked scooter for Lusail trip",
                dateTime: new Date(),
            },
        ],
    },
    {
        title: new Date("2022-07-17"),
        data: [
            {
                _id: "1",
                user: {
                    name: "John Doe",
                    avatar: "https://thumbs.dreamstime.com/b/handsome-man-hair-style-beard-beauty-face-portrait-fashion-male-model-black-hair-high-resolution-handsome-man-125031765.jpg",
                    isActive: true,
                },
                description: "Booked scooter for Lusail trip",
                dateTime: new Date("2022-07-17"),
            },
            {
                _id: "2",
                user: {
                    name: "John Doe",
                    avatar: "https://thumbs.dreamstime.com/b/handsome-man-hair-style-beard-beauty-face-portrait-fashion-male-model-black-hair-high-resolution-handsome-man-125031765.jpg",
                    isActive: true,
                },
                description: "Booked scooter for Lusail trip",
                dateTime: new Date("2022-07-17"),
            },
        ],
    },
];

export default function Notifications() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const insets = useSafeAreaInsets();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Notifications" />,
            headerTitleAlign: "center",
            headerLeft: () => (
                <BackButton color={colorMode === "dark" ? "white" : "black"} />
            ),
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor:
                    colorMode === "dark" ? colors.dark[100] : colors.light[300],
            },
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
                space={12}
                mt={4}
                px="6"
                pb={8}
                h="full"
                maxWidth={scale(500)}
                mx="auto"
                pt={Platform.OS === "android" ? 55 : 0}
            >
                <VStack>
                    <H3>General Setings</H3>
                    <SwitchNotifications />
                </VStack>
                <VStack>
                    <H3>Notify About</H3>
                    <NotifyAbout />
                </VStack>

                {natifications?.map((item, index) => (
                    <NewNotification
                        key={item?.title + index.toString()}
                        data={item?.data}
                        title={item?.title}
                    />
                ))}
            </VStack>
        </Scroller>
    );
}
