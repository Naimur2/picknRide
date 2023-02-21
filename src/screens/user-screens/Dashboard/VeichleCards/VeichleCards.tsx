import OutlineButton from "@components/OutlineButton/OutlineButton";
import ThreeSwitch from "@components/ThreeSwitch/ThreeSwitch";
import config from "@config";
import useLocationPermissions from "@hooks/useLocationPermissions";
import { useNavigation } from "@react-navigation/native";
import { useCheckVerificationQuery } from "@store/api/v2/documentApi/documentApiSlice";
import { IAuthState } from "@store/features/auth/authSlice.types";
import {
    selectSelectedVeichleType,
    setSelectedVeichleType,
} from "@store/features/cars/carsSlice";
import { ECarType } from "@store/features/cars/carsSlice.types";
import { setInitialLocation } from "@store/features/user-location/userLocationSlice";
import { selectAuth } from "@store/store";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { VStack } from "native-base";
import React from "react";
import Animated, { FlipInYRight, FlipOutYLeft } from "react-native-reanimated";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import VeichleCard, { IVeichleCardProps } from "../VeichleCard/VeichleCard";
import { setLoading } from "@store/features/ui/uiSlice";
import { Platform } from "react-native";

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

    const {
        hasForeGroundPermissions,
        checkPermissions,
        hasBackGroundPermissions,
    } = useLocationPermissions();

    const currentVeichle = veichels.find(
        (veichle) => veichle.type === selectedVeichle
    );

    const handleNavigation = async () => {
        dispatch(setLoading(true));
        console.log(Platform.OS);
        if (Platform.OS === "android") {
            if (!hasForeGroundPermissions || !hasBackGroundPermissions) {
                console.log("here");
                await checkPermissions();
                dispatch(setLoading(false));
            } else {
                const initialRegion = await Location.getCurrentPositionAsync(
                    {}
                );

                console.log("initialRegion", initialRegion);

                dispatch(setInitialLocation(initialRegion.coords));

                const INTERVAL_TIME = 1000 * 30;

                //    chech if the task is already registered
                const isRegistered = await TaskManager.isTaskRegisteredAsync(
                    config.LOCATION_TASK_NAME
                );

                console.log("isRegistered", isRegistered);

                if (!isRegistered) {
                    await Location.startLocationUpdatesAsync(
                        config.LOCATION_TASK_NAME,
                        {
                            accuracy: Location.Accuracy.Balanced,
                            timeInterval: INTERVAL_TIME,
                            distanceInterval: 10,
                            showsBackgroundLocationIndicator: true,
                        }
                    );
                }

                navigation.navigate("MapScreen", {
                    veichle: currentVeichle,
                });

                dispatch(setLoading(false));
            }
        } else {
            if (!hasForeGroundPermissions) {
                console.log("here");
                await checkPermissions();
                dispatch(setLoading(false));
            } else {
                const initialRegion = await Location.getCurrentPositionAsync(
                    {}
                );

                dispatch(setInitialLocation(initialRegion.coords));

                const INTERVAL_TIME = 1000 * 30;

                //    chech if the task is already registered
                const isRegistered = await TaskManager.isTaskRegisteredAsync(
                    config.LOCATION_TASK_NAME
                );

                console.log("isRegistered", isRegistered);

                if (!isRegistered) {
                    await Location.startLocationUpdatesAsync(
                        config.LOCATION_TASK_NAME,
                        {
                            accuracy: Location.Accuracy.Balanced,
                            timeInterval: INTERVAL_TIME,
                            distanceInterval: 10,
                            showsBackgroundLocationIndicator: true,
                        }
                    );
                }

                navigation.navigate("MapScreen", {
                    veichle: currentVeichle,
                });

                dispatch(setLoading(false));
            }
        }
    };

    const handleSelection = (current: string) => {
        console.log("current", current);
        const veichleType: {
            [key: string]: ECarType;
        } = {
            1: ECarType.SCOTTER,
            2: ECarType.CYCLE,
            3: ECarType.CAR,
        };

        dispatch(setSelectedVeichleType(veichleType?.[current]));
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
