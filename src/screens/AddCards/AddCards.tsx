import { useNavigation, useRoute } from "@react-navigation/native";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import GradientBtn from "../../components/GradientBtn/GradientBtn";
import OutlineButton from "../../components/OutlineButton/OutlineButton";
import Scroller from "../../components/Scroller/Scroller";
import Camera from "../../svgs/Camera";
import useAuth from "../../hooks/useAuth";
import Pen from "../../svgs/Pen";
import { Dimensions } from "react-native";
import { fontSizes } from "../../theme-config/typography";
const creditCardImage = require("../../../assets/images/credit-card.png");

const WINDOW_HEIGHT = Dimensions.get("window").height;

interface IRouteProps {
    arrivalDate: string;
    citizenShip: {
        id: string;
        type: string;
    };
}

export default function AddCards() {
    const navigation = useNavigation();

    const params = useRoute().params as IRouteProps;

    const auth = useAuth();

    const handleLogin = () => {
        const user = {
            name: "JhonDoe",
            email: "jhondoe@email.com",
            avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            isActive: true,
            arrivalDate: params.arrivalDate,
            citizenShip: params.citizenShip,
        };
        auth?.login?.(user);
    };

    React.useLayoutEffect(() => {
        let clear = true;
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
            headerBackTitleVisible: false,
        });
        if (clear) {
            return () => {
                clear = false;
            };
        }
    }, [navigation]);

    return (
        <Scroller bg="#fff">
            <VStack
                pb={"50px"}
                flex="1"
                alignItems={"center"}
                _dark={{
                    bg: "#000",
                }}
            >
                <HStack
                    mt={5}
                    width={"full"}
                    height={WINDOW_HEIGHT * 0.29 + "px"}
                >
                    <Image
                        width={"full"}
                        height={"full"}
                        resizeMode="contain"
                        source={creditCardImage}
                        alt="credit-card"
                    />
                </HStack>
                <VStack width={scale(300) + "px"} space="4">
                    <Text
                        fontWeight={600}
                        fontSize={fontSizes.md}
                        _dark={{ color: "#fff" }}
                    >
                        Card Details
                    </Text>
                    <FormControl>
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Name
                        </FormControl.Label>
                        <Input
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="Enter name"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable>
                                    <Pen width={scale(18)} height={scale(18)} />
                                </Pressable>
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Card Number
                        </FormControl.Label>
                        <Input
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="0000 0000 0000 0000"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable>
                                    <Pen width={scale(18)} height={scale(18)} />
                                </Pressable>
                            }
                        />
                    </FormControl>

                    <HStack justifyContent="space-between">
                        <FormControl w={"48%"}>
                            <FormControl.Label
                                fontSize={fontSizes.xs}
                                color="gray.400"
                                _dark={{ color: "#fff" }}
                            >
                                Expiry Date
                            </FormControl.Label>
                            <Input
                                fontSize={fontSizes.sm}
                                fontWeight={600}
                                variant="underlined"
                                borderBottomColor={"light.200"}
                                placeholder="01/2020"
                                placeholderTextColor="gray.300"
                                _dark={{
                                    color: "#fff",
                                    placeholderTextColor: "white",
                                }}
                                rightElement={
                                    <Pressable>
                                        <Pen
                                            width={scale(18)}
                                            height={scale(18)}
                                        />
                                    </Pressable>
                                }
                            />
                        </FormControl>
                        <FormControl w={"48%"}>
                            <FormControl.Label
                                fontSize={fontSizes.xs}
                                color="gray.400"
                                _dark={{ color: "#fff" }}
                            >
                                CVV
                            </FormControl.Label>
                            <Input
                                fontSize={fontSizes.sm}
                                fontWeight={600}
                                variant="underlined"
                                borderBottomColor={"light.200"}
                                placeholder="000"
                                placeholderTextColor="gray.300"
                                _dark={{
                                    color: "#fff",
                                    placeholderTextColor: "white",
                                }}
                                rightElement={
                                    <Pressable>
                                        <Pen
                                            width={scale(18)}
                                            height={scale(18)}
                                        />
                                    </Pressable>
                                }
                            />
                        </FormControl>
                    </HStack>
                </VStack>
                <Text
                    mt={4}
                    mb={2}
                    fontSize={fontSizes.md}
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
                        <Camera width={scale(16)} height={scale(16)} />
                    )}
                    mt={2}
                    mb={4}
                />

                <GradientBtn
                    gradientStyle={{
                        width: scale(250) + "px",
                    }}
                    title={"Continue"}
                    onPress={handleLogin}
                />
            </VStack>
        </Scroller>
    );
}
