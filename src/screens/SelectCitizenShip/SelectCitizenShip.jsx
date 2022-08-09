import { useNavigation } from "@react-navigation/native";
import {
    Box,
    Button,
    Factory,
    HStack,
    Pressable,
    Text,
    useColorMode,
    VStack,
} from "native-base";
import React from "react";
import { TouchableHighlight } from "react-native";
import { Tick } from "../../components/Icons/Icons";
import ImageBg from "../../components/ImageBg/ImageBg";

export default function SelectCitizenShip() {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();
    const [selected, setSelected] = React.useState(1);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: colorMode === "light" ? "white" : "black",
        });
    }, [navigation, colorMode]);

    const items = [
        {
            id: 1,
            type: "Qatar Citizen / Resident",
        },
        {
            id: 2,
            type: "GCC Resident",
        },
        {
            id: 3,
            type: "Visitor / Tourist",
        },
    ];

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
                    Select one from below to proceed.
                </Text>

                <VStack
                    mt={8}
                    bg="#fff"
                    px="6"
                    py={6}
                    w={[320, 360, 500]}
                    borderRadius={26}
                    space={4}
                    _dark={{
                        bg: "primary.100",
                    }}
                >
                    {items.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() => setSelected(item.id)}
                        >
                            <HStack
                                justifyContent={"space-between"}
                                alignItems="center"
                                py={2}
                            >
                                <Text
                                    color={"#000"}
                                    fontWeight={600}
                                    fontSize={15}
                                    _dark={{
                                        color: "white",
                                    }}
                                >
                                    {item.type}
                                </Text>
                                {selected === item.id ? (
                                    <Tick
                                        color={"primary.100"}
                                        _dark={{
                                            color: "white",
                                        }}
                                    />
                                ) : (
                                    <Box
                                        borderColor={"primary.100"}
                                        borderWidth={"2"}
                                        h="24px"
                                        w="24px"
                                        borderRadius={100}
                                        _dark={{
                                            borderColor: "white",
                                        }}
                                    />
                                )}
                            </HStack>
                        </Pressable>
                    ))}
                </VStack>

                <Button
                    onPress={() => navigation.navigate("SelectArrivalDate")}
                    mt={"60%"}
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
            </VStack>
        </ImageBg>
    );
}
