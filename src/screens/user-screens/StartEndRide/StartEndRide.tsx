import Toggler from "@assets/svgs/Toggler";
import ErrorToast from "@components/ErrorToast/ErrorToast";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import TopSection from "@components/TopSection/TopSection";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import config from "@config";
import { useNavigation, useRoute } from "@react-navigation/native";
import RideCompleteModal from "@screens/MapScreen/components/RideCompleteModal/RideCompleteModal";
import {
    useEndCarTripMutation,
    useUploadCarImageMutation,
} from "@store/api/v2/tripApi/tripApiSlice";
import { IUploadCarImages } from "@store/api/v2/tripApi/tripApiSlice.types";
import { stopCarTrip } from "@store/features/car-trip/carTripSlice";
import { selectStartOrEndRide } from "@store/features/ui/uiSlice";
import { convertPickerImageToBase64 } from "@utils/convertToBase64";
import { useFormik } from "formik";
import {
    Center,
    Factory,
    HStack,
    Toast,
    VStack,
    useColorMode,
} from "native-base";
import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { IValidateCarTripData } from "../ScanQrCode/ScanQrCode.types";
import { IStartEndTripParams } from "./StartEnTrip.types";
import UploadImg from "./UploadImg/UploadImg";

export default function StartEndRide() {
    const navigation = useNavigation();
    const params = useRoute().params as {
        data: IValidateCarTripData;
        type: "START" | "END";
    };
    const { colorMode } = useColorMode();

    const Touchable = Factory(TouchableOpacity);
    // const params = useRoute().params as IStartEndTripParams;
    const [uploadImage, result] = useUploadCarImageMutation();
    const [enRide, endRideResult] = useEndCarTripMutation();
    const dispatch = useDispatch();
    const startOrEnd = useSelector(selectStartOrEndRide);
    const [showRideComplete, setShowRideComplete] = React.useState(false);
    console.log(
        endRideResult ? JSON.stringify(endRideResult) : "no endRideResult"
    );
    const onEndRide = async (tripToken: string) => {
        try {
            const res = await enRide({
                tripToken: tripToken ? tripToken : params?.data?.tripToken,
            }).unwrap();

            if (res.data) {
                dispatch(stopCarTrip());
                setShowRideComplete(true);
            }

            if (res.error) {
                Toast.show({
                    id: "errorToast",
                    render: () => (
                        <ErrorToast
                            message={
                                res?.error?.message || "Error ending the ride"
                            }
                        />
                    ),
                    placement: "top",
                });
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

    const schema = Yup.object().shape({
        frontImage: Yup.string().required("Required"),
        backImage: Yup.string().required("Required"),
        leftSideImage: Yup.string().required("Required"),
        rightSideImage: Yup.string().required("Required"),
    });

    const initialState: IUploadCarImages = {
        frontImage: "",
        backImage: "",
        leftSideImage: "",
        rightSideImage: "",
        tripToken: params.data.tripToken,
        vehicleNo: params.data.vehicleNo,
    };

    const formik = useFormik({
        initialValues: initialState,
        onSubmit: async (values) => {
            const front = await convertPickerImageToBase64(values.frontImage);
            const back = await convertPickerImageToBase64(values.backImage);
            const left = await convertPickerImageToBase64(values.leftSideImage);

            const right = await convertPickerImageToBase64(
                values.rightSideImage
            );
            let resData: IUploadCarImages = {};

            if (!config.DEV_MODE) {
                resData = {
                    frontImage: front,
                    backImage: back,
                    leftSideImage: left,
                    rightSideImage: right,
                    tripToken: values.tripToken,
                    vehicleNo: values.vehicleNo,
                    tripAction:
                        startOrEnd === "start" ? "StartTrip" : "EndTrip",
                };
            }
            let res = await uploadImage(resData).unwrap();

            if (res?.error?.message) {
                Alert.alert("Error", res?.error?.message, [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]);
            } else {
                if (res?.succeeded && res?.data?.tripToken) {
                    if (startOrEnd === "start") {
                        const paramsData: IStartEndTripParams = {
                            ...params,
                            data: {
                                ...params.data,
                                tripToken: res.data.tripToken,
                            },
                        };

                        navigation.navigate("SelectOtpType", paramsData);
                    } else {
                        onEndRide(res?.data?.tripToken);
                    }
                } else {
                    alert("Token required");
                }
            }
        },
        validationSchema: schema,
    });

    const { values, handleSubmit, errors, setFieldValue } = formik;

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerStyle: {
                alignItems: "center",
            },
            headerLeft: () => (
                <Touchable onPress={() => navigation.openDrawer()}>
                    <Toggler
                        mx={4}
                        _dark={{
                            color: "#000",
                        }}
                    />
                </Touchable>
            ),
            headerRight: () => <UserAvatar />,
        });
    }, [navigation]);

    const setFieldImage = async (
        fieldName:
            | "frontImage"
            | "backImage"
            | "leftSideImage"
            | "rightSideImage",
        value: string
    ) => {
        if (value) {
            // const base64 = await convertToBase64(value);
            // convert image picker uri into base64 using expo library

            setFieldValue(fieldName, value);
        }
    };

    const handleStartRide = () => {
        // if (!isChecked.current) {
        //     alert("Please agree terms and condition");
        //     return;
        // }
        if (Object.keys(errors).length !== 0) {
            alert("Please upload all images");
            return;
        }
        handleSubmit();
    };

    console.log(values);

    return (
        <ImageBg type={colorMode}>
            <Scroller
                contentStyle={{
                    alignItems: "center",
                    flexGrow: 1,
                }}
            >
                <>
                    <TopSection
                        title="Upload photos
                        to end ride."
                        subtitle="Please upload 4 photos to end ride"
                    />

                    <VStack mt={8} px={6} space={4} w="full">
                        <HStack mt={4} justifyContent="space-between">
                            <UploadImg
                                setImage={(image) =>
                                    setFieldImage("frontImage", image)
                                }
                                imageLink={values.frontImage}
                                imgTitle="Front"
                            />
                            <UploadImg
                                setImage={(image) =>
                                    setFieldImage("backImage", image)
                                }
                                imageLink={values.backImage}
                                imgTitle="Back"
                            />
                        </HStack>
                        <HStack mt={4} justifyContent="space-between">
                            <UploadImg
                                setImage={(image) =>
                                    setFieldImage("leftSideImage", image)
                                }
                                imageLink={values.leftSideImage}
                                imgTitle="Left"
                            />
                            <UploadImg
                                setImage={(image) =>
                                    setFieldImage("rightSideImage", image)
                                }
                                imageLink={values.rightSideImage}
                                imgTitle="Right"
                            />
                        </HStack>
                        <Center>
                            {/* <HStack space="2" mt={12}>
                                <Pressable
                                    onPress={() =>
                                        (isChecked.current =!isChecked.current)
                                    }
                                >
                                    <CheckBox isChecked={isChecked.current} />
                                </Pressable>
                                <Text
                                    _dark={{
                                        color: "#fff",
                                    }}
                                >
                                    Agree terms and condition
                                </Text>
                            </HStack> */}
                            <GradientBtn
                                onPress={handleStartRide}
                                mt="5"
                                mb={8}
                                title={
                                    startOrEnd === "start"
                                        ? "Start Ride"
                                        : "End Ride"
                                }
                                disabled={result.isLoading}
                            />
                        </Center>
                    </VStack>
                </>
                {showRideComplete ? (
                    <RideCompleteModal
                        isOpen={showRideComplete}
                        onClose={() => {
                            navigation.navigate("MapScreen");
                            setShowRideComplete(false);
                        }}
                    />
                ) : null}
            </Scroller>
        </ImageBg>
    );
}
