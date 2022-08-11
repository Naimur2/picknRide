import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import CameraComp from "./components/CameraComp/CameraComp";

export default function CameraView() {
    const navigation = useNavigation();

    const [hasCameraPermission, setHasCameraPermission] = React.useState();
    const [hasMicrophonePermission, setHasMicrophonePermission] =
        React.useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
        React.useState();

    React.useEffect(() => {
        (async () => {
            const cameraPermission =
                await Camera.requestCameraPermissionsAsync();
            const microphonePermission =
                await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermission =
                await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMicrophonePermission?.(
                microphonePermission.status === "granted"
            );
            setHasMediaLibraryPermission?.(
                mediaLibraryPermission.status === "granted"
            );
        })();
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <BackButton color={"#fff"} />,
        });
    }, [navigation]);

    if (
        !hasCameraPermission ||
        !hasMicrophonePermission ||
        !hasMediaLibraryPermission
    ) {
        return <Text>Requestion permissions...</Text>;
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted.</Text>;
    }

    return <CameraComp />;
}
