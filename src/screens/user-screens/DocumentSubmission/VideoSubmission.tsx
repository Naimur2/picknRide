import { useNavigation } from "@react-navigation/native";
import { selectAllDocumentFieldValues } from "@store/features/document/documentSlice";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { VStack } from "native-base";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import OutlineButton from "../../../components/OutlineButton/OutlineButton";
import VideoPlayer from "./DocumentForm/VideoPlayer/VideoPlayer";
import { createFormFile } from "@utils/fileDetails";
import { IAuthState } from "../../../redux/features/auth/authSlice.types";
import { useUploadDocumentMutation } from "@store/api/v2/documentApi/documentApiSlice";
import { selectAuth } from "@store/store";
import GradientBtn from "../../../components/GradientBtn/GradientBtn";
import { setCurrentForm } from "@store/features/auth/authSlice";

export default function VideoSubmission() {
    const navigation = useNavigation();
    const values = useSelector(selectAllDocumentFieldValues) as any;
    const [error, setError] = React.useState<Error | null>(null);

    const auth = useSelector(selectAuth);
    const { resident_status } = auth as IAuthState;
    const [submitDocument, result] = useUploadDocumentMutation();

    const userTypes = {
        "0": "Residence",
        "1": "Tourist",
    };

    const userType =
        userTypes[resident_status as keyof typeof userTypes] ?? "Residence";

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

    const handleSubmission = async () => {
        try {
            // formdata for selfie video
            const document4 = new FormData();
            const document2Expiry = new Date(values.expiry2);
            document4.append("UserType", userType);
            document4.append("DocumentType", "SelfieVideo");
            document4.append(
                "FrontImage",
                createFormFile(values.selfieVideo, "video") as any
            );
            document4.append("Expiry", document2Expiry.toISOString());

            const res4 = await submitDocument(document4).unwrap();
            if (res4?.error) {
                alert(res4.error);
            }
            if (res4?.succeeded && res4?.error === null) {
                alert(
                    "Documents uploaded successfully, please wait for approval"
                );
                dispatch(setCurrentForm(3));
            }
        } catch (error) {
            alert("Error uploading documents");
        }
    };

    const submitForm = () => {
        if (values.selfieVideo) handleSubmission();
        else alert("Please upload a selfie video");
    };

    return (
        <VStack>
            <VideoPlayer vdo={values.selfieVideo} />

            <OutlineButton
                title="Take a selfie"
                titleStyle={{
                    mx: "auto",
                }}
                mx="auto"
                onPress={handleRecoder}
            />

            <GradientBtn
                onPress={submitForm}
                mt="2"
                mb={8}
                title="Continue"
                disabled={result.isLoading}
                mx="auto"
            />
        </VStack>
    );
}
