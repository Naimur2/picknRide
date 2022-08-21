import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Factory, HStack, Image, Pressable, VStack } from "native-base";
import React from "react";
import locate from "../../../../../assets/images/locate.png";
import scan from "../../../../../assets/images/scan.png";
import { ErrorOutline } from "../../../../components/Icons/Icons";
import GeoSheet from "./components/GeoSheet/GeoSheet";
import SelectActionSheet from "./components/SelectActionSheet/SelectActionSheet";

import CarDetails from "./components/CarDetails/CarDetails";

function BottomScan() {
    const LinearGrad = Factory(LinearGradient);
    const navigation = useNavigation();
    const [isOpenActionSheet, setIsOpenActionSheet] = React.useState(false);
    const [isOpenGeoFencingSheet, setIsOpenGeoFencingSheet] =
        React.useState(false);

    return (
        <VStack
            space="6"
            position={"absolute"}
            zIndex={10000}
            w="full"
            bottom={0}
        >
            <LinearGrad
                colors={["#ffffff", "#ffffff50"]}
                start={[0, 1]}
                end={[0, 0]}
                py={6}
            >
                <HStack alignItems="flex-end" px={4}>
                    <ErrorOutline onPress={() => setIsOpenActionSheet(true)} />
                    <Pressable
                        mx={"auto"}
                        onPress={() => navigation.navigate("ScanQrCode")}
                    >
                        <Image source={scan} alt="scan" />
                    </Pressable>
                    <Image source={locate} alt="locate" />
                </HStack>
            </LinearGrad>

            {isOpenActionSheet ? (
                <SelectActionSheet
                    isOpen={isOpenActionSheet}
                    onClose={() => {
                        setIsOpenActionSheet(false);
                    }}
                    onBtn1Press={() => {
                        setIsOpenActionSheet(false);
                        setIsOpenGeoFencingSheet(true);
                    }}
                />
            ) : null}

            {isOpenGeoFencingSheet ? (
                <GeoSheet
                    isOpen={isOpenGeoFencingSheet}
                    onClose={() => {
                        setIsOpenGeoFencingSheet(false);
                    }}
                />
            ) : null}

            <CarDetails
                isOpen={true}
                avaiableDistance={"3.2 km"}
                availeTime={"1 hour"}
                availableBattery={"100%"}
                id={"10545"}
            />
        </VStack>
    );
}

export default React.memo(BottomScan);
