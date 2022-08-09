import { useNavigation } from "@react-navigation/native";
import { Button, Pressable, Text, useColorMode, VStack } from "native-base";
import React from "react";
import DatePickerModal from "../../components/DatePickerModal/DatePickerModal";
import ImageBg from "../../components/ImageBg/ImageBg";

export default function SelectArrivalDate() {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const [date, setDate] = React.useState(new Date());

    const [show, setShow] = React.useState(false);

    const currentDate = date.getDate();
    const currentMonth = monthNames[date.getMonth()];
    const currentYear = date.getFullYear();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: colorMode === "light" ? "white" : "black",
        });
    }, [navigation, colorMode]);

    const bgType = colorMode === "dark" ? "dark" : "";

    return (
        <ImageBg type={bgType}>
            <VStack alignItems={"center"}>
                <Text
                    w={210}
                    color={"#fff"}
                    fontWeight={700}
                    fontSize={17}
                    textAlign="center"
                    mt={"40%"}
                >
                    Select arrival date.
                </Text>

                <VStack
                    mt={8}
                    bg="#fff"
                    px="6"
                    py={2}
                    w={[320, 360, 500]}
                    borderRadius={25}
                    space={4}
                    _dark={{
                        bg: "primary.100",
                    }}
                >
                    <Pressable py={4} onPress={() => setShow(true)}>
                        <VStack
                            justifyContent={"space-between"}
                            borderBottomColor="light.200"
                            borderBottomWidth={1}
                            py="2"
                        >
                            <Text
                                color={"gray.400"}
                                fontWeight={500}
                                fontSize={12}
                                mb="0.5"
                                _dark={{
                                    color: "white",
                                }}
                            >
                                Date of Arrival
                            </Text>
                            <Text
                                mb={2}
                                color={"#000"}
                                fontWeight={600}
                                fontSize={15}
                                _dark={{
                                    color: "white",
                                }}
                            >
                                {currentDate < 10 ? "0" : ""}
                                {currentDate} - {currentMonth} - {currentYear}{" "}
                            </Text>
                        </VStack>
                    </Pressable>
                </VStack>

                <Button
                    onPress={() => navigation.navigate("AddCards")}
                    mt={"80%"}
                    title="Continue"
                    w={[250, 280, 310]}
                    p="3"
                    bg="#fff"
                    borderRadius={16}
                    shadow="7"
                    color="primary.100"
                    _text={{
                        color: "primary.100",
                        fontWeight: "700",
                        fontSize: 13,
                        textTransform: "uppercase",
                    }}
                    _pressed={{
                        bg: "#ffeeec",
                    }}
                    _dark={{
                        bg: "primary.100",
                        _pressed: {
                            bg: "primary.200",
                        },
                        _text: {
                            color: "white",
                        },
                    }}
                >
                    Continue
                </Button>
                <DatePickerModal
                    isOpen={show}
                    onClose={() => setShow(false)}
                    setDate={(dt) => setDate(dt)}
                />
            </VStack>
        </ImageBg>
    );
}
