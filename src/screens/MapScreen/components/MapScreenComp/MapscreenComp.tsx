import { VStack, Pressable } from "native-base";
import React from "react";
import { ICAR } from "../../MapScreen";
import BottomScan from "../BottomScan/BottomScan";
import LocationSearch from "../LocationSearch/LocationSearch";
import MapTopDetails from "../MapTopDetails/MapTopDetails";
import SpeedMeter from "../SpeedMeter/SpeedMeter";
import { Dimensions } from "react-native";
import SpeedSheet from "../BottomScan/components/SpeedSheet/SpeedSheet";
import { SheetManager } from "react-native-actions-sheet";
import CarDetailsSheet from "../BottomScan/components/CarDetailsSheet/CarDetailsSheet";
import GeoSheet from "../BottomScan/components/GeoSheet/GeoSheet";
import SelectActionSheet from "../BottomScan/components/SelectActionSheet/SelectActionSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function MapscreenComp({ type, setType, setDestination }) {
    const { height, width } = Dimensions.get("window");

    const updateType = React.useMemo(() => {
        return (carType: ICAR) => {
            setType(carType);
        };
    }, []);

    React.useEffect(() => {
        // SheetManager.show("speedSheet");
        // return () => {
        //     SheetManager.hide("speedSheet");
        // };
    }, []);

    const insets = useSafeAreaInsets();

    return (
        <VStack
            flex={1}
            position="absolute"
            zIndex={10000}
            w={width}
            bg={"transparent"}
            pointerEvents="box-none"
            pt={insets.top + 15 + "px"}
        >
            <VStack>
                <LocationSearch
                    setDestinationLocation={setDestination}
                    selectedType={type}
                    position="absolute"
                    zIndex={100000}
                />
                <MapTopDetails
                    selected={type}
                    px="6"
                    setSelected={updateType}
                    mt={"80px"}
                />
            </VStack>
            <SpeedMeter />
            <BottomScan
                onLeftPress={() => SheetManager.show("selectionSheet")}
            />

            <SpeedSheet
                sheetId="speedSheet"
                onBtnPress={() => console.log("end")}
            />

            <CarDetailsSheet
                sheetId="carDetailsSheet"
                avaiableDistance={"3.2 km"}
                availeTime={"1 hour"}
                availableBattery={"100%"}
                carId={"10545"}
            />

            <GeoSheet sheetId={"geoSheet"} />

            <SelectActionSheet
                sheetId="selectionSheet"
                onBtn2Press={() => {
                    SheetManager.hide("selectionSheet");
                    SheetManager.show("geoSheet");
                }}
            />
        </VStack>
    );
}

export default React.memo(MapscreenComp);
