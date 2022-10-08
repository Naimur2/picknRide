import { useNavigation } from "@react-navigation/native";
import {
    Box,
    Center,
    Factory,
    FormControl,
    HStack,
    Input,
    Text,
    useColorMode,
    VStack,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { scale } from "react-native-size-matters";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import GradientBtn from "../../../../components/GradientBtn/GradientBtn";
import { Tick } from "../../../../components/Icons/Icons";
import OutlineButton from "../../../../components/OutlineButton/OutlineButton";
import AddImage from "../AddImage/AddImage";
import WarningModal from "../../../../components/WarningModal/WarningModal";
import ExpiryDate from "./components/ExpiryDate/ExpiryDate";
import PickerButton from "./components/PickerButton/PickerButton";
import Signature from "./components/Signature/Signature";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import YesNo from "./components/YesNo/YesNo";
import H3 from "../../../../components/H3/H3";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function DocumentForm({
    routeParams,
}: {
    routeParams: {
        video: any;
        faceData: any;
    };
}) {
    const [hasIntlLicense, setHasIntlLicense] = React.useState("yes");
    const [country, setCountry] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [termAccept, setTermAccept] = React.useState(false);
    const Touchable = Factory(TouchableOpacity);
    const [isOpen, setIsOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState("");

    const navigation = useNavigation();
    const { toggleColorMode } = useColorMode();

    React.useLayoutEffect(() => {
        const modalVarients = ["approved", "pending", "rejected", "expired"];
        const randomValue = Math.floor(Math.random() * modalVarients.length);
        setModalType(modalVarients[randomValue]);
        setIsOpen(true);
    }, [navigation]);

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

    const handleNavigation = () => {
        setIsOpen(true);
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

            <VideoPlayer video={routeParams.video} />

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

            <WarningModal
                isVisible={isOpen}
                setIsVisible={() => setIsOpen((prev) => !prev)}
                variant={modalType}
            />
        </VStack>
    );
}
