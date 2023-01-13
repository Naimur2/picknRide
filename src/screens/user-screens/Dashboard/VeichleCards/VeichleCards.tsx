import OutlineButton from "@components/OutlineButton/OutlineButton";
import ThreeSwitch from "@components/ThreeSwitch/ThreeSwitch";
import config from "@config";
import useLocationPermissions from "@hooks/useLocationPermissions";
import { useNavigation } from "@react-navigation/native";
import { IAuthState } from "@store/features/auth/authSlice.types";
import {
    selectSelectedVeichleType,
    setSelectedVeichleType,
} from "@store/features/cars/carsSlice";
import { ECarType } from "@store/features/cars/carsSlice.types";
import {
    selectHasForegroundLocationPermission,
    setCurrentLocation,
} from "@store/features/user-location/userLocationSlice";
import { selectAuth } from "@store/store";
import * as TaskManager from "expo-task-manager";
import { VStack } from "native-base";
import React from "react";
import Region from "react-native-maps";
import Animated, { FlipInYRight, FlipOutYLeft } from "react-native-reanimated";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import VeichleCard, { IVeichleCardProps } from "../VeichleCard/VeichleCard";
import * as Location from "expo-location";

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
    const auth: IAuthState = useSelector(selectAuth);

    const [clocation, setClocation] = React.useState<Region>();

    const {
        hasBackGroundPermissions,
        hasForeGroundPermissions,
        checkPermissions,
    } = useLocationPermissions();

    TaskManager.defineTask(config.LOCATION_TASK_NAME, ({ data, error }) => {
        if (error) {
            // Error occurred - check `error.message` for more details.
            return;
        }
        if (data) {
            const { locations } = data;
            console.log(locations[0].coords);
            // dispatch(
            //     setCurrentLocation({
            //         latitude: locations[0].coords.latitude,
            //         longitude: locations[0].coords.longitude,
            //     })
            // );
            // do something with the locations captured in the background
            setClocation({
                latitude: locations[0].coords.latitude,
                longitude: locations[0].coords.longitude,
            });
        }
    });

    console.log({ clocation });

    const hasForegroundLocationPermission = useSelector(
        selectHasForegroundLocationPermission
    );

    const currentVeichle = veichels.find(
        (veichle) => veichle.type === selectedVeichle
    );

    console.log(hasForegroundLocationPermission);

    const handleNavigation = async () => {
        if (!hasBackGroundPermissions || !hasForeGroundPermissions) {
            console.log("here");
            await checkPermissions();
        } else {
            const documentStatus = auth.userdocuments_status as "0" | "1";
            if (selectedVeichle === ECarType.CAR && documentStatus !== "1") {
                navigation.navigate("DocumentSubmission", {
                    veichle: currentVeichle,
                });
            } else {
                navigation.navigate("MapScreen", {
                    veichle: currentVeichle,
                });
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
