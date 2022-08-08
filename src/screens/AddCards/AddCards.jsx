import { useNavigation } from "@react-navigation/native";
import {
    FormControl,
    HStack,
    Image,
    Input,
    Pressable,
    Text,
    VStack,
} from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import GradientBtn from "../../components/GradientBtn/GradientBtn";
import OutlineButton from "../../components/OutlineButton/OutlineButton";
import Scroller from "../../components/Scroller/Scroller";
import Camera from "../../svgs/Camera";
import useAuth from "./../../hooks/useAuth";
import Pen from "./../../svgs/Pen";
const creditCardImage = require("../../../assets/images/credit-card.png");

export default function AddCards() {
    const navigation = useNavigation();

    const auth = useAuth();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text
                    fontWeight={700}
                    fontSize={16}
                    textTransform={"uppercase"}
                    color={"gray.400"}
                    _dark={{
                        color: "white",
                    }}
                >
                    Add Cards
                </Text>
            ),
            headerTitleAlign: "center",
            headerTitleVisible: true,
        });
    }, [navigation]);

    return (
        <Scroller>
            <VStack
                py={50}
                bg="#fff"
                flex="1"
                alignItems={"center"}
                _dark={{
                    bg: "#000",
                }}
            >
                <Image
                    width={scale(350) + "px"}
                    height={scale(300) + "px"}
                    resizeMode="contain"
                    source={creditCardImage}
                    alt="credit-card"
                />
                <VStack width={scale(300) + "px"}>
                    <Text
                        fontWeight={600}
                        fontSize={20}
                        _dark={{ color: "#fff" }}
                    >
                        Card Details
                    </Text>
                    <FormControl mt={5}>
                        <FormControl.Label
                            fontSize={12}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Name
                        </FormControl.Label>
                        <Input
                            fontSize={17}
                            fontWeight={600}
                            variant="underlined"
                            placeholder="Enter name"
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
                    <FormControl mt={5}>
                        <FormControl.Label
                            fontSize={12}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Card Number
                        </FormControl.Label>
                        <Input
                            fontSize={17}
                            fontWeight={600}
                            variant="underlined"
                            placeholder="0000 0000 0000 0000"
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

                    <HStack mt={5} justifyContent="space-between">
                        <FormControl w={"48%"}>
                            <FormControl.Label
                                fontSize={12}
                                color="gray.400"
                                _dark={{ color: "#fff" }}
                            >
                                Expiry Date
                            </FormControl.Label>
                            <Input
                                fontSize={17}
                                fontWeight={600}
                                variant="underlined"
                                placeholder="01/2020"
                                placeholderTextColor="gray.300"
                                _dark={{
                                    color: "#fff",
                                    placeholderTextColor: "white",
                                }}
                                rightElement={
                                    <Pressable>
                                        <Pen
                                            width={scale(20)}
                                            height={scale(20)}
                                        />
                                    </Pressable>
                                }
                            />
                        </FormControl>
                        <FormControl w={"48%"}>
                            <FormControl.Label
                                fontSize={12}
                                color="gray.400"
                                _dark={{ color: "#fff" }}
                            >
                                CVV
                            </FormControl.Label>
                            <Input
                                fontSize={17}
                                fontWeight={600}
                                variant="underlined"
                                placeholder="000"
                                placeholderTextColor="gray.300"
                                _dark={{
                                    color: "#fff",
                                    placeholderTextColor: "white",
                                }}
                                rightElement={
                                    <Pressable>
                                        <Pen
                                            width={scale(20)}
                                            height={scale(20)}
                                        />
                                    </Pressable>
                                }
                            />
                        </FormControl>
                    </HStack>
                </VStack>
                <Text
                    mt={8}
                    mb={4}
                    fontSize={20}
                    fontWeight={500}
                    color={"gray.100"}
                    _dark={{ color: "#fff" }}
                >
                    Or
                </Text>

                <OutlineButton
                    titleStyle={{ mr: "auto" }}
                    title={"SCAN YOUR CARD"}
                    rightIcon={() => (
                        <Camera width={scale(20)} height={scale(20)} />
                    )}
                />

                <GradientBtn
                    gradientStyle={{
                        width: scale(250) + "px",
                    }}
                    title={"Continue"}
                    onPress={() =>
                        auth.login({ email: "test@test.gg", uname: "Naimur" })
                    }
                />
            </VStack>
        </Scroller>
    );
}
