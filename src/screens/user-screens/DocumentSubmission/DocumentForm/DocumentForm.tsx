import CheckBox from "@components/CheckBox/CheckBox";
import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import H3 from "@components/H3/H3";
import OutlineButton from "@components/OutlineButton/OutlineButton";
import { useNavigation } from "@react-navigation/native";
import { useSubmitDocumentMutation } from "@store/api/v2/documentApi/documentApiSlice";
import {
    EDocumentType,
    IUserDocumentSubmission,
    TDDocumentType,
} from "@store/api/v2/documentApi/documentApiSlice.types";
import { IAuthState } from "@store/features/auth/authSlice.types";
import { selectDocumentVideo } from "@store/features/document/documentSlice";
import { selectAuth } from "@store/store";
import { Camera } from "expo-camera";

import convertToBase64 from "@utils/convertToBase64";
import * as MediaLibrary from "expo-media-library";
import { FormikErrors, useFormik } from "formik";
import {
    Center,
    Factory,
    FormControl,
    HStack,
    Input,
    Text,
    VStack,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

import CountryPicker from "react-native-country-picker-modal";
import { scale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { convertPickerImageToBase64 } from "../../../../utils/convertToBase64";
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

export default function DocumentForm() {
    const [hasIntlLicense, setHasIntlLicense] = React.useState("yes");
    const [country, setCountry] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [termAccept, setTermAccept] = React.useState(false);
    const Touchable = Factory(TouchableOpacity);
    const video = useSelector(selectDocumentVideo);
    const navigation = useNavigation();
    const auth = useSelector(selectAuth);

    const [submitDocument, result] = useSubmitDocumentMutation();

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

    const initialState = {
        isIntlLiscense: true,
        docId1: "",
        expiry1: "",
        frontImage1: "",
        backImage1: "",
        docId2: "",
        expiry2: "",
        frontImage2: "",
        backImage2: "",
        signature: "",
        country: "",
        selfieVideo: "",
    };

    const formik = useFormik({
        initialValues: initialState,
        onSubmit: async (values) => {
            const document1Expiry = new Date(values.expiry1);
            const document2Expiry = new Date(values.expiry2);
            const frontImage1 = await convertPickerImageToBase64(
                values.frontImage1
            );
            const backImage1 = await convertPickerImageToBase64(
                values.backImage1
            );
            const frontImage2 = await convertPickerImageToBase64(
                values.frontImage2
            );
            const backImage2 = await convertPickerImageToBase64(
                values.backImage2
            );
            const data: IUserDocumentSubmission = {
                userType: userType as "Residence" | "Tourist",
                internationalLicence: values.isIntlLiscense,
                documents: [
                    {
                        documentType:
                            firstDocumentTypes[resident_status as "0" | "1"] ??
                            "Address",
                        docId: values.docId1,
                        expiry: document1Expiry.toISOString(),
                        frontImage: frontImage1,
                        backImage: backImage1,
                    },
                    {
                        documentType: EDocumentType.Licence,
                        docId: values.docId2,
                        expiry: document2Expiry.toISOString(),
                        frontImage: frontImage2,
                        backImage: backImage2,
                        country: values.country,
                    },
                ],
                signature: {
                    image: values.signature,
                },
                selfieVideo: {
                    video: video,
                },
            };

            const res = await submitDocument(data);
        },
        validationSchema: schema,
    });

    const {
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        setFieldTouched,
        setErrors,
    } = formik;

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
        if (video) {
            const base64Video = await convertToBase64(video);
            handleAddMedia({ fieldName: "selfieVideo", uri: base64Video });
            handleSubmit();
        }
        if (!termAccept) {
            return alert("Please accept terms and conditions");
        }
        if (!video) {
            const formError: FormikErrors<typeof initialState> = {
                ...errors,
                selfieVideo: "Required",
            };
            setErrors(formError);
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
        const setBase64Video = async () => {
            const base64Video = await convertToBase64(video);
            handleAddMedia({ fieldName: "selfieVideo", uri: video });
        };
        if (video) setBase64Video();
    }, [video]);

    React.useEffect(() => {
        if (result.error) {
            alert(result?.data?.data?.message ?? "Something went wrong");
        }
        if (!result.error && result.data) {
            navigation.navigate("MapScreen" as never);
        }
    }, [result]);

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
                    onChangeText={handleChange("docId1")}
                    onBlur={handleBlur("docId1")}
                    value={values.docId1}
                />

                {touched.docId1 && errors.docId1 ? (
                    <ErrorMessage mt={"3px"}>{errors.docId1}</ErrorMessage>
                ) : null}
            </FormControl>

            <ExpiryDate
                onChange={(data) => {
                    setFieldValue("expiry1", data);
                }}
                onPress={() => setFieldTouched("expiry1")}
            />
            {touched.expiry1 && errors.expiry1 ? (
                <ErrorMessage mt={"3px"}>{errors.expiry1}</ErrorMessage>
            ) : null}

            <AddImage
                getImages={(img) => {
                    if (img[0])
                        handleAddMedia({
                            fieldName: "frontImage1",
                            uri: img[0],
                        });
                    if (img[1])
                        handleAddMedia({
                            fieldName: "backImage1",
                            uri: img[1],
                        });
                }}
                title={
                    resident_status === "0"
                        ? "Upload both sides of your ID Card"
                        : "Upload both sides of your Passport"
                }
            />
            {touched.frontImage1 && errors.frontImage1 ? (
                <ErrorMessage mt={"3px"}>{errors.frontImage1}</ErrorMessage>
            ) : null}
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
                    isActive={country !== ""}
                    value={country.name || "Select Country"}
                    divider
                />

                {show && (
                    <CountryPicker
                        onClose={() => setShow(false)}
                        visible={show}
                        onSelect={(dt) => {
                            setShow(false);
                            console.log(dt);
                            setFieldValue("country", dt.cca2);
                            setCountry(dt);
                        }}
                        withFilter
                    />
                )}
                {touched.country && errors.country ? (
                    <ErrorMessage mt={"3px"}>{errors.country}</ErrorMessage>
                ) : null}
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
                    onChangeText={handleChange("docId2")}
                    onBlur={handleBlur("docId2")}
                    value={values.docId2}
                />
                {touched.docId2 && errors.docId2 ? (
                    <ErrorMessage mt={"3px"}>{errors.docId2}</ErrorMessage>
                ) : null}
            </FormControl>
            <ExpiryDate
                onChange={(data) => {
                    setFieldValue("expiry2", data);
                }}
            />

            <AddImage
                getImages={(img) => {
                    if (img[0])
                        handleAddMedia({
                            fieldName: "frontImage2",
                            uri: img[0],
                        });
                    if (img[1])
                        handleAddMedia({
                            fieldName: "backImage2",
                            uri: img[1],
                        });
                }}
                title="Upload both sides of your License"
            />

            {touched.frontImage2 && errors.frontImage2 ? (
                <ErrorMessage mt={"3px"}>{errors.frontImage2}</ErrorMessage>
            ) : null}

            <VideoPlayer vdo={video} />

            {touched.selfieVideo && errors.selfieVideo ? (
                <ErrorMessage mt={"3px"}>{errors.selfieVideo}</ErrorMessage>
            ) : null}

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
                />
                {touched.signature && errors.signature ? (
                    <ErrorMessage mt={"3px"}>{errors.signature}</ErrorMessage>
                ) : null}
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
                />
            </Center>
        </VStack>
    );
}
