import { useNavigation } from "@react-navigation/native";
import {
    Avatar,
    FormControl,
    Image,
    Input,
    Pressable,
    VStack,
} from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import Balance from "../../components/Balance/Balance";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";
import useAuth from "../../hooks/useAuth";
import Camera from "../../svgs/Camera";
import camera from "../../../assets/images/camera.png";
import Pen from "../../svgs/Pen";
import ImagePickerSheet from "./../../components/ImagePickerSheet/ImagePickerSheet";
import GradientBtn from "../../components/GradientBtn/GradientBtn";

export default function Account() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { user } = useAuth();
    const [image, setImage] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Account" />,
            headerTitleAlign: "center",
            headerLeft: null,
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
        });
    }, [navigation]);

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
                mt={TOP_PADDING + insets.top + "px"}
                px="6"
                pb={8}
                h="full"
                maxWidth={scale(500)}
                mx="auto"
            >
                <VStack alignItems={"center"} position="relative">
                    <Avatar
                        shadow="9"
                        source={{ uri: image ? image : user?.avatar }}
                        size={"160px"}
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
                        onPress={() => setIsOpen(true)}
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
                    <FormControl mt={5} w="full">
                        <FormControl.Label
                            fontSize={12}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your QID
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={17}
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
                                    <Pen width={scale(20)} height={scale(20)} />
                                </Pressable>
                            }
                        />
                    </FormControl>
                    <FormControl mt={5} w="full">
                        <FormControl.Label
                            fontSize={12}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your full name
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={17}
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
                                    <Pen width={scale(20)} height={scale(20)} />
                                </Pressable>
                            }
                        />
                    </FormControl>
                    <FormControl mt={5} w="full">
                        <FormControl.Label
                            fontSize={12}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Fill your date of birth
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={17}
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
                                    <Pen width={scale(20)} height={scale(20)} />
                                </Pressable>
                            }
                        />
                    </FormControl>
                    <FormControl mt={5} w="full">
                        <FormControl.Label
                            fontSize={12}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your mobile number
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={17}
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
                                    <Pen width={scale(20)} height={scale(20)} />
                                </Pressable>
                            }
                        />
                    </FormControl>

                    <FormControl mt={5} w="full">
                        <FormControl.Label
                            fontSize={12}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your email address
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={17}
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
                                    <Pen width={scale(20)} height={scale(20)} />
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
