import { useNavigation } from "@react-navigation/native";
import { Text, useColorMode, VStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import Balance from "../../components/Balance/Balance";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";
import NotificationsCard, {
    INotificationsCard,
} from "./components/NotificationsCard/NotificationsCard";
import NotifyAbout from "./components/NotifyAbout/NotifyAbout";
import SwitchNotifications from "./components/SwitchNotifications/SwitchNotifications";
import moment from "moment";

interface INotification {
    title: string | Date;
    data: INotificationsCard[];
}

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

    const Notification = (props: INotification) => {
        console.log(props);
        return (
            <VStack>
                <H3>
                    {props?.title
                        ? moment(props?.title).format("MMM Do YY")
                        : ""}
                </H3>
                <VStack space={4}>
                    {props?.data?.map((item) => (
                        <NotificationsCard
                            user={item?.user}
                            description={item?.description}
                            dateTime={
                                item?.dateTime
                                    ? moment(item?.dateTime).fromNow()
                                    : ""
                            }
                        />
                    ))}
                </VStack>
            </VStack>
        );
    };

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

                    {natifications?.map((item, index) => (
                        <Notification
                            key={item.title + index}
                            data={item.data}
                            title={item.title}
                        />
                    ))}
                </VStack>
            </Scroller>
        </ImageBg>
    );
}
