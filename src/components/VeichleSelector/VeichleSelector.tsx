import React from "react";
import ViichleCircle from "./components/ViichleCircle/ViichleCircle";
import { HStack } from "native-base";

export default function VeichleSelector({ selected, setSelected, ...rest }) {
    return (
        <HStack space={2} {...rest}>
            <ViichleCircle
                type="cycle"
                isActive={selected === "cycle"}
                onPress={() => setSelected?.("cycle")}
            />
            <ViichleCircle
                type="car"
                isActive={selected === "car"}
                onPress={() => setSelected?.("car")}
            />
            <ViichleCircle
                type="scooter"
                isActive={selected === "scooter"}
                onPress={() => setSelected?.("scooter")}
            />
        </HStack>
    );
}
