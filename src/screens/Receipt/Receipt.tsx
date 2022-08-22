import { useNavigation } from "@react-navigation/native";
import { HStack, Text, VStack, Image, Divider } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import Balance from "../../components/Balance/Balance";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import Scroller from "../../components/Scroller/Scroller";
import boyWScooter from "../../../assets/images/boywscooter.png";
import Card from "../../components/Card/Card";

interface ITopSection {
    title: string;
    subtitle: string;
}

export default function Receipt({ title, subtitle }: ITopSection) {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

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
            <VStack space={6} h="full" mx="auto" w="full">
                <VStack
                    borderBottomRadius={40}
                    bg="green.200"
                    w="full"
                    pt={60 + insets.top + "px"}
                    pb={10}
                    px={8}
                    _dark={{
                        bg: "primary.100",
                    }}
                >
                    <HStack alignItems={"center"}>
                        <VStack w="60%">
                            <Text
                                lineHeight={scale(40) + "px"}
                                fontWeight={500}
                                fontSize={scale(30) + "px"}
                                pt={7}
                                maxW={scale(300)}
                                color="primary.200"
                                _dark={{
                                    color: "#000",
                                }}
                            >
                                Here’s your recipe for your ride,{" "}
                                <Text fontWeight={700}>Jhone</Text>
                            </Text>
                            <Text
                                color={"green.300"}
                                pt={2}
                                fontWeight={500}
                                fontSize={scale(13) + "px"}
                                _dark={{
                                    color: "#000",
                                }}
                            >
                                10 September, 2022
                            </Text>
                            <Text
                                color={"green.300"}
                                fontWeight={500}
                                fontSize={scale(13) + "px"}
                                _dark={{
                                    color: "#000",
                                }}
                            >
                                10.30 AM
                            </Text>
                        </VStack>

                        <Image
                            resizeMode="contain"
                            source={boyWScooter}
                            alt="usr"
                        />
                    </HStack>
                </VStack>
                <VStack px={6}>
                    <HStack mb={4} justifyContent={"space-between"}>
                        <Text
                            color={"#000"}
                            pt={2}
                            fontWeight={600}
                            fontSize={scale(20) + "px"}
                            _dark={{
                                color: "gray.100",
                            }}
                        >
                            Total
                        </Text>
                        <Text
                            color={"#000"}
                            pt={2}
                            fontWeight={600}
                            fontSize={scale(20) + "px"}
                            _dark={{
                                color: "#fff",
                            }}
                        >
                            QAR
                            <Text color={"primary.100"} pt={2} fontWeight={500}>
                                {""} 3.6
                            </Text>
                        </Text>
                    </HStack>
                    <HStack justifyContent={"space-between"}>
                        <Text
                            color={"#000"}
                            pt={2}
                            fontWeight={500}
                            fontSize={scale(12) + "px"}
                            _dark={{
                                color: "#fff",
                            }}
                        >
                            Trip Charge
                        </Text>
                        <Text
                            color={"#000"}
                            pt={2}
                            fontWeight={600}
                            fontSize={scale(12) + "px"}
                            _dark={{
                                color: "#fff",
                            }}
                        >
                            QAR 0.00
                        </Text>
                    </HStack>
                    <Divider my={4} />
                    <HStack justifyContent={"space-between"}>
                        <Text
                            color={"#000"}
                            pt={2}
                            fontWeight={700}
                            fontSize={scale(12) + "px"}
                            _dark={{
                                color: "#fff",
                            }}
                        >
                            Subtotal
                        </Text>
                        <Text
                            color={"#000"}
                            pt={2}
                            fontWeight={600}
                            fontSize={scale(12) + "px"}
                            _dark={{
                                color: "#fff",
                            }}
                        >
                            QAR 0.00
                        </Text>
                    </HStack>

                    <HStack pt={2} justifyContent={"space-between"}>
                        <Text
                            color={"#000"}
                            pt={2}
                            fontWeight={500}
                            fontSize={scale(12) + "px"}
                            _dark={{
                                color: "#fff",
                            }}
                        >
                            Rounding
                        </Text>
                        <Text
                            color={"#000"}
                            pt={2}
                            fontWeight={600}
                            fontSize={scale(12) + "px"}
                            _dark={{
                                color: "#fff",
                            }}
                        >
                            QAR 0.00
                        </Text>
                    </HStack>

                    <HStack pt={2} justifyContent={"space-between"}>
                        <Text
                            color={"#000"}
                            pt={2}
                            fontWeight={500}
                            fontSize={scale(12) + "px"}
                            _dark={{
                                color: "#fff",
                            }}
                        >
                            Booking Fee
                        </Text>
                        <Text
                            color={"#000"}
                            pt={2}
                            fontWeight={600}
                            fontSize={scale(12) + "px"}
                            _dark={{
                                color: "#fff",
                            }}
                        >
                            QAR 0.00
                        </Text>
                    </HStack>

                    <HStack mt={6} justifyContent={"space-between"}>
                        <Text
                            color={"#000"}
                            pt={2}
                            fontWeight={600}
                            fontSize={scale(20) + "px"}
                            _dark={{
                                color: "gray.100",
                            }}
                        >
                            Payment
                        </Text>
                    </HStack>

                    <HStack
                        justifyContent={"space-between"}
                        alignItems="center"
                        mt={2}
                    >
                        <VStack>
                            <Text
                                color={"gray.100"}
                                pt={2}
                                fontWeight={600}
                                fontSize={scale(12) + "px"}
                                _dark={{
                                    color: "#fff",
                                }}
                            >
                                Card
                            </Text>
                            <Text
                                color={"#000"}
                                fontWeight={600}
                                fontSize={scale(12) + "px"}
                                _dark={{
                                    color: "#fff",
                                }}
                            >
                                10/11/2022
                            </Text>
                        </VStack>
                        <Text
                            color={"#000"}
                            fontWeight={600}
                            fontSize={scale(12) + "px"}
                            _dark={{
                                color: "#fff",
                            }}
                        >
                            456xxxxxxxx
                        </Text>
                    </HStack>

                    <VStack my={8} space={4}>
                        <Card
                            _dark={{
                                bg: "#fff",
                            }}
                        >
                            <Text
                                color={"#000"}
                                fontWeight={600}
                                fontSize={scale(12) + "px"}
                                textAlign={"center"}
                            >
                                Download PDF
                            </Text>
                        </Card>
                        <Card
                            _dark={{
                                bg: "#fff",
                            }}
                        >
                            <Text
                                color={"#000"}
                                fontWeight={600}
                                fontSize={scale(12) + "px"}
                                textAlign={"center"}
                            >
                                Resend Email
                            </Text>
                        </Card>
                        <Card
                            _dark={{
                                bg: "#fff",
                            }}
                        >
                            <Text
                                color={"#000"}
                                fontWeight={600}
                                fontSize={scale(12) + "px"}
                                textAlign={"center"}
                            >
                                Review
                            </Text>
                        </Card>
                    </VStack>
                </VStack>
            </VStack>
        </Scroller>
    );
}
