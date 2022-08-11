import { View, Text } from "react-native";
import React from "react";
import { VStack } from "native-base";
import Scroller from "../../../Scroller/Scroller";
import { Ilocations } from "../../Select";
import SelectedItem from "../SelectedItem/SelectedItem";

export default function LocationSheetContent({
    locations,
    onSelect,
    selected,
}: {
    locations: Ilocations[];
    onSelect: (item: any) => void;
    selected: Ilocations;
}) {
    return (
        <VStack h={"full"} w="full">
            <Scroller nestedScrollEnabled={true}>
                {locations?.map((item, index) => {
                    return (
                        <SelectedItem
                            key={`${item?.id + index} ${item?.name}`}
                            title={item?.name}
                            isSelected={item?.id === selected?.id}
                            onPress={() => {
                                onSelect?.(item);
                            }}
                        />
                    );
                })}
            </Scroller>
        </VStack>
    );
}
