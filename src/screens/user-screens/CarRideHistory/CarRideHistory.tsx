import BackButton from "@components/BackButton/BackButton";
import Balance from "@components/Balance/Balance";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation } from "@react-navigation/native";
import colors from "@theme/colors";
import { FlatList, Text, VStack, useColorMode } from "native-base";
import React from "react";
import { ActivityIndicator, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

import HistoryCard, { IHistoryCard } from "./HistoryCard/HistoryCard";
import {
    tripApiSlice,
    useGetAllCarTripsQuery,
} from "@store/api/v2/tripApi/tripApiSlice";
import { useDispatch } from "react-redux";

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
    {
        _id: "5",
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
        _id: "6",
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

const LoadingComponent = () => {
    return (
        <VStack alignItems="center" justifyContent="center" height={scale(100)}>
            <ActivityIndicator size="large" color="black" />
        </VStack>
    );
};

export default function CarRideHistory() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const colormode = useColorMode();
    const dispatch = useDispatch();

    const { data, isFetching, isLoading } = useGetAllCarTripsQuery(undefined);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="RIDE history" />,
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
                backgroundColor:
                    colormode.colorMode === "dark"
                        ? colors.dark[100]
                        : colors.light[300],
            },
        });
    }, [navigation]);

    const [selected, setSelected] = React.useState("scooter");

    const onLoadMore = async () => {
        console.log("onLoadMore");
        const hasNextPage = data?.data?.hasNextPage;
        const currentPage = data?.data?.pageIndex;
        if (hasNextPage) {
            const res = await dispatch(
                tripApiSlice.endpoints.geMoreCarTrips.initiate({
                    pageNumber: currentPage + 1,
                    pageSize: 15,
                })
            ).unwrap();
            console.log("res", res);
        }
    };

    return (
        <>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={data?.data?.items || []}
                renderItem={({ item, index }) => (
                    <HistoryCard
                        starting={item?.starting}
                        destination={item?.destination}
                        duration={item?.duration}
                        fair={item?.fair}
                        distance={item?.distance}
                        key={index}
                    />
                )}
                contentContainerStyle={{
                    paddingTop: Platform.OS === "ios" ? insets.top : 50,
                    paddingBottom: insets.bottom,
                    paddingHorizontal: scale(20),
                    backgroundColor: colors.light[300],
                }}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => {
                    if (isFetching) return <LoadingComponent />;
                    return null;
                }}
                ListEmptyComponent={() => {
                    if (isLoading) return null;
                    return (
                        <VStack
                            alignItems="center"
                            justifyContent="center"
                            height={scale(100)}
                        >
                            <Text
                                textAlign={"center"}
                                maxWidth={200}
                                fontWeight={700}
                                fontSize={"xl"}
                                color={"red.100"}
                            >
                                No history found for this vehicle
                            </Text>
                        </VStack>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </>
    );
}
