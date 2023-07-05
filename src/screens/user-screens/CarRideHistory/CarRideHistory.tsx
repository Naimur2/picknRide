import BackButton from "@components/BackButton/BackButton";
import Balance from "@components/Balance/Balance";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import { useNavigation } from "@react-navigation/native";
import colors from "@theme/colors";
import { FlatList, HStack, Text, VStack, useColorMode } from "native-base";
import React from "react";
import { ActivityIndicator, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

import {
    tripApiSlice,
    useGetAllCarTripsQuery,
} from "@store/api/v2/tripApi/tripApiSlice";
import { useDispatch } from "react-redux";
import HistoryCard, { IHistoryCard } from "./HistoryCard/HistoryCard";
import ViichleCircle from "@components/VeichleSelector/ViichleCircle/ViichleCircle";
import { ECarType } from "@store/features/cars/carsSlice.types";

const LoadingComponent = () => {
    return (
        <VStack alignItems="center" justifyContent="center" height={scale(100)}>
            <ActivityIndicator size="large" color="black" />
        </VStack>
    );
};

const HeadaderComponent = ({
    selected,
    setSelected,
    ...rest
}: {
    selected: ECarType;
    setSelected: React.Dispatch<React.SetStateAction<ECarType>>;
}) => {
    return (
        <HStack space={4} my={4} {...rest}>
            <ViichleCircle
                type={ECarType.SCOTTER}
                isActive={selected === ECarType.SCOTTER}
                onPress={() => setSelected(ECarType.SCOTTER)}
                p={4}
                imageWidth={24}
            />
            <ViichleCircle
                type={ECarType.CAR}
                isActive={selected === ECarType.CAR}
                onPress={() => setSelected(ECarType.CAR)}
                p={4}
                imageWidth={24}
            />
            <ViichleCircle
                type={ECarType.CYCLE}
                isActive={selected === ECarType.CYCLE}
                onPress={() => setSelected(ECarType.CYCLE)}
                p={4}
                imageWidth={24}
            />
        </HStack>
    );
};

export default function CarRideHistory() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const colormode = useColorMode();
    const dispatch = useDispatch();

    const [selected, setSelected] = React.useState<ECarType>(ECarType.SCOTTER);

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
                renderItem={({ item, index }) => {
                    return (
                        <HistoryCard
                            starting={item?.starting}
                            destination={item?.destination}
                            duration={item?.duration}
                            fair={item?.fair}
                            distance={item?.distance}
                            key={index}
                            rideId={item?._id}
                        />
                    );
                }}
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
                ListHeaderComponent={() => (
                    <HeadaderComponent
                        selected={selected}
                        setSelected={setSelected}
                    />
                )}
            />
        </>
    );
}
