import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { Button, HStack, Modal, Text, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CameraModalComp from "../CameraModalComp/CameraModalComp";
import { Face } from "expo-camera/build/Camera.types";

export default function CameraComp() {
    const inset = useSafeAreaInsets();
    let cameraRef = React.useRef<Camera>();
    const [timer, setTimer] = React.useState(0);
    const [show, setShow] = React.useState(false);
    const [video, setVideo] = React.useState<string>();

    const [faceData, setFaceData] = React.useState<Face | null>(null);
    const [warning, setWarning] = React.useState<string | null>(null);

    const navigation = useNavigation();

    const [isRecording, setIsRecording] = React.useState(false);

    let recordVideo = async () => {
        setIsRecording(false);
        let options = {
            quality: "1080p",
            maxDuration: 10,
            mute: false,
        };

        try {
            if (cameraRef.current) {
                const recordedVideo = await cameraRef.current.recordAsync(
                    options
                );
                setVideo(recordedVideo.uri);
                setIsRecording(false);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    let stopRecording = () => {
        if (cameraRef.current) {
            setIsRecording(false);
            cameraRef.current.stopRecording();
        }
    };

    React.useEffect(() => {
        if (video && faceData) {
            navigation.navigate("DocumentSubmission", {
                video: video,
                faceData: faceData,
            });
        }
    }, []);

    // React.useEffect(() => {
    //     if (isRecording && timer === 10) {
    //         stopRecording();
    //     }
    // }, [isRecording, timer]);

    React.useEffect(() => {
        if (isRecording) {
            const couter = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
            return () => clearInterval(couter);
        }
        if (!isRecording) {
            setTimer(0);
        }
    }, [isRecording]);

    const handleClose = async () => {
        setShow(false);
        await AsyncStorage.setItem("@showCameraWarning", "false");
    };

    const handleFacesDetected = ({ faces }: { faces: Face[] }) => {
        if (faces.length > 1 || faces.length === 0) {
            setWarning("Please only take one face");
            setFaceData(null);
        } else {
            const currentFace = faces[0];
            const eyesShut =
                currentFace.rightEyeOpenProbability < 0.4 &&
                currentFace.leftEyeOpenProbability < 0.4;

            const winking =
                !eyesShut &&
                (currentFace.rightEyeOpenProbability < 0.4 ||
                    currentFace.leftEyeOpenProbability < 0.4);

            if (!winking && !eyesShut) {
                setWarning(
                    "Please keep your face straight and blink your eyes"
                );
                setFaceData(null);
                return;
            }

            setWarning(null);
            setFaceData(currentFace);
        }
    };

    return (
        <VStack flex={1} position="relative">
            <Modal isOpen={show}>
                <CameraModalComp onCloseModal={handleClose} />
            </Modal>
            <Camera
                type={Camera.Constants.Type.front}
                onFacesDetected={handleFacesDetected}
                faceDetectorSettings={{
                    mode: FaceDetector.FaceDetectorMode.fast,
                    detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                    runClassifications:
                        FaceDetector.FaceDetectorClassifications.none,
                    minDetectionInterval: 100,
                    tracking: true,
                }}
                style={styles.container}
                ref={cameraRef}
            >
                <VStack flex={1} alignItems="center" position={"relative"}>
                    <HStack
                        w={20}
                        py={1}
                        mt={inset.top + 50 + "px"}
                        bg="gray.400"
                        borderRadius={40}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text fontSize={16} color={"#fff"} fontWeight={600}>
                            00:{timer < 10 ? "0" + timer : timer}
                        </Text>
                    </HStack>
                    {warning ? (
                        <Text px={4} mt={"5"} color={"#fff"} textAlign="center">
                            {warning}
                        </Text>
                    ) : null}

                    <VStack
                        h="100px"
                        w="100px"
                        p="2"
                        mt="auto"
                        mb={100}
                        alignItems="center"
                        justifyContent="center"
                        borderWidth={2}
                        borderColor={"#fff"}
                        borderRadius="120"
                    >
                        <Button
                            h="100%"
                            w="100%"
                            bg={isRecording ? "red.500" : "#fff"}
                            onPress={!isRecording ? recordVideo : null}
                            borderRadius={50}
                        />
                    </VStack>
                </VStack>
            </Camera>
        </VStack>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        marginBottom: 100,
    },
    video: {
        flex: 1,
        alignSelf: "stretch",
    },
});
