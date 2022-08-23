import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Factory, HStack, Image, Pressable, VStack } from "native-base";
import React from "react";
import locate from "../../../../../assets/images/locate.png";
import scan from "../../../../../assets/images/scan.png";
import { ErrorOutline } from "../../../../components/Icons/Icons";

import { Dimensions } from "react-native";

import { SheetManager } from "react-native-actions-sheet";

function BottomScan({ onLeftPress }: { onLeftPress: () => void }) {
    const LinearGrad = Factory(LinearGradient);
    const { height } = Dimensions.get("window");

    const navigation = useNavigation();

    React.useEffect(() => {
        SheetManager.show("speedSheet");
        return () => {
            SheetManager.hide("speedSheet");
        };
    }, []);

    return (
        <VStack space="6" w="full" mt={height / 3.5 + "px"}>
            <LinearGrad
                colors={["#ffffff", "#ffffff50"]}
                start={[0, 1]}
                end={[0, 0]}
                py={6}
            >
                <HStack alignItems="flex-end" px={4}>
                    <ErrorOutline onPress={onLeftPress} />
                    <Pressable
                        mx={"auto"}
                        onPress={() => navigation.navigate("ScanQrCode")}
                    >
                        <Image source={scan} alt="scan" />
                    </Pressable>
                    <Image source={locate} alt="locate" />
                </HStack>
            </LinearGrad>
        </VStack>
    );
}

export default React.memo(BottomScan);
