import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import map from "../../../assets/images/map.png";
import Balance from "../../components/Balance/Balance";
import Card from "../../components/Card/Card";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";
import key from "../../../assets/images/key.png";
import secure from "../../../assets/images/secure.png";

export default function TripDetails() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const Location = ({ name, time }) => (
        <VStack>
            <Text
                color={"#000"}
                _dark={{
                    color: "#fff",
                }}
                fontSize={scale(14)}
                fontWeight="600"
            >
                {name}
            </Text>
            <Text
                color={"gray.400"}
                _dark={{
                    color: "#fff",
                }}
                fontSize={scale(10)}
                fontWeight="500"
                maxW={scale(160) + "px"}
            >
                {time}
            </Text>
        </VStack>
    );

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Trip details" />,
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
                w="full"
            >
                <VStack
                    w={scale(300) + "px"}
                    h="200px"
                    mx={"auto"}
                    borderRadius={10}
                    bg="primary.500"
                    overflow="hidden"
                    bg="#fff"
                >
                    <Image
                        resizeMode="cover"
                        alt="map"
                        source={map}
                        mx={"auto"}
                        w="100%"
                        h="100%"
                    />
                </VStack>

                <VStack>
                    <Text
                        _dark={{
                            color: "#fff",
                        }}
                        color={"gray.400"}
                        fontSize={scale(11) + "px"}
                        fontWeight={500}
                    >
                        10 September, 2022
                    </Text>
                    <Text
                        _dark={{
                            color: "#fff",
                        }}
                        color={"gray.400"}
                        fontSize={scale(11) + "px"}
                        fontWeight={500}
                    >
                        10.30 AM
                    </Text>
                </VStack>
                <HStack space={4}>
                    <VStack w="12%" alignItems={"center"}>
                        <Box
                            mt={2}
                            w="4"
                            h="4"
                            borderRadius={16}
                            bg="primary.100"
                        />

                        <VStack space="1">
                            <Box w="3px" h="5px" bg="#B6E495" />
                            <Box w="3px" h="5px" bg="#B6E495" />
                            <Box w="3px" h="5px" bg="#B6E495" />
                            <Box w="3px" h="5px" bg="#B6E495" />
                            <Box w="3px" h="5px" bg="#B6E495" />
                            <Box w="3px" h="5px" bg="#B6E495" />
                        </VStack>

                        <Box w="4" h="4" borderRadius={16} bg="primary.200" />
                    </VStack>
                    <VStack space="20px">
                        <Location
                            name="Masraf Al-Rayan Building"
                            time="10 September, 10.30 AM"
                        />
                        <Location
                            name="Masraf Al-Rayan Building"
                            time="10 September, 10.30 AM"
                        />
                    </VStack>
                </HStack>

                <HStack mt={8} w="full" justifyContent={"space-between"}>
                    <HStack space="4" alignItems={"center"} space="1">
                        <Text
                            color={"#000"}
                            _dark={{
                                color: "#fff",
                            }}
                            fontSize={scale(22)}
                            fontWeight="600"
                            textTransform={["uppercase"]}
                            pr={2}
                        >
                            QAR
                        </Text>
                        <Text
                            color={"primary.100"}
                            fontSize={scale(22)}
                            fontWeight="500"
                        >
                            3.2
                        </Text>
                    </HStack>

                    <Pressable
                        borderWidth={2}
                        alignItems="center"
                        justifyContent={"center"}
                        px="4"
                        borderRadius={10}
                        borderColor="primary.100"
                        onPress={() => navigation.navigate("Receipt")}
                    >
                        <Text fontWeight={700} color={"primary.100"}>
                            View receipt
                        </Text>
                    </Pressable>
                </HStack>

                <VStack space="4" mt={8}>
                    <Card
                        borderRadius={50}
                        _dark={{
                            bg: "#fff",
                        }}
                    >
                        <HStack w="full" justifyContent={"space-between"}>
                            <VStack
                                w="15%"
                                alignItems={"center"}
                                justifyContent="center"
                            >
                                <Image
                                    source={key}
                                    alt="key"
                                    resizeMode="contain"
                                    w="30px"
                                />
                            </VStack>
                            <VStack w="80%">
                                <Text
                                    color={"#000"}
                                    fontSize={scale(14)}
                                    fontWeight="600"
                                >
                                    Find Lost Item
                                </Text>
                                <Text
                                    color={"gray.400"}
                                    fontSize={scale(10)}
                                    fontWeight="500"
                                >
                                    We can help you get in touch with driver
                                </Text>
                            </VStack>
                        </HStack>
                    </Card>

                    <Card
                        borderRadius={50}
                        _dark={{
                            bg: "#fff",
                        }}
                    >
                        <HStack w="full" justifyContent={"space-between"}>
                            <VStack
                                w="15%"
                                alignItems={"center"}
                                justifyContent="center"
                            >
                                <Image
                                    source={secure}
                                    alt="key"
                                    resizeMode="contain"
                                    w="30px"
                                />
                            </VStack>
                            <VStack w="80%">
                                <Text
                                    color={"#000"}
                                    fontSize={scale(14)}
                                    fontWeight="600"
                                >
                                    Report Safety Issue
                                </Text>
                                <Text
                                    color={"gray.400"}
                                    fontSize={scale(10)}
                                    fontWeight="500"
                                >
                                    We can help you get in touch with driver
                                </Text>
                            </VStack>
                        </HStack>
                    </Card>
                </VStack>
            </VStack>
        </Scroller>
    );
}