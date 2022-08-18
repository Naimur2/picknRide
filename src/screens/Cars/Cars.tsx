import { useNavigation } from "@react-navigation/native";
import { Text, useColorMode, VStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Balance from "../../components/Balance/Balance";
import CarCard from "../../components/CarCard/CarCard";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";

export default function Cars() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const insets = useSafeAreaInsets();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Cars" />,
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
            carModelName: "Sedan",
            image: "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
            distance: "100m",
            variant: "Max",
        },
        {
            id: 2,
            carModelName: "Sedan",
            image: "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
            distance: "100m",
            variant: "Pro",
        },
        {
            id: 3,
            carModelName: "Sedan",
            image: "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
            distance: "100m",
            variant: "Starter",
        },
        {
            id: 3,
            carModelName: "Sedan",
            image: "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
            distance: "100m",
            variant: "Max",
        },
        {
            id: 4,
            carModelName: "Sedan",
            image: "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
            distance: "100m",
            variant: "Pro",
        },
        {
            id: 6,
            carModelName: "Sedan",
            image: "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
            distance: "100m",
            variant: "Starter",
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
