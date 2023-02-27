import GradientBtn from "@components/GradientBtn/GradientBtn";
import Scroller from "@components/Scroller/Scroller";
import config from "@config";
import { useNavigation } from "@react-navigation/native";
import { useValidateCarTripRequestMutation } from "@store/api/v2/tripApi/tripApiSlice";
import { Camera } from "expo-camera";
import {
    CameraType,
    FlashMode,
    ImageType,
} from "expo-camera/build/Camera.types";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import {
    Center,
    Factory,
    Image,
    Input,
    Text,
    Toast,
    VStack,
} from "native-base";
import { Platform, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import CaptureBtns from "./CaptureBtns/CaptureBtns";
import { IValidateCarTripData } from "./ScanQrCode.types";

import ErrorToast from "@components/ErrorToast/ErrorToast";
import WarningModal from "@components/WarningModal/WarningModal";
import { setCurrentForm } from "@store/features/auth/authSlice";
import { setLoading, setStartOrEndRide } from "@store/features/ui/uiSlice";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { IMyFatooraRouteParams } from "../../MyFatooraScreens/types/myfatoora.interface";
import PaymentTimer from "@screens/MyFatooraScreens/components/PaymentTimer";
import { HStack } from "native-base";

export default function ScanQrCode() {
    const navigation = useNavigation();

    const [cameraPhoto, setCameraPhoto] = React.useState<any>(null);
    const [imageUri, setImageUri] = React.useState<string>("");
    const [isOpenTorch, setIsOpenTorch] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const [showWarningModal, setShowWarningModal] =
        React.useState<boolean>(false);
    const LinGrad = Factory(LinearGradient);
    const inputRef = React.useRef<any>(null);

    const [warningVariant, setWarningVariant] = useState<
        "approved" | "pending" | "rejected" | "expired" | "required"
    >("approved");

    const [validateCarTrip, validationResult] =
        useValidateCarTripRequestMutation();

    const handleNavigation = (tripData: IValidateCarTripData | null) => {
        if (!config.DEV_MODE && tripData) {
            dispatch(setStartOrEndRide("start"));
            navigation.navigate("StartEndRide", {
                data: tripData,
                type: "START",
            });
        } else {
            const data: IValidateCarTripData = {
                isValidVehicle: true,
                vehicleNo: "123456",
                tripToken: "123456",
            };
            // navigation.navigate("StartEndRide", {
            //     type: "START",
            //     data: data,
            // });
        }
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerShown: false,
            unmountOnBlur: true,
        });
    }, [navigation]);

    const errorHandler = (error: {
        code: 701 | 712 | 715 | 711 | 702 | 703 | 704 | 706 | 707 | 708;
        message: string;
    }) => {
        switch (error.code) {
            case 701:
                Toast.show({
                    id: "errorToast",
                    render: () => <ErrorToast message={error.message} />,
                    placement: "top",
                });

                navigation.navigate("MFPayment", {
                    amount: 250,
                } as IMyFatooraRouteParams);
                break;
            case 712:
            case 707:
                setWarningVariant("required");
                setShowWarningModal(true);
                break;
            case 715:
                setWarningVariant("pending");
                setShowWarningModal(true);
                break;
            case 711:
                setWarningVariant("expired");
                setShowWarningModal(true);
                break;
            case 702:
            case 703:
            case 704:
            case 706:
                Toast.show({
                    id: "errorToast",
                    render: () => <ErrorToast message={error.message} />,
                    placement: "top",
                });
                break;
            case 708:
                const numbers = error?.message?.match?.(/\d+/g)?.map?.(Number);
                const amount = numbers?.[1] || 250;
                navigation.navigate("MFPayment", {
                    amount: amount,
                });
                break;
            default:
                Toast.show({
                    id: "errorToast",
                    render: () => (
                        <ErrorToast
                            message={error?.message || "Something Went wrong"}
                        />
                    ),
                    placement: "top",
                });
                break;
        }
    };

    const camRef = React.useRef<Camera>(null);

    const takePicture = React.useCallback(async () => {
        if (camRef.current) {
            const photo = await camRef.current.takePictureAsync({
                base64: true,
                quality: 0.1,
                imageType: ImageType.jpg,
            });

            dispatch(setLoading(true));
            setCameraPhoto(photo.base64);
            setImageUri(photo.uri);

            await handleSubmit(photo.base64);

            dispatch(setLoading(false));
        }
    }, []);

    const handleReset = React.useCallback(() => {
        setCameraPhoto(null);
    }, []);

    async function handleSubmit(nameplateImage?: string) {
        const { status, granted } =
            await Location.getForegroundPermissionsAsync();

        if (status !== "granted" || !granted) {
            alert("Permission to access location was denied");
        } else if (!imageUri && !inputRef?.current) {
            alert("Image or number is required");
        } else {
            if (!config.DEV_MODE) {
                const location = await Location.getCurrentPositionAsync({});
                const imageData = {
                    numberPlateImage: nameplateImage,
                    vehicleNo: inputRef?.current as string,
                    mobileLatitude: location.coords.latitude,
                    mobileLongitude: location.coords.longitude,
                };

                const res = await validateCarTrip(imageData).unwrap();

                if (!res?.succeeded && res?.error) {
                    errorHandler(res?.error);
                } else {
                    handleNavigation(res?.data);
                }
            } else {
                console.log("DEV MODE");
            }
        }
    }

    const toggleTorch = () => {
        setIsOpenTorch((prev) => !prev);
    };

    const handleToglewarning = () => {
        if (
            warningVariant === "rejected" ||
            warningVariant === "expired" ||
            warningVariant === "required"
        ) {
            setShowWarningModal(false);
            navigation.navigate("DocumentSubmission");
            dispatch(setCurrentForm(1));
        } else {
            setShowWarningModal(false);
        }
    };
    const insets = useSafeAreaInsets();
    console.log("insets", insets);
    return (
        <>
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
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                }}
                position="relative"
            >
                <VStack
                    space={6}
                    px="6"
                    pb={8}
                    h="full"
                    maxWidth={scale(500)}
                    mx="auto"
                    justifyContent={"center"}
                    pt={Platform.OS === "android" ? 10 : 0}
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
                    {validationResult?.data?.data?.error ? (
                        <Text
                            fontSize={13}
                            fontWeight={600}
                            color="#fff"
                            mx={"auto"}
                            textAlign={"center"}
                        >
                            {validationResult.data.data.error.messagw}
                        </Text>
                    ) : null}

                    {cameraPhoto && imageUri ? (
                        <Image
                            alt="cameraPhoto"
                            w="300"
                            h="300"
                            source={{
                                uri: imageUri,
                            }}
                        />
                    ) : null}

                    {!cameraPhoto || !imageUri ? (
                        <LinGrad
                            py={10}
                            colors={["#fff", "#FF000095"]}
                            borderRadius={30}
                            start={{ x: 0, y: 0.2 }}
                            end={{ x: 0, y: 1 }}
                            borderBottomWidth={1}
                            mx={"auto"}
                        >
                            <VStack w={"300px"} h="300px" mx={"auto"}>
                                <Camera
                                    style={StyleSheet.absoluteFillObject}
                                    ref={camRef}
                                    type={CameraType.back}
                                    flashMode={
                                        isOpenTorch
                                            ? FlashMode.torch
                                            : FlashMode.off
                                    }
                                />
                            </VStack>
                        </LinGrad>
                    ) : null}

                    <CaptureBtns
                        takePicture={takePicture}
                        handleReset={handleReset}
                        handleSubmit={() => handleSubmit(cameraPhoto)}
                        showTakePictureBtn={!cameraPhoto || !imageUri}
                        hideButtons={validationResult.isLoading}
                        toggleTorch={toggleTorch}
                    />

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
                            onChangeText={(text) => (inputRef.current = text)}
                        />
                    </VStack>

                    <Center>
                        <GradientBtn
                            onPress={() => handleSubmit(cameraPhoto)}
                            title="Submit Manually"
                            disabled={validationResult.isLoading}
                        />
                    </Center>
                    <WarningModal
                        variant={warningVariant}
                        isVisible={showWarningModal}
                        setIsVisible={handleToglewarning}
                    />
                </VStack>
            </Scroller>
        </>
    );
}
