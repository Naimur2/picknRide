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
import CheckBoxGroup from "./components/CheckBoxGroup";

export default function SelectCitizenShip() {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();
    const [selected, setSelected] = React.useState(1);

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
                    Select one from below to proceed.
                </Text>

                <CheckBoxGroup
                    onSelect={(it) => setSelected(it)}
                    selected={selected}
                />

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
