import { VStack } from "native-base";
import React from "react";
import { ICAR } from "./MapScreen.types";
import MapBox, { IMapScreenProps } from "./components/MapBox/MapBox";
import MapscreenComp, {
    IMapTopDetailsProps,
} from "./components/MapScreenComp/MapscreenComp";
import {
    selectCurrentLocation,
    setCurrentLocation,
    setInitialLocation,
} from "@store/features/user-location/userLocationSlice";
import { useSelector, useDispatch } from "react-redux";
import config from "@config";
import { Alert, Platform } from "react-native";
import * as Location from "expo-location";
import useLocationPermissions from "../../hooks/useLocationPermissions";
import { useNavigation } from "@react-navigation/native";

interface IMapProps extends IMapScreenProps, IMapTopDetailsProps {}

function ActualMap({}: IMapProps) {
    const [carType, setCarType] = React.useState<ICAR>("scooter");

    return (
        <VStack
            flex={1}
            position="relative"
            justifyContent="space-between"
            h="full"
            w="full"
            collapsable={false}
        >
            <VStack flex="1" collapsable={false}>
                <MapscreenComp type={carType} setType={(t) => setCarType(t)} />
                <MapBox />
            </VStack>
        </VStack>
    );
}

export default React.memo(ActualMap);
