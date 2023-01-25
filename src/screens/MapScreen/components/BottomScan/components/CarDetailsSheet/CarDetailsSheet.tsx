import {
    Button,
    Factory,
    HStack,
    Modal,
    Spinner,
    Text,
    Toast,
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
    useExecuteCarCommandMutation,
    useLockUnlockMutation,
} from "@store/api/v2/tripApi/tripApiSlice";
import {
    selectCarTripInfo,
    stopCarTrip,
} from "@store/features/car-trip/carTripSlice";
import { ICarTripState } from "@store/features/car-trip/carTripSlice.types";
import { ActivityIndicator, Image } from "react-native";
import ActionSheet, {
    SheetManager,
    SheetProps,
} from "react-native-actions-sheet";
import { useDispatch, useSelector } from "react-redux";
import YesNoModal from "../YesNoModal/YesNoModal";
import { Center } from "native-base";
import ErrorToast from "@components/ErrorToast/ErrorToast";

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
    const [executeComannd, executionResult] = useExecuteCarCommandMutation();
    const [enRide, result] = useEndCarTripMutation();

    const { colorMode } = useColorMode();

    const dispatch = useDispatch();

    const [isYesNoModalVisible, setIsYesNoModalVisible] = React.useState(false);
    const swipeHandlerRef = React.useRef(null);

    const onEndRide = async () => {
        try {
            if (!isLocked) {
                Toast.show({
                    id: "errorToast",
                    render: () => (
                        <ErrorToast
                            message={
                                "Please lock the car before ending the ride"
                            }
                        />
                    ),
                    placement: "top",
                });
            } else {
                const res = await enRide({
                    tripToken: carTripState.tripInfo?.tripToken as string,
                });
                setIsYesNoModalVisible(false);
                if (res.data) {
                    dispatch(stopCarTrip());
                }
            }
        } catch (error) {
            Toast.show({
                id: "errorToast",
                render: () => (
                    <ErrorToast
                        message={"Error ending the ride. Please try again"}
                    />
                ),
                placement: "top",
            });
        }
    };

    const handleShowModal = async (status) => {
        try {
            console.log(status);
            const res = await setLockStatus({
                tripToken: carTripState.tripInfo?.tripToken as string,
                lock: status,
            });
            if (res.succeeded) {
                if (!res?.data?.status) {
                    const ids = res?.data?.commandStatus.map((item) => item.id);
                    const commandResult = await executeComannd({ ids });
                    if (commandResult.succeeded) {
                        const hasTimedOut =
                            commandResult?.data?.map((cmd) => cmd.status === 3)
                                .length > 0;
                        if (hasTimedOut) {
                            // setIsModalVisible(true);
                            // setIsLocked(status);
                            swipeHandlerRef.current?.resetStatus(
                                status === true ? false : true
                            );
                            Toast.show({
                                id: "locktimeout",
                                render: () => (
                                    <ErrorToast
                                        message={"Please try again later"}
                                    />
                                ),
                                placement: "top",
                            });
                        } else {
                            setIsLocked(status);
                            setIsModalVisible(true);
                        }
                    }
                } else {
                    setIsLocked(status);
                    setIsModalVisible(true);
                }
            } else {
                swipeHandlerRef.current?.resetStatus(
                    status === true ? false : true
                );
                Toast.show({
                    id: "locktimeout",
                    render: () => (
                        <ErrorToast message={"Please try again later"} />
                    ),
                    placement: "top",
                });
            }
        } catch (error) {
            Toast.show({
                id: "locktimeout",
                render: () => <ErrorToast message={"Please try again later"} />,
                placement: "top",
            });
        }
    };

    const isLoading =
        lockResult.isLoading || executionResult.isLoading || result.isLoading;

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
                    <SwitchToUnlock
                        ref={swipeHandlerRef}
                        setStatus={handleShowModal}
                    />
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
                                if (!isLocked) {
                                    alert("Please lock the car first");
                                } else {
                                    SheetManager.hide("carDetailsSheet");
                                    setIsYesNoModalVisible(true);
                                }
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
            <Modal isOpen={isLoading}>
                <Center h="full" w="full" bg="#ffffff60">
                    <Spinner size="lg" color="#0000ff" />
                    <Text color={"#000"} fontWeight={700} mt={4}>
                        Wait a moment
                    </Text>
                </Center>
            </Modal>
        </>
    );
}

export default React.memo(CarDetailsSheet);
