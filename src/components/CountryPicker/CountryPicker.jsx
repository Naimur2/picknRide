import { Factory, HStack, Input, Pressable, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { ChevronDownFill, Tick } from "../Icons/Icons";
import Scroller from "./../Scroller/Scroller";
import {
    getCountriesInRange,
    getCountriesLength,
    getCountryByCode,
} from "./countries";
// import SvgUri from "expo-svg-uri";

export default function CountryPicker({
    onSelect,
    onChangeText,
    value,
    onFocus,
    onBlur,
    ...rest
}) {
    const [selected, setSelected] = React.useState(null);
    const Touchable = Factory(TouchableOpacity);
    const actionSheetRef = React.useRef(null);

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        if (selected) {
            onSelect?.(selected);
        }
    }, [selected]);

    React.useEffect(() => {
        const quatar = getCountryByCode("QA");
        setSelected(quatar);
    }, []);

    actionSheetRef.current?.snapToOffset(200);

    const handleASOpen = () => {
        const countryData = getCountriesInRange(0, 60);
        setData(countryData);
    };

    return (
        <>
            <Input
                borderWidth={0}
                bg="white"
                shadow="9"
                px={6}
                py={6}
                borderRadius={20}
                placeholder="Phone Number"
                _focus={{
                    bg: "white",
                }}
                color="gray.200"
                fontSize={14}
                fontWeight="500"
                placeholderTextColor="gray.300"
                mb={2}
                onChangeText={(text) => {
                    onChangeText?.(text);
                }}
                onFocus={() => {
                    onFocus?.();
                }}
                onBlur={() => {
                    onBlur?.();
                }}
                value={value}
                {...rest}
                leftElement={
                    <Pressable
                        onPress={() => SheetManager.show("country_picker")}
                    >
                        <HStack space={1} pl={5} alignItems={"center"}>
                            <Text
                                fontSize={15}
                                fontWeight={500}
                                color={"gray.200"}
                            >
                                {selected?.dialCode || "+974"}
                            </Text>
                            <ChevronDownFill color="gray.200" />
                        </HStack>
                    </Pressable>
                }
            />

            <ActionSheet
                id={"country_picker"}
                onOpen={handleASOpen}
                gestureEnabled
                indicatorStyle={{
                    marginVertical: 20,
                }}
                containerStyle={{
                    height: "100%",
                }}
            >
                <VStack h={"full"}>
                    <Scroller nestedScrollEnabled={true}>
                        {data?.map((item, index) => (
                            <Touchable
                                key={index + item.code}
                                onPress={() => {
                                    setSelected(item);
                                    SheetManager.hide("country_picker");
                                }}
                            >
                                <HStack
                                    key={index + item.code}
                                    borderBottomWidth={"1.5px"}
                                    borderBottomColor={"#cccccc70"}
                                    py="5"
                                    p="6"
                                    bg={
                                        selected?.code === item.code
                                            ? "blueGray.100"
                                            : "white"
                                    }
                                    justifyContent="space-between"
                                >
                                    <HStack space="1">
                                        <Text fontSize={12}>
                                            ({item.dialCode})
                                        </Text>
                                        <Text fontSize={12} numberOfLines={2}>
                                            {item.country}
                                        </Text>
                                    </HStack>
                                    {selected?.code === item.code && (
                                        <Tick color={"primary.100"} />
                                    )}
                                </HStack>
                            </Touchable>
                        ))}
                    </Scroller>
                </VStack>
            </ActionSheet>
        </>
    );
}
