import { useNavigation } from "@react-navigation/native";
import { VStack, useColorMode } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import BackButton from "@components/BackButton/BackButton";
import Balance from "@components/Balance/Balance";
import CarCard from "@components/CarCard/CarCard";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import { TOP_PADDING } from "@utils/final";

export default function RideHistory() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const insets = useSafeAreaInsets();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Ride History" />,
            headerTitleAlign: "center",
            headerLeft: () => <BackButton />,
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
        });
    }, [navigation]);

    const cars = [
        {
            id: 1,
            image: "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
            distance: "100m",
            variant: "Sedan",
        },
        {
            id: 2,

            image: "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
            distance: "100m",
            variant: "Suv",
        },
        {
            id: 3,

            image: "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
            distance: "100m",
            variant: "Hatchback",
        },
        {
            id: 3,

            image: "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
            distance: "100m",
            variant: "Max",
        },
        {
            id: 4,

            image: "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
            distance: "100m",
            variant: "Pro",
        },
    ];

    return (
        <ImageBg flex={1} type={colorMode}>
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                }}
            >
                <VStack
                    space={4}
                    mt={TOP_PADDING + insets.top + "px"}
                    px="6"
                    pb={8}
                    h="full"
                    maxWidth={scale(500)}
                    mx="auto"
                >
                    {cars.map((car, index) => (
                        <CarCard
                            key={car.id + index}
                            subtitle={car.carModelName}
                            title={car.variant}
                            image={car.image}
                            distance={car.distance}
                        />
                    ))}
                </VStack>
            </Scroller>
        </ImageBg>
    );
}