import { useNavigation } from "@react-navigation/native";
import { Button, Text, useColorMode, VStack } from "native-base";
import React from "react";
import ImageBg from "../../components/ImageBg/ImageBg";
import CheckBoxGroup from "./components/CheckBoxGroup/CheckBoxGroup";

export interface ICitizenship {
    id: number;
    type: string;
}

const items: ICitizenship[] = [
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

export default function SelectCitizenShip() {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();
    const [selected, setSelected] = React.useState(items[0]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: colorMode === "light" ? "white" : "black",
        });
    }, [navigation, colorMode]);

    const bgType = colorMode === "dark" ? "dark" : "";

    const handleNavigation = () => {
        if (selected.id !== 1) {
            navigation.navigate("SelectArrivalDate", {
                citizenShip: selected,
            });
        } else {
            navigation.navigate("AddCards", {
                citizenShip: selected,
            });
        }
    };

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
                    items={items}
                />

                <Button
                    onPress={handleNavigation}
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
