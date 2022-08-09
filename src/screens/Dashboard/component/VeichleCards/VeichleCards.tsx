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
        image: require("../../../../../assets/images/bicycle.png"),
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

    const currentVeichle = veichels.find(
        (veichle) => veichle.id === selectedVeichle
    );

    return (
        <VStack maxW={350} px={2}>
            <ThreeSwitch
                leftTitle="Scooter"
                rightTitle="Car"
                middleTitle="Bicycle"
                onPress={(current) => setSelectedVeichle(current)}
            />

            {currentVeichle && (
                <VCard
                    title={currentVeichle?.title}
                    availableNumber={currentVeichle?.availableNumber}
                    distance={currentVeichle?.distance}
                    image={currentVeichle?.image}
                    entering={FlipInYRight}
                    exiting={FlipOutYLeft}
                />
            )}
            <OutlineButton
                mt={4}
                title={"Select"}
                titleStyle={{ mx: "auto" }}
                onPress={() =>
                    navigation.navigate("DocumentSubmission", {
                        veichle: currentVeichle,
                    })
                }
            />
        </VStack>
    );
}
