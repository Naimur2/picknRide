import { useNavigation } from "@react-navigation/native";
import { HStack, Image, VStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import Balance from "../../components/Balance/Balance";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";
import PriceCard from "./components/PriceCard/PriceCard";
import boyWithSooter from "../../../assets/images/boy-with-scooter.png";
import boyWithSooterDark from "../../../assets/images/boy-with-scooter-dark.png";
import GradientBtn from "../../components/GradientBtn/GradientBtn";

export default function Pricing() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Pricing" />,
            headerTitleAlign: "center",
            headerLeft: null,
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
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
                space={6}
                mt={TOP_PADDING + insets.top + "px"}
                px="6"
                pb={8}
                h="full"
                maxWidth={scale(500)}
                mx="auto"
            >
                <HStack my={8} w="full" justifyContent={"space-between"}>
                    <PriceCard
                        type="lock"
                        header="QAR 3"
                        subtitle="Unlock Charge"
                    />
                    <PriceCard
                        type="clock"
                        header="QAR 1.65"
                        subtitle="/Minute"
                    />
                </HStack>
                <Image
                    mt={4}
                    source={boyWithSooter}
                    alt="boy w s"
                    _dark={{
                        source: boyWithSooterDark,
                    }}
                />
                <GradientBtn title="UPDATE PROFILE" mx="auto" />
            </VStack>
        </Scroller>
    );
}
