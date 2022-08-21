import React from "react";
import { VStack, HStack, Image, Factory } from "native-base";
import { ErrorOutline } from "../../../../components/Icons/Icons";
import { LinearGradient } from "expo-linear-gradient";
import locate from "../../../../../assets/images/locate.png";
import scan from "../../../../../assets/images/scan.png";

function BottomScan() {
    const LinearGrad = Factory(LinearGradient);

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
                    <ErrorOutline />
                    <Image mx={"auto"} source={scan} alt="scan" />
                    <Image source={locate} alt="locate" />
                </HStack>
            </LinearGrad>
        </VStack>
    );
}

export default React.memo(BottomScan);
