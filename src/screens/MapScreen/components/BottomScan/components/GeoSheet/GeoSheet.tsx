import React from "react";
import { Actionsheet, HStack, VStack, Text } from "native-base";
import { ErrorOutline } from "../../../../../../components/Icons/Icons";
import GeoButton from "./components/GeoButton/GeoButton";

export default function GeoSheet({ isOpen, onClose }) {
    return (
        <Actionsheet onClose={onClose} isOpen={isOpen}>
            <Actionsheet.Content
                _dragIndicator={{
                    bg: "light.100",
                    borderRadius: 8,
                }}
                py={4}
            >
                <GeoButton
                    title="Restricted Area"
                    subTitle="Riders cannot ride in this zone"
                    variant="warning"
                />
                <GeoButton
                    title="Riders Zone"
                    subTitle="Riders can drive within this zone"
                    variant="veichle"
                />
                <GeoButton
                    title="Parking Zone"
                    subTitle="Riders can park their vehicle in this zone"
                    variant="banned"
                />
                <GeoButton
                    title="Parking Zone"
                    subTitle="Riders can park their vehicle in this zone"
                    variant="park"
                />
            </Actionsheet.Content>
        </Actionsheet>
    );
}
