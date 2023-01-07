import CheckBox from "@components/CheckBox/CheckBox";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import H3 from "@components/H3/H3";
import OutlineButton from "@components/OutlineButton/OutlineButton";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
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
import { selectDocumentVideo } from "@store/features/document/documentSlice";
import AddImage from "../AddImage/AddImage";
import ExpiryDate from "./ExpiryDate/ExpiryDate";
import PickerButton from "./PickerButton/PickerButton";
import Signature from "./Signature/Signature";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import YesNo from "./YesNo/YesNo";
import { selectAuth } from "@store/store";

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

    const auth = useSelector(selectAuth);

    console.log(auth);

    const navigation = useNavigation();

    const handleNavigation = () => {};

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
                />
            </FormControl>

            <ExpiryDate />

            <AddImage
                getImages={(img) => console.log(img)}
                title="Upload both sides of your ID Card"
            />
            <VStack>
                <YesNo
                    selected={hasIntlLicense}
                    setSelected={(data) => {
                        setHasIntlLicense(data);
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
                            setCountry(dt);
                        }}
                        withFilter
                    />
                )}
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
                />
            </FormControl>
            <ExpiryDate />

            <AddImage
                getImages={(img) => console.log(img)}
                title="Upload both sides of your ID Card"
            />

            <VideoPlayer vdo={video} />

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
                <Signature />
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
                    onPress={handleNavigation}
                    mt="5"
                    mb={8}
                    title="Continue"
                />
            </Center>
        </VStack>
    );
}
