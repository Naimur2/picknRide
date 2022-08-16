import { useNavigation } from "@react-navigation/native";
import { Text, useColorMode, VStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Balance from "../../components/Balance/Balance";
import CarCard from "../../components/CarCard/CarCard";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";

export default function RideHistory() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const insets = useSafeAreaInsets();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text
                    textTransform={"uppercase"}
                    color={"#000"}
                    fontSize={17}
                    fontWeight={700}
                >
                    Ride History
                </Text>
            ),
            headerTitleAlign: "center",
            headerLeft: null,
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
                    mt={80 + insets.top + "px"}
                    px="4"
                    pb={8}
                    h="full"
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
