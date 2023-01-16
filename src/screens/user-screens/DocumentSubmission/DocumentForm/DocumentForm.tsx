import CheckBox from "@components/CheckBox/CheckBox";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import H3 from "@components/H3/H3";
import OutlineButton from "@components/OutlineButton/OutlineButton";
import { useNavigation } from "@react-navigation/native";
import {
    EDocumentType,
    TDDocumentType,
} from "@store/api/v2/documentApi/documentApiSlice.types";
import { IAuthState } from "@store/features/auth/authSlice.types";
import { setDocumentFieldValue } from "@store/features/document/documentSlice";
import { selectAuth } from "@store/store";
import { Camera } from "expo-camera";

import * as MediaLibrary from "expo-media-library";
import {
    Center,
    Factory,
    FormControl,
    HStack,
    Input,
    Text,
    Toast,
    VStack,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

import ErrorToast from "@components/ErrorToast/ErrorToast";
import { useUploadDocumentMutation } from "@store/api/v2/documentApi/documentApiSlice";
import CountryPicker from "react-native-country-picker-modal";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectAllDocumentFieldValues } from "../../../../redux/features/document/documentSlice";
import { createFormFile } from "../../../../utils/fileDetails";
import AddImage from "../AddImage/AddImage";
import ExpiryDate from "./ExpiryDate/ExpiryDate";
import PickerButton from "./PickerButton/PickerButton";
import Signature from "./Signature/Signature";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import YesNo from "./YesNo/YesNo";

const FormLabel = ({ title }: { title: string }) => (
    <FormControl.Label
        fontSize={12}
        color="gray.400"
        _dark={{ color: "#fff" }}
        fontWeight={500}
    >
        {title}
    </FormControl.Label>
);

