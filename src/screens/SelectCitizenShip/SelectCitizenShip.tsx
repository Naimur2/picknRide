import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Button, Text, useColorMode, VStack } from "native-base";
import React from "react";
import apiConfig from "../../api_config/ApiConfig";
import ImageBg from "../../components/ImageBg/ImageBg";
import CheckBoxGroup from "./components/CheckBoxGroup/CheckBoxGroup";

export interface ICitizenship {
    id: number;
    resident: string;
    resident_name: string;
    status: string;
    created_at: string;
    updated_at: string;
}

const items: ICitizenship[] = [
    {
        id: 1,
        resident: "Demo-1",//"Qatar Citizen / Resident",
        resident_name: "Qatar Citizen / Resident",
        status: "1",
        created_at: "2021-05-25T11:30:00.000000Z",
        updated_at: "2021-05-25T11:30:00.000000Z",
    },
    {
        id: 2,
        resident: "GCC Resident",
        resident_name: "GCC Resident",
        status: "1",
        created_at: "2021-05-25T11:30:00.000000Z",
        updated_at: "2021-05-25T11:30:00.000000Z",

    },
    {
        id: 3,
        resident: "Visitor / Tourist",
        resident_name: "Visitor / Tourist",
        status: "1",
        created_at: "2021-05-25T11:30:00.000000Z",
        updated_at: "2021-05-25T11:30:00.000000Z",
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

    // get Residency from api
    const [residency, setResidency] = React.useState<ICitizenship[]>([]);
    React.useEffect(() => {
        const getResidency = async () => {
            const res = await axios.get(`${apiConfig.apiUrl}/getResidency`);
            setResidency(res?.data?.data);
        }
        getResidency();
    }, [navigation]);

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
                    items={residency}
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
