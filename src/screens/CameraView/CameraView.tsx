// import { useNavigation } from "@react-navigation/native";
// // import { Camera } from "expo-camera";
// // import * as MediaLibrary from "expo-media-library";
// import { Text } from "native-base";
// import React, { useEffect, useState } from "react";
// import { StyleSheet } from "react-native";
// import BackButton from "../../components/BackButton/BackButton";
// import CameraComp from "./components/CameraComp/CameraComp";

// export default function CameraView() {
//     const navigation = useNavigation();

//     const [hasCameraPermission, setHasCameraPermission] = React.useState();
//     const [hasMicrophonePermission, setHasMicrophonePermission] =
//         React.useState();
//     const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
//         React.useState();

//     React.useEffect(() => {
//         (async () => {
//             const cameraPermission =
//                 await Camera.requestCameraPermissionsAsync();
//             const microphonePermission =
//                 await Camera.requestMicrophonePermissionsAsync();
//             const mediaLibraryPermission =
//                 await MediaLibrary.requestPermissionsAsync();

//             setHasCameraPermission(cameraPermission.status === "granted");
//             setHasMicrophonePermission?.(
//                 microphonePermission.status === "granted"
//             );
//             setHasMediaLibraryPermission?.(
//                 mediaLibraryPermission.status === "granted"
//             );
//         })();
//     }, []);

//     React.useLayoutEffect(() => {
//         navigation.setOptions({
//             headerLeft: () => <BackButton color={"#fff"} />,
//         });
//     }, [navigation]);

//     if (
//         !hasCameraPermission ||
//         !hasMicrophonePermission ||
//         !hasMediaLibraryPermission
//     ) {
//         return <Text>Requestion permissions...</Text>;
//     } else if (!hasCameraPermission) {
//         return <Text>Permission for camera not granted.</Text>;
//     }

//     return <CameraComp />;
// }

import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraType}
                    >
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
});
