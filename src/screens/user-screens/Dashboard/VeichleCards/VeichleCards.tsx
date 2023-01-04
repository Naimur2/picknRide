import OutlineButton from "@components/OutlineButton/OutlineButton";
import ThreeSwitch from "@components/ThreeSwitch/ThreeSwitch";
import useAuth from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { setSelectedVeichleType } from "@store/features/cars/carsSlice";
import { ECarType } from "@store/features/cars/carsSlice.types";
import * as Location from "expo-location";
import { LocationPermissionResponse } from "expo-location";
import { VStack } from "native-base";
import React from "react";
import Animated, { FlipInYRight, FlipOutYLeft } from "react-native-reanimated";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedVeichleType } from "../../../../redux/features/cars/carsSlice";
import VeichleCard, { IVeichleCardProps } from "../VeichleCard/VeichleCard";

const veichels: IVeichleCardProps[] = [
    {
        id: "1",
        title: "Lusail Marina, Lusail",
        availableNumber: "4",
        distance: "150m",
        image: require("@assets/images/scooter.png"),
        type: ECarType.SCOTTER,
    },
    {
        id: "2",
        title: "Lusail Marina, Lusail",
        availableNumber: "4",
        distance: "150m",
        image: require("@assets/images/bi-cycle.png"),
        type: ECarType.CYCLE,
    },
    {
        id: "3",
        title: "Lusail Marina, Lusail",
        availableNumber: "4",
        distance: "150m",
        image: require("@assets/images/car.png"),
        type: ECarType.CAR,
    },
];

export default function VeichleCards() {
    const dispatch = useDispatch();
    const selectedVeichle = useSelector(selectSelectedVeichleType);
    const VCard = Animated.createAnimatedComponent(VeichleCard);
    const navigation = useNavigation();
    const { user } = useAuth();

    const currentVeichle = veichels.find(
        (veichle) => veichle.type === selectedVeichle
    );

    const handleNavigation = async () => {
        if (selectedVeichle === "3" && !user.hasVerifiedDoc) {
            navigation.navigate("DocumentSubmission", {
                veichle: currentVeichle,
            });
        } else {
            // ask for location permission
            const locationStatus: LocationPermissionResponse =
                await Location.requestForegroundPermissionsAsync();

            if (locationStatus.granted && locationStatus.status === "granted") {
                const currentPosition = await Location.getCurrentPositionAsync(
                    {}
                );
                navigation.navigate("MapScreen", {
                    veichle: currentVeichle,
                });
            }
        }
    };

    const handleSelection = (current: string) => {
        const currentVeichle =
            Object.entries(ECarType)[parseInt(current) - 1][1];
        dispatch(setSelectedVeichleType(currentVeichle));
    };

    return (
        <VStack w={scale(310)} px={2} alignItems="center">
            <ThreeSwitch
                leftTitle="Scooter"
                rightTitle="Car"
                centerTitle="Cycle"
                onPress={handleSelection}
            />

            {currentVeichle && (
                <VCard
                    title={currentVeichle.title}
                    availableNumber={currentVeichle.availableNumber}
                    distance={currentVeichle.distance}
                    image={currentVeichle.image}
                    entering={FlipInYRight.duration(90)}
                    exiting={FlipOutYLeft.duration(90)}
                />
            )}
            <OutlineButton
                mt={8}
                title={"Select"}
                titleStyle={{ mx: "auto" }}
                onPress={handleNavigation}
            />
        </VStack>
    );
}
