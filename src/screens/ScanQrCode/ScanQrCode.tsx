import { useNavigation, useIsFocused } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { Factory, Image, Input, Text, VStack, Pressable } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import scanBg from "../../../assets/images/scan-bg.png";
import torch from "../../../assets/images/torch.png";
import Card from "../../components/Card/Card";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";

export default function ScanQrCode() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [hasPermission, setHasPermission] = React.useState(null);
    const [flash, setFlash] = React.useState(Camera.Constants.FlashMode.off);

    const [scanned, setScanned] = React.useState(false);
    const [scannedData, setScannedData] = React.useState("");
    const ImageBg = Factory(ImageBackground);
    const isFocused = useIsFocused();

    const LinGrad = Factory(LinearGradient);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <HeaderTitle color="#fff" title="Scan qr code" />
            ),
            headerTitleAlign: "center",
            headerLeft: null,
        });
    }, [navigation]);

    const camRef = React.useRef<Camera>(null);

    React.useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setScannedData(data);
    };

    if (hasPermission === null) {
        return (
            <VStack
                space={6}
                mt={TOP_PADDING + insets.top + "px"}
                px="6"
                pb={8}
                h="full"
                maxWidth={scale(500)}
                mx="auto"
            >
                <Text my={"auto"}>Requesting for camera permission</Text>
            </VStack>
        );
    }

    if (hasPermission === false) {
        return (
            <VStack
                space={6}
                mt={TOP_PADDING + insets.top + "px"}
                px="6"
                pb={8}
                h="full"
                maxWidth={scale(500)}
                mx="auto"
            >
                <Text my={"auto"}>No access to Camera</Text>
            </VStack>
        );
    }

    const handleCameraFlash = () => {
        if (flash === Camera.Constants.FlashMode.off) {
            setFlash(Camera.Constants.FlashMode.on);
        } else {
            setFlash(Camera.Constants.FlashMode.off);
        }
    };

    return (
        <ImageBg source={scanBg} flex="1" resizeMode="cover">
            <VStack
                w="full"
                h="full"
                position={"absolute"}
                bg="#5AB94795"
                zIndex={-1}
            />
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                }}
                position="relative"
            >
                <VStack
                    space={6}
                    mt={TOP_PADDING + insets.top + "px"}
                    px="6"
                    pb={8}
                    h="full"
                    maxWidth={scale(500)}
                    mx="auto"
                    justifyContent={"center"}
                >
                    <Text
                        fontSize={13}
                        fontWeight={600}
                        color="#fff"
                        mx={"auto"}
                        textAlign={"center"}
                    >
                        Scan number plate to proceed
                    </Text>

                    <LinGrad
                        py={16}
                        colors={["#fff", "#FF000095"]}
                        borderRadius={30}
                        start={{ x: 0, y: 0.2 }}
                        end={{ x: 0, y: 1 }}
                        borderBottomWidth={1}
                        mx={"auto"}
                    >
                        <VStack w="280px" h="150px">
                            <Camera
                                onBarCodeScanned={
                                    scanned ? undefined : handleBarCodeScanned
                                }
                                style={StyleSheet.absoluteFillObject}
                                ref={camRef}
                            />
                        </VStack>
                    </LinGrad>

                    <Text
                        fontSize={24}
                        fontWeight={700}
                        color="#fff"
                        mx={"auto"}
                        textAlign={"center"}
                    >
                        Place your Phone above the License Plate
                    </Text>
                    <VStack space="2">
                        <Text
                            fontSize={13}
                            fontWeight={600}
                            color="#fff"
                            mx={"auto"}
                            textAlign={"center"}
                        >
                            Enter Code Manually
                        </Text>
                        <Input
                            _focus={{
                                bg: "#BFDFBA",
                            }}
                            mb={4}
                            placeholder="Enter Code Manually"
                            bg="#BFDFBA"
                            borderRadius={15}
                        />
                    </VStack>

                    <VStack space="2" alignItems={"center"} mb={16}>
                        <Text
                            fontSize={13}
                            fontWeight={600}
                            color="#fff"
                            mx={"auto"}
                            textAlign={"center"}
                        >
                            Use Flash
                        </Text>
                        <Pressable
                            w="50px"
                            h="50px"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={30}
                            bg="#fff"
                            shadow="9"
                            onPress={handleCameraFlash}
                        >
                            <Image source={torch} alt="torch" />
                        </Pressable>
                    </VStack>
                </VStack>
            </Scroller>
        </ImageBg>
    );
}
