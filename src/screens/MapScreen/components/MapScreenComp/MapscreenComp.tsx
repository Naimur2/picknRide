import { View, Text } from "react-native";
import React from "react";
import LocationSearch from "../LocationSearch/LocationSearch";
import VeichleTemp from "../VeichleTemp/VeichleTemp";
import SpeedMeter from "../SpeedMeter/SpeedMeter";
import BottomScan from "../BottomScan/BottomScan";
import MapBox from "../MapBox/MapBox";
import { VStack } from "native-base";
import { ICAR } from "../../MapScreen";

function MapscreenComp({ type, setType }) {
    const [destinationLocation, setDestinationLocation] = React.useState(null);

    const updateType = React.useMemo(() => {
        return (carType: ICAR) => {
            setType(carType);
        };
    }, []);

    return (
        <VStack flex="1">
            <LocationSearch
                setDestinationLocation={(dest) => setDestinationLocation(dest)}
                selectedType={type}
            />
            <VeichleTemp selected={type} px="6" setSelected={updateType} />
            <SpeedMeter />
            <BottomScan />
        </VStack>
    );
}

export default React.memo(MapscreenComp);
