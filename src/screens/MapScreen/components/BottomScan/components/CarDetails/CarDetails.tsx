import {
    Actionsheet,
    Button,
    HStack,
    Text,
    VStack,
    Factory,
} from "native-base";
import React from "react";

import carSmall from "../../../../../../../assets/images/car-small.png";
import motor from "../../../../../../../assets/images/motor.png";
import ringBell from "../../../../../../../assets/images/ring-bell.png";
import SwitchToUnlock from "../../../../../../components/SwitchToUnlock/SwitchToUnlock";
import CarDescriptionCard from "../../../common/CarDescriptionCard/CarDescriptionCard";

import { Image } from "react-native";

const images = {
    carSmall,
    motor,
};

interface ICarDetails {
    id: string;
    type: "carSmall" | "motor";
    avaiableDistance: string;
    availeTime: string;
    availableBattery: string;
    onClose: () => void;
    isOpen: boolean;
}

export default function CarDetails({
    id,
    type,
    avaiableDistance,
    availeTime,
    availableBattery,
    onClose,
    isOpen,
    ...rest
}: ICarDetails) {
    const RnImage = Factory(Image);

    return (
        <Actionsheet disableOverlay isOpen={isOpen} onClose={onClose} {...rest}>
            <Actionsheet.Content
                p={4}
                _dragIndicator={{
                    bg: "light.100",
                    borderRadius: 8,
                }}
            >
                <HStack space="6" w="full" p={4} alignItems="flex-end">
                    <RnImage
                        source={images[type] || carSmall}
                        alt="car-small"
                        resizeMode="contain"
                        w="120px"
                        h="80px"
                    />
                    <Text fontWeight={600} fontSize={13}>
                        ID: {id}
                    </Text>
                    <HStack space="2" w="full" px={4} alignItems="flex-end">
                        <RnImage
                            w="16px"
                            h="18px"
                            resizeMode="contain"
                            source={ringBell}
                            alt="ring bell"
                        />
                        <Text fontWeight={600} fontSize={13}>
                            Ring
                        </Text>
                    </HStack>
                </HStack>

                <CarDescriptionCard
                    bettaryTitle={availableBattery}
                    locationTitle={avaiableDistance}
                    timeTitle={availeTime}
                    px={8}
                />
                <Text color={"gray.100"} fontWeight={700} fontSize={13}>
                    3 km 5 QAR
                </Text>
                <VStack mt={4} mb={5} w={"full"} space="4">
                    <SwitchToUnlock />
                    <Button
                        bg="red.100"
                        _pressed={{ bg: "red.800" }}
                        w="120px"
                        borderRadius={30}
                        mx="auto"
                        _text={{
                            color: "white",
                            fontWeight: "700",
                            fontSize: 13,
                            textTransform: "uppercase",
                        }}
                        color={"#fff"}
                    >
                        End Ride
                    </Button>
                </VStack>
            </Actionsheet.Content>
        </Actionsheet>
    );
}
