import { useNavigation } from "@react-navigation/native";
import {
    Avatar,
    FormControl,
    Image,
    Input,
    Pressable,
    useColorMode,
    VStack,
} from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import camera from "../../../assets/images/camera.png";
import BackButton from "../../components/BackButton/BackButton";
import Balance from "../../components/Balance/Balance";
import GradientBtn from "../../components/GradientBtn/GradientBtn";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import Scroller from "../../components/Scroller/Scroller";
import useAuth from "../../hooks/useAuth";
import Pen from "../../svgs/Pen";
import colors from "../../theme-config/colors";
import { fontSizes } from "../../theme-config/typography";
import ImagePickerSheet from "../../components/ImagePickerSheet/ImagePickerSheet";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export default function Account() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { user } = useAuth();
    const [image, setImage] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const colormode = useColorMode();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Account" />,
            headerTitleAlign: "center",
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
            headerLeft: () => (
                <BackButton
                    color={colormode.colorMode === "dark" ? "white" : "black"}
                />
            ),
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor:
                    colormode.colorMode === "dark"
                        ? colors.dark[100]
                        : colors.light[300],
            },
        });
    }, [navigation]);

    const checkImagePermission = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
        } else {
            setIsOpen(true);
        }
    };

    return (
        <Scroller
            contentStyle={{
                flexGrow: 1,
            }}
            bg="light.300"
            _dark={{
                bg: "dark.100",
            }}
        >
            <VStack
                space={6}
                mt={4}
                px="6"
                pb={8}
                h="full"
                mx="auto"
                pt={Platform.OS === "android" ? 55 : 0}
            >
                <VStack alignItems={"center"} position="relative">
                    <Avatar
                        shadow="9"
                        source={{ uri: image ? image : user?.avatar }}
                        size={"120px"}
                        borderWidth={6}
                        borderColor="#fff"
                    >
                        {user?.name.slice(0, 1)}
                    </Avatar>
                    <Pressable
                        bg="primary.100"
                        display="flex"
                        alignItems={"center"}
                        justifyContent="center"
                        p="4"
                        borderRadius="50px"
                        position="absolute"
                        bottom={-22}
                        onPress={checkImagePermission}
                    >
                        <Image source={camera} alt="camera" />
                    </Pressable>
                </VStack>
                <ImagePickerSheet
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    setImage={(img) => setImage(img)}
                />

                <VStack w="full" mt={4}>
                    <FormControl mt={3} w="full">
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your QID
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="Enter your QID"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable>
                                    <Pen width={scale(16)} height={scale(16)} />
                                </Pressable>
                            }
                        />
                    </FormControl>
                    <FormControl mt={3} w="full">
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your full name
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="Enter your full name"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable>
                                    <Pen width={scale(16)} height={scale(16)} />
                                </Pressable>
                            }
                        />
                    </FormControl>
                    <FormControl mt={3} w="full">
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Fill your date of birth
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="22/12/2000"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable>
                                    <Pen width={scale(16)} height={scale(16)} />
                                </Pressable>
                            }
                        />
                    </FormControl>
                    <FormControl mt={3} w="full">
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your mobile number
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="Enter your mobile number"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable>
                                    <Pen width={scale(16)} height={scale(16)} />
                                </Pressable>
                            }
                        />
                    </FormControl>

                    <FormControl mt={3} w="full">
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your email address
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="Enter your email address"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable>
                                    <Pen width={scale(16)} height={scale(16)} />
                                </Pressable>
                            }
                        />
                    </FormControl>
                </VStack>
                <GradientBtn title="Submit" mx="auto" mt="4" />
            </VStack>
        </Scroller>
    );
}