function DocumentForm() {
    const [show, setShow] = React.useState(false);
    const [termAccept, setTermAccept] = React.useState(false);
    const Touchable = Factory(TouchableOpacity);
    const [errors, setErrors] = React.useState({});

    const navigation = useNavigation();
    const auth = useSelector(selectAuth);
    const values = useSelector(selectAllDocumentFieldValues);

    const dispatch = useDispatch();

    const [submitDocument, result] = useUploadDocumentMutation();

    const setFieldValue = (field: string, value: any) => {
        dispatch(setDocumentFieldValue({ fieldName: field, value }));
    };

    const { resident_status } = auth as IAuthState;

    const firstDocumentTypes: {
        [key: number]: TDDocumentType;
    } = {
        0: "Address",
        1: "Passport",
    };

    const userTypes = {
        "0": "Residence",
        "1": "Tourist",
    };

    const userType =
        userTypes[resident_status as keyof typeof userTypes] ?? "Residence";

    const schema = Yup.object().shape({
        docId1: Yup.number().required("Required"),
        expiry1: Yup.string().required("Required"),
        frontImage1: Yup.string().required("Required"),
        backImage1: Yup.string().required("Required"),
        docId2: Yup.number().required("Required"),
        expiry2: Yup.string().required("Required"),
        frontImage2: Yup.string().required("Required"),
        backImage2: Yup.string().required("Required"),
        signature: Yup.string().required("Required"),
        country: Yup.string().required("Required"),
        selfieVideo: Yup.string().required("Required"),
    });

    const errorValidation = async () => {
        try {
            await schema.validate(values, { abortEarly: false });
            return {};
        } catch (err: any | Yup.ValidationError) {
            const errors: { [key: string]: string } = {};
            err.inner.forEach((error: any) => {
                errors[error.path] = error.message;
            });
            return errors;
        }
    };

    const handleSubmit = async () => {
        try {
            const document1Expiry = new Date(values.expiry1);
            const document2Expiry = new Date(values.expiry2);

            const document1Form = new FormData();
            document1Form.append("UserType", userType);
            document1Form.append(
                "DocumentType",
                firstDocumentTypes[resident_status as "0" | "1"] ?? "Address"
            );
            document1Form.append("DocId", values.docId1.toString());
            document1Form.append("Expiry", document1Expiry.toISOString());
            document1Form.append("Country", values.country);
            document1Form.append(
                "FrontImage",
                createFormFile(values.frontImage1) as any
            );
            document1Form.append(
                "BackImage",
                createFormFile(values.backImage1) as any
            );
            const document2Form = new FormData();
            document2Form.append("UserType", userType);
            document2Form.append("DocumentType", EDocumentType.Licence);
            document2Form.append("DocId", values.docId1.toString());
            document2Form.append("Expiry", document2Expiry.toISOString());
            document2Form.append("Country", values.country);
            document2Form.append(
                "FrontImage",
                createFormFile(values.frontImage1) as any
            );
            document2Form.append(
                "BackImage",
                createFormFile(values.backImage1) as any
            );
            document2Form.append(
                "InternationalLicence",
                values.isIntlLiscense.toString()
            );

            // formdata for signature
            const document3 = new FormData();
            document3.append("UserType", userType);
            document3.append("DocumentType", "Signature");
            document3.append(
                "Signature",
                createFormFile(values.signature) as any
            );
            document3.append(
                "FrontImage",
                createFormFile(values.signature) as any
            );
            document3.append("Expiry", document2Expiry.toISOString());

            // formdata for selfie video
            const document4 = new FormData();
            document4.append("UserType", userType);
            document4.append("DocumentType", "SelfieVideo");
            document4.append(
                "FrontImage",
                createFormFile(values.selfieVideo, "video") as any
            );
            document4.append("Expiry", document2Expiry.toISOString());

            const res1 = await submitDocument(document1Form).unwrap();
            const res2 = await submitDocument(document2Form).unwrap();
            const res3 = await submitDocument(document3).unwrap();
            const res4 = await submitDocument(document4).unwrap();

            console.log(res1?.succeeded, res2?.succeeded);

            if (res1?.error) {
                alert(res1.error);
            }

            if (res2?.error) {
                alert(res2.error);
            }

            if (
                res1?.succeeded &&
                res2?.succeeded &&
                res3?.succeeded &&
                res4?.succeeded &&
                res1?.error === null &&
                res2?.error === null &&
                res3?.error === null &&
                res4?.error === null
            ) {
                alert(
                    "Documents uploaded successfully, please wait for approval"
                );
                navigation.navigate("VarificationStatus");
            }
        } catch (error) {
            console.warn(error);
            alert(error.message ?? "Something went wrong");
        }
    };

    const handleRecoder = async () => {
        try {
            const cameraPermission =
                await Camera.requestCameraPermissionsAsync();
            const microphonePermission =
                await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermission =
                await MediaLibrary.requestPermissionsAsync();
            if (
                cameraPermission.status === "granted" &&
                microphonePermission.status === "granted" &&
                mediaLibraryPermission.status === "granted"
            ) {
                navigation.navigate("CameraView");
            } else {
                alert("Permission not granted");
            }
        } catch (err) {
            setError(err);
        }
    };

    const submitForm = async () => {
        if (!termAccept) {
            Toast.show({
                id: "otpError",
                render: () => (
                    <ErrorToast
                        message={
                            "Please accept the terms and conditions to proceed"
                        }
                    />
                ),
                placement: "top",
            });
            return;
        }

        // check if all the fields are filled
        const errorsValues = await errorValidation();
        const numberOfErrors = Object.keys(errorsValues).length;
        if (numberOfErrors > 0) {
            Toast.show({
                id: "otpError",
                render: () => (
                    <ErrorToast
                        space={4}
                        w={"320px"}
                        direction={"column"}
                        textProps={{ textAlign: "center" }}
                        px={4}
                        message={
                            "Please fill all the required fields to proceed"
                        }
                    />
                ),
                placement: "top",
            });
            return;
        }

        handleSubmit();
    };

    const handleAddMedia = async ({
        fieldName,
        uri,
    }: {
        fieldName: string;
        uri: string;
    }) => {
        // const base64Image = await convertToBase64(uri);
        setFieldValue(fieldName, uri);
    };

    React.useEffect(() => {
        (async () => {
            const errorsValues = await errorValidation();
            setErrors(errorsValues);
        })();
    }, [values]);

    return (
        <VStack w={scale(300) + "px"} mx="auto" py={4}>
            <Text
                mt={4}
                fontSize={20}
                fontWeight={600}
                _dark={{
                    color: "#fff",
                }}
            >
                Documents
            </Text>

            <FormControl mt={5}>
                <FormLabel title="ID Number" />
                <Input
                    fontSize={17}
                    fontWeight={600}
                    variant="underlined"
                    borderBottomColor={"light.200"}
                    placeholder="Enter Id"
                    placeholderTextColor="gray.300"
                    keyboardType="number-pad"
                    _dark={{
                        color: "#fff",
                        placeholderTextColor: "white",
                    }}
                    onChangeText={(value) => setFieldValue("docId1", value)}
                    value={values.docId1}
                />

                {/* {errors.docId1 ? (
                    <ErrorMessage mt={"3px"}>{errors.docId1}</ErrorMessage>
                ) : null} */}
            </FormControl>

            <ExpiryDate
                onChange={(data) => {
                    setFieldValue("expiry1", data);
                }}
                date={values.expiry1 as Date}
            />
            {/* {errors.expiry1 ? (
                <ErrorMessage mt={"3px"}>{errors.expiry1}</ErrorMessage>
            ) : null} */}

            <AddImage
                frontImage={values.frontImage1}
                backImage={values.backImage1}
                setFrontImage={(img) =>
                    handleAddMedia({
                        fieldName: "frontImage1",
                        uri: img,
                    })
                }
                setBackImage={(img) =>
                    handleAddMedia({
                        fieldName: "backImage1",
                        uri: img,
                    })
                }
                title={
                    resident_status === "0"
                        ? "Upload both sides of your ID Card"
                        : "Upload both sides of your Passport"
                }
            />
            {/* {errors.frontImage1 ? (
                <ErrorMessage mt={"3px"}>{errors.frontImage1}</ErrorMessage>
            ) : null} */}
            <VStack>
                <YesNo
                    selected={values.isIntlLiscense ? "yes" : "no"}
                    setSelected={(data) => {
                        setFieldValue("hasIntlLicense", data === "yes");
                    }}
                />
            </VStack>

            <FormControl mb={2} mt={2}>
                <FormLabel title="License Issue Country" />

                <PickerButton
                    onPress={() => setShow(true)}
                    pt={0}
                    isActive={values.countryName !== ""}
                    value={values.countryName || "Select Country"}
                    divider
                />

                {show && (
                    <CountryPicker
                        onClose={() => setShow(false)}
                        visible={show}
                        onSelect={(dt) => {
                            setFieldValue("countryName", dt.name);
                            setFieldValue("country", dt.cca2);
                            setShow(false);
                        }}
                        withFilter
                    />
                )}
                {/* {errors.country ? (
                    <ErrorMessage mt={"3px"}>{errors.country}</ErrorMessage>
                ) : null} */}
            </FormControl>

            <FormControl mb={2} mt={3}>
                <FormLabel title="License Number" />
                <Input
                    fontSize={17}
                    fontWeight={600}
                    variant="underlined"
                    placeholder="Enter Id"
                    borderBottomColor={"light.200"}
                    placeholderTextColor="gray.300"
                    keyboardType="number-pad"
                    _dark={{
                        color: "#fff",
                        placeholderTextColor: "white",
                    }}
                    onChangeText={(value) => setFieldValue("docId2", value)}
                    value={values.docId2}
                />
                {/* {errors.docId2 ? (
                    <ErrorMessage mt={"3px"}>{errors.docId2}</ErrorMessage>
                ) : null} */}
            </FormControl>
            <ExpiryDate
                onChange={(data) => {
                    setFieldValue("expiry2", data);
                }}
                date={values.expiry2 as Date}
            />

            <AddImage
                frontImage={values.frontImage2}
                backImage={values.backImage2}
                setFrontImage={(img) =>
                    handleAddMedia({
                        fieldName: "frontImage2",
                        uri: img,
                    })
                }
                setBackImage={(img) =>
                    handleAddMedia({
                        fieldName: "backImage2",
                        uri: img,
                    })
                }
                title="Upload both sides of your License"
            />
            {/* 
            {errors.frontImage2 ? (
                <ErrorMessage mt={"3px"}>{errors.frontImage2}</ErrorMessage>
            ) : null} */}

            <VideoPlayer vdo={values.selfieVideo} />

            <OutlineButton
                title="Take a selfie"
                titleStyle={{
                    mx: "auto",
                }}
                mx="auto"
                onPress={handleRecoder}
            />

            <VStack>
                <H3>Signature</H3>
                <Signature
                    setSignatureValue={(data) => {
                        setFieldValue("signature", data);
                    }}
                    signatureValue={values.signature}
                />
                {/* {errors.signature ? (
                    <ErrorMessage mt={"3px"}>{errors.signature}</ErrorMessage>
                ) : null} */}
            </VStack>

            <Center>
                <HStack space="2" mt={12}>
                    <Touchable onPress={() => setTermAccept((prev) => !prev)}>
                        <CheckBox isChecked={termAccept} />
                    </Touchable>
                    <Text
                        _dark={{
                            color: "#fff",
                        }}
                    >
                        Agree terms and condition
                    </Text>
                </HStack>
                <GradientBtn
                    onPress={submitForm}
                    mt="5"
                    mb={8}
                    title="Continue"
                    disabled={result.isLoading || !termAccept}
                />
            </Center>
        </VStack>
    );
}

export default React.memo(DocumentForm);
