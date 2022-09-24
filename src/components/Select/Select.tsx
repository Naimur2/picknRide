import { Actionsheet, Pressable, Text } from "native-base";
import React from "react";

import axios from "axios";
import { scale } from "react-native-size-matters";
import apiConfig from "../../api_config/ApiConfig";
import { ChevronDown } from "../Icons/Icons";
import LocationSheetContent from "./components/LocationSheetContent/LocationSheetContent";
export interface Ilocations {
    id: number;
    name: string;
    location: string;
    location_ar: string;
    latitude: string;
    longitude: string;
    status: string;
    created_at: string;
    update: string;

}

const data: Ilocations[] = [
    {
        id: 1,
        name: "Chittagong",
    },
    {
        id: 2,
        name: "Dhaka",
    },
    {
        id: 3,
        name: "Khulna",
    },
    {
        id: 4,
        name: "Rajshahi",
    },
    {
        id: 5,
        name: "Rangpur",
    },
    {
        id: 6,
        name: "Sylhet",
    },
    {
        id: 7,
        name: "Barisal",
    },
    {
        id: 8,
        name: "Mymensingh",
    },
];

export default function Select({
    onSelect,
    selected,
}: {
    onSelect: (item: any) => void;
    selected: any;
}) {
    const [isOpen, setIsOpen] = React.useState(false);

    // get locations from api
    const [locations, setLocations] = React.useState<Ilocations[]>([]);
    React.useEffect(() => {
        axios
            .get(`${apiConfig.apiUrl}/getLocation`)
            .then((res) => {
                // console.log(res.data);
                setLocations(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Pressable
                bg={"#fff"}
                shadow="9"
                borderRadius={20}
                overflow="hidden"
                borderWidth={0}
                px={6}
                py={4}
                mb={2}
                flexDir="row"
                justifyContent="space-between"
                alignItems={"center"}
                onPress={() => setIsOpen(true)}
            >
                <Text
                    fontSize={scale(12)}
                    py={1}
                    color={selected ? "gray.200" : "gray.300"}
                >
                    {selected?.location || "Location"}
                </Text>
                <ChevronDown color={selected ? "gray.200" : "gray.300"} />
            </Pressable>

            <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Actionsheet.Content>
                    <LocationSheetContent
                        locations={locations}
                        onSelect={(item) => {
                            onSelect?.(item);
                            setIsOpen(false);
                        }}
                        selected={selected}
                    />
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}
