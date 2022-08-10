import {
    Box,
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
import GradientBtn from "../../../../components/GradientBtn/GradientBtn";
import { Tick } from "../../../../components/Icons/Icons";
import OutlineButton from "../../../../components/OutlineButton/OutlineButton";
import AddImage from "../AddImage/AddImage";
import YesNo from "./components/YesNo/YesNo";
import ExpiryDate from "./components/ExpiryDate/ExpiryDate";
import PickerButton from "./components/PickerButton/PickerButton";
import Signature from "./components/Signature/Signature";
import { useNavigation } from "@react-navigation/native";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import { useColorMode } from "native-base";

export default function DocumentForm() {
    const [hasIntlLicense, setHasIntlLicense] = React.useState("yes");
    const [country, setCountry] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [termAccept, setTermAccept] = React.useState(false);
    const Touchable = Factory(TouchableOpacity);
    const [showSignature, setShowSignature] = React.useState(false);
    const navigation = useNavigation();
    const { toggleColorMode } = useColorMode();

    React.useLayoutEffect(() => {
        const timeout = setTimeout(() => {
            setShowSignature(true);
        }, 1000);
        return () => {
            setShow(false);
            setShowSignature(false);
            clearTimeout(timeout);
        };
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

            <FormControl mt={2}>
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
                    />
                )}
            </FormControl>

            <FormControl mt={3}>
                <FormLabel title="License Number" />
                <Input
                    fontSize={17}
                    fontWeight={600}
                    variant="underlined"
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

            <VideoPlayer />

            <OutlineButton
                title="Take a selfie"
                titleStyle={{
                    mx: "auto",
                }}
                mx="auto"
            />

            {showSignature && <Signature />}

            <Center>
                <HStack space="2" mt={12}>
                    <Touchable onPress={() => setTermAccept((prev) => !prev)}>
                        {termAccept ? (
                            <Tick color="primary.100" />
                        ) : (
                            <Box
                                borderColor={"primary.100"}
                                borderWidth={"2"}
                                h="24px"
                                w="24px"
                                borderRadius={100}
                            />
                        )}
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
                    onPress={toggleColorMode}
                    mt="5"
                    mb={8}
                    title="Continue"
                />
            </Center>
        </VStack>
    );
}
