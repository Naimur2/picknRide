import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import Balance from "../../components/Balance/Balance";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";

import HistoryCard, {
    IHistoryCard,
} from "./components/HistoryCard/HistoryCard";

const historyCards: IHistoryCard[] = [
    {
        _id: "1",
        starting: {
            locationName: "Masraf Al-Rayan Building",
            time: "10 September, 10.30 AM",
        },
        destination: {
            locationName: "Al Wakrah",
            time: "10 September, 11.00 AM",
        },
        duration: "30 min",
        distance: "1.2 km",
        fair: "3.2",
    },
    {
        _id: "2",
        starting: {
            locationName: "Masraf Al-Rayan Building",
            time: "10 September, 10.30 AM",
        },
        destination: {
            locationName: "Al Wakrah",
            time: "10 September, 11.00 AM",
        },
        duration: "30 min",
        distance: "1.2 km",
        fair: "3.2",
    },
    {
        _id: "3",
        starting: {
            locationName: "Masraf Al-Rayan Building",
            time: "10 September, 10.30 AM",
        },
        destination: {
            locationName: "Al Wakrah",
            time: "10 September, 11.00 AM",
        },
        duration: "30 min",
        distance: "1.2 km",
        fair: "3.2",
    },
    {
        _id: "4",
        starting: {
            locationName: "Masraf Al-Rayan Building",
            time: "10 September, 10.30 AM",
        },
        destination: {
            locationName: "Al Wakrah",
            time: "10 September, 11.00 AM",
        },
        duration: "30 min",
        distance: "1.2 km",
        fair: "3.2",
    },
];

export default function CarRideHistory() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="RIDE history" />,
            headerTitleAlign: "center",
            headerLeft: null,
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
        });
    }, [navigation]);

    const [selected, setSelected] = React.useState("scooter");

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
                w="full"
            >
                {historyCards.map((card, idx) => (
                    <HistoryCard
                        starting={card?.starting}
                        destination={card?.destination}
                        duration={card?.duration}
                        fair={card?.fair}
                        distance={card?.distance}
                        key={idx}
                    />
                ))}
            </VStack>
        </Scroller>
    );
}
