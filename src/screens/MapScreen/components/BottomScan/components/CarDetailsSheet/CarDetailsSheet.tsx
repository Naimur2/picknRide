import { Button, Factory, HStack, Text, VStack } from "native-base";
import React from "react";

import carSmall from "../../../../../../../assets/images/car-small.png";
import motor from "../../../../../../../assets/images/motor.png";
import ringBell from "../../../../../../../assets/images/ring-bell.png";
import CarDescriptionCard from "../../../common/CarDescriptionCard/CarDescriptionCard";

import { Image } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import SwitchToUnlock from "../../../../../../components/SwitchToUnlock/SwitchToUnlock";
import WarningModal from "../../../../../../components/WarningModal/WarningModal";

const images = {
    carSmall,
    motor,
};

interface ICarDetails extends SheetProps {
    carId: string;
    type: "carSmall" | "motor";
    avaiableDistance: string;
    availeTime: string;
    availableBattery: string;
    sheetId: string;
}

function CarDetailsSheet({
    carId,
    type,
    avaiableDistance,
    availeTime,
    availableBattery,
    sheetId,
    ...rest
}: ICarDetails) {
    const RnImage = Factory(Image);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isLocked, setIsLocked] = React.useState(false);

    const handleShowModal = (status) => {
        if (status !== isLocked) {
            setIsModalVisible(true);
            setIsLocked(status);
        }
    };

    return (
        <ActionSheet
            id={sheetId}
            closable={false}
            backgroundInteractionEnabled={true}
            {...rest}
        >
            <VStack w="full" p="4">
                <HStack space="6" w="full" p={4} alignItems="flex-end">
                    <RnImage
                        source={images[type] || carSmall}
                        alt="car-small"
                        resizeMode="contain"
                        w="120px"
                        h="80px"
                    />
                    <Text fontWeight={600} fontSize={13}>
                        ID: {carId}
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
                <Text
                    textAlign={"center"}
                    color={"gray.100"}
                    fontWeight={700}
                    fontSize={13}
                >
                    3 km 5 QAR
                </Text>
                <SwitchToUnlock setStatus={handleShowModal} />
                <VStack mt={4} mb={5} w={"full"} space="4">
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
            </VStack>
            {isModalVisible ? (
                <WarningModal
                    setIsVisible={() => setIsModalVisible(false)}
                    isVisible={isModalVisible}
                    variant={isLocked ? "locked" : "unlocked"}
                />
            ) : null}
        </ActionSheet>
    );
}

export default React.memo(CarDetailsSheet);
