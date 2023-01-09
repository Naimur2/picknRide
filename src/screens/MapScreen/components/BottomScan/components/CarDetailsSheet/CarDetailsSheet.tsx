import {
    Button,
    Factory,
    HStack,
    Text,
    useColorMode,
    VStack,
} from "native-base";
import React from "react";

import carSmall from "@assets/images/car-small.png";
import motor from "@assets/images/motor.png";
import ringBell from "@assets/images/ring-bell.png";
import CarDescriptionCard from "../../../common/CarDescriptionCard/CarDescriptionCard";

import SwitchToUnlock from "@components/SwitchToUnlock/SwitchToUnlock";
import WarningModal from "@components/WarningModal/WarningModal";
import {
    useEndCarTripMutation,
    useLockUnlockMutation,
} from "@store/api/v2/tripApi/tripApiSlice";
import { Image } from "react-native";
import ActionSheet, {
    SheetManager,
    SheetProps,
} from "react-native-actions-sheet";
import { useDispatch, useSelector } from "react-redux";
import {
    selectCarTripInfo,
    stopCarTrip,
} from "@store/features/car-trip/carTripSlice";
import { ICarTripState } from "@store/features/car-trip/carTripSlice.types";
import YesNoModal from "../YesNoModal/YesNoModal";

const images = {
    carSmall,
    motor,
};

interface ICarDetails extends SheetProps {
    carId: string;
    type?: "carSmall" | "motor";
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
    const carTripState: ICarTripState = useSelector(selectCarTripInfo);
    const [setLockStatus, lockResult] = useLockUnlockMutation();

    const dispatch = useDispatch();
    const [enRide, result] = useEndCarTripMutation();

    const [isYesNoModalVisible, setIsYesNoModalVisible] = React.useState(false);

    const onEndRide = async () => {
        const res = await enRide({
            tripToken: carTripState.tripInfo?.tripToken as string,
        });
        if (res.data) {
            dispatch(stopCarTrip());
        }
    };

    const { colorMode } = useColorMode();

    const handleShowModal = async (status) => {
        await setLockStatus({
            tripToken: carTripState.tripInfo?.tripToken as string,
            lock: status,
        });
        setIsModalVisible(true);
        setIsLocked(status);
    };

    if (!carTripState?.hasStartedJourney) return <></>;

    return (
        <>
            <ActionSheet
                id={sheetId}
                closable={false}
                backgroundInteractionEnabled={true}
                containerStyle={{
                    backgroundColor: colorMode === "light" ? "#fff" : "#000",
                }}
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
                            tintColor={"#000"}
                            _dark={{ tintColor: "primary.100" }}
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
                        _dark={{
                            color: "#fff",
                        }}
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
                            onPress={() => {
                                SheetManager.hide("carDetailsSheet");
                                setIsYesNoModalVisible(true);
                            }}
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
            <YesNoModal
                isOpen={isYesNoModalVisible}
                onClose={() => {
                    SheetManager.show("carDetailsSheet");
                    setIsYesNoModalVisible(false);
                }}
                title={"Are you sure you want to end the ride?"}
                onYes={onEndRide}
            />
        </>
    );
}

export default React.memo(CarDetailsSheet);
