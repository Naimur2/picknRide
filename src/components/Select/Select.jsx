import { Factory, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { ChevronDown, Tick } from "../Icons/Icons";
import Scroller from "./../Scroller/Scroller";

export default function Select({ data, onSelect }) {
    const [selected, setSelected] = React.useState(null);
    const Touchable = Factory(TouchableOpacity);
    const actionSheetRef = React.useRef(null);

    React.useEffect(() => {
        if (selected) {
            onSelect?.(selected);
        }
    }, [selected]);

    actionSheetRef.current?.snapToOffset(200);

    return (
        <>
            <Pressable onPress={() => SheetManager.show("location_picker")}>
                <HStack
                    borderWidth={0}
                    bg="white"
                    px={6}
                    py={5}
                    mb={2}
                    borderRadius={20}
                    justifyContent="space-between"
                    alignItems={"center"}
                >
                    <Text py={1} color={selected ? "gray.200" : "gray.300"}>
                        {selected?.name || "Location"}
                    </Text>
                    <ChevronDown color={selected ? "gray.200" : "gray.300"} />
                </HStack>
            </Pressable>

            <ActionSheet
                id={"location_picker"}
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
                                key={index}
                                onPress={() => {
                                    setSelected(item);
                                    SheetManager.hide("location_picker");
                                }}
                            >
                                <HStack
                                    borderBottomWidth={"1.5px"}
                                    borderBottomColor={"#cccccc70"}
                                    py="5"
                                    p="6"
                                    bg={
                                        selected?.id === item.id
                                            ? "blueGray.100"
                                            : "white"
                                    }
                                    justifyContent="space-between"
                                >
                                    <Text>{item.name}</Text>
                                    {selected?.id === item.id && (
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
