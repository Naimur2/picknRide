import { VStack, Pressable } from "native-base";
import React from "react";
import { ICAR } from "../../MapScreen";
import BottomScan from "../BottomScan/BottomScan";
import LocationSearch from "../LocationSearch/LocationSearch";
import MapTopDetails from "../MapTopDetails/MapTopDetails";
import SpeedMeter from "../SpeedMeter/SpeedMeter";
import { Dimensions } from "react-native";

function MapscreenComp({ type, setType, setDestination }) {
    const { height, width } = Dimensions.get("window");

    const updateType = React.useMemo(() => {
        return (carType: ICAR) => {
            setType(carType);
        };
    }, []);

    return (
        <VStack
            flex={1}
            position="absolute"
            zIndex={10000}
            w={width}
            bg={"transparent"}
            pointerEvents="box-none"
        >
            <VStack>
                <LocationSearch
                    setDestinationLocation={setDestination}
                    selectedType={type}
                    position="absolute"
                    zIndex={1}
                />
                <MapTopDetails
                    selected={type}
                    px="6"
                    setSelected={updateType}
                    mt={"80px"}
                />
            </VStack>
            <SpeedMeter />
            <BottomScan />
        </VStack>
    );
}

export default React.memo(MapscreenComp);
