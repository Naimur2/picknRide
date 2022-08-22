import { VStack } from "native-base";
import React from "react";
import { ICAR } from "../../MapScreen";
import BottomScan from "../BottomScan/BottomScan";
import LocationSearch from "../LocationSearch/LocationSearch";
import SpeedMeter from "../SpeedMeter/SpeedMeter";
import MapTopDetails from "../MapTopDetails/MapTopDetails";

function MapscreenComp({ type, setType, setDestination }) {
    const updateType = React.useMemo(() => {
        return (carType: ICAR) => {
            setType(carType);
        };
    }, []);

    return (
        <VStack flex="1">
            <VStack>
                <LocationSearch
                    setDestinationLocation={setDestination}
                    selectedType={type}
                />
                <MapTopDetails
                    selected={type}
                    px="6"
                    setSelected={updateType}
                />
            </VStack>
            <SpeedMeter />
            <BottomScan />
        </VStack>
    );
}

export default React.memo(MapscreenComp);
