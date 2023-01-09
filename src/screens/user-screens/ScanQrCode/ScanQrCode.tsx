import torch from "@assets/images/torch.png";
import Scroller from "@components/Scroller/Scroller";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import {
    Factory,
    HStack,
    Image,
    Input,
    Pressable,
    Text,
    VStack,
    useColorMode,
} from "native-base";
import React from "react";
import {
    Dimensions,
    ImageBackground,
    Platform,
    StyleSheet,
} from "react-native";
import { scale } from "react-native-size-matters";

export default function ScanQrCode() {
    const navigation = useNavigation();

    const ImageBg = Factory(ImageBackground);
    const [flashOn, setFlashOn] = React.useState(false);
    const [cameraPhoto, setCameraPhoto] = React.useState<any>(null);

    const colormode = useColorMode();

    const LinGrad = Factory(LinearGradient);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerShown: false,
        });
    }, [navigation]);

    const camRef = React.useRef<Camera>(null);

    const handleCameraFlash = React.useCallback(() => {}, []);

    const takePicture = React.useCallback(async () => {
        if (camRef.current) {
            const photo = await camRef.current.takePictureAsync();
            setCameraPhoto(photo);
        }
    }, []);

    console.log("cameraPhoto", cameraPhoto);

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

                    <LinGrad
                        py={10}
                        colors={["#fff", "#FF000095"]}
                        borderRadius={30}
                        start={{ x: 0, y: 0.2 }}
                        end={{ x: 0, y: 1 }}
                        borderBottomWidth={1}
                        mx={"auto"}
                    >
                        <VStack
                            w={Dimensions.get("window").width - 40}
                            h="250px"
                            mx={"auto"}
                        >
                            <Camera
                                style={StyleSheet.absoluteFillObject}
                                ref={camRef}
                                type={Camera.Constants.Type.back}
                            />
                        </VStack>
                    </LinGrad>

                    <HStack
                        space={4}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Pressable
                            onPress={takePicture}
                            rounded={"full"}
                            py={4}
                            px={4}
                            bg={"#fff"}
                        >
                            <Entypo name="camera" size={24} color="black" />
                        </Pressable>
                        <Pressable
                            onPress={takePicture}
                            rounded={"full"}
                            py={4}
                            px={4}
                            bg={"#fff"}
                        >
                            <MaterialCommunityIcons
                                name="camera-retake"
                                size={24}
                                color="black"
                            />
                        </Pressable>
                        <Pressable
                            onPress={takePicture}
                            rounded={"full"}
                            py={4}
                            px={4}
                            bg={"#fff"}
                        >
                            <AntDesign
                                name="checkcircle"
                                size={24}
                                color="black"
                            />
                        </Pressable>
                    </HStack>

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
        </>
    );
}
