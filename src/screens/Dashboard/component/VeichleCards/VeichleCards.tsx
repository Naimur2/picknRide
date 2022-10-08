import React from "react";
import Animated, {
    FadeIn,
    FadeOut,
    FlipInYRight,
    FlipOutYLeft,
    FlipOutYRight,
} from "react-native-reanimated";
import OutlineButton from "../../../../components/OutlineButton/OutlineButton";
import ThreeSwitch from "../../../../components/ThreeSwitch/ThreeSwitch";
import VeichleCard, { IVeichleCardProps } from "../VeichleCard/VeichleCard";
import { VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import useAuth from "../../../../hooks/useAuth";
import * as Location from "expo-location";
import { LocationPermissionResponse } from "expo-location";

const veichels: IVeichleCardProps[] = [
    {
        id: "1",
        title: "Lusail Marina, Lusail",
        availableNumber: "4",
        distance: "150m",
        image: require("../../../../../assets/images/scooter.png"),
    },
    {
        id: "2",
        title: "Lusail Marina, Lusail",
        availableNumber: "4",
        distance: "150m",
        image: require("../../../../../assets/images/bi-cycle.png"),
    },
    {
        id: "3",
        title: "Lusail Marina, Lusail",
        availableNumber: "4",
        distance: "150m",
        image: require("../../../../../assets/images/car.png"),
    },
];

export default function VeichleCards() {
    const [selectedVeichle, setSelectedVeichle] = React.useState("1");
    const VCard = Animated.createAnimatedComponent(VeichleCard);
    const navigation = useNavigation();
    const { user } = useAuth();

    const currentVeichle = veichels.find(
        (veichle) => veichle.id === selectedVeichle
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

    return (
        <VStack w={scale(310)} px={2} alignItems="center">
            <ThreeSwitch
                leftTitle="Scooter"
                rightTitle="Car"
                centerTitle="Cycle"
                onPress={(current) => setSelectedVeichle(current)}
            />

            {currentVeichle && (
                <VCard
                    title={currentVeichle?.title}
                    availableNumber={currentVeichle?.availableNumber}
                    distance={currentVeichle?.distance}
                    image={currentVeichle?.image}
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
