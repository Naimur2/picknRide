import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Spinner, Text, VStack } from "native-base";
import React from "react";
import useAuth from "./hooks/useAuth";
import AuthRoute from "./routes/auth.routes";
import DrawerRoute from "./routes/drawer.routes";

export default function Main() {
    const auth = useAuth();
    const [libraryStatus, requestPermission] =
        ImagePicker.useMediaLibraryPermissions();
    const [foreLocationStatus, requestForeLocationPermission] =
        Location.useForegroundPermissions();
    const [error, setError] = React.useState();
    const [camePermission, setCameraPermission] = React.useState(false);
    const [microphonePermission, setMicrophonePermission] =
        React.useState(false);
    const [mediaLibraryPermission, setMediaLibraryPermission] =
        React.useState(false);

    const askPermission = async () => {
        try {
            const cameraPermission =
                await Camera.requestCameraPermissionsAsync();
            const microphonePermission =
                await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermission =
                await MediaLibrary.requestPermissionsAsync();
            return {
                cameraPermission,
                microphonePermission,
                mediaLibraryPermission,
            };
        } catch (err) {
            setError(err);
        }
    };
    React.useEffect(() => {
        requestPermission();
        requestForeLocationPermission();
        (async () => {
            const {
                cameraPermission,
                microphonePermission,
                mediaLibraryPermission,
            } = await askPermission();
            setCameraPermission(cameraPermission.status === "granted");
            setMicrophonePermission(microphonePermission.status === "granted");
            setMediaLibraryPermission(
                mediaLibraryPermission.status === "granted"
            );
        })();
    }, []);

    if (
        !libraryStatus?.granted ||
        !foreLocationStatus?.granted ||
        !camePermission ||
        !microphonePermission ||
        !mediaLibraryPermission
    ) {
        return (
            <VStack
                _dark={{
                    bg: "#000",
                }}
                bg="#fff"
                flex="1"
                alignItems={"center"}
                justifyContent="center"
            >
                <Spinner color={"#c00000"} size="lg" />
                <Text fontWeight={600}>Checking Permissiom</Text>
            </VStack>
        );
    }

    if (auth?.isAuthenciated) {
        return <DrawerRoute />;
    }

    return <AuthRoute />;
}
