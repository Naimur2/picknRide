import CModal from "@components/CModal/CModal";
import H3 from "@components/H3/H3";
import { Button, HStack, VStack } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ICAR } from "../../MapScreen";
import BottomScan from "../BottomScan/BottomScan";
import CarDetailsSheet from "../BottomScan/components/CarDetailsSheet/CarDetailsSheet";
import GeoSheet from "../BottomScan/components/GeoSheet/GeoSheet";
import SelectActionSheet from "../BottomScan/components/SelectActionSheet/SelectActionSheet";
import SpeedSheet from "../BottomScan/components/SpeedSheet/SpeedSheet";
import LocationSearch from "../LocationSearch/LocationSearch";
import MapTopDetails from "../MapTopDetails/MapTopDetails";
import SpeedMeter from "../SpeedMeter/SpeedMeter";

import { selectCarTripInfo } from "@store/features/car-trip/carTripSlice";
import { ICarTripState } from "@store/features/car-trip/carTripSlice.types";
import { fontSizes } from "@theme/typography";
import { useSelector } from "react-redux";
import Sos from "../Sos/Sos";

export interface IMapTopDetailsProps {
    type: ICAR;
    setType: (type: ICAR) => void;
}

function MapscreenComp({ type, setType }: IMapTopDetailsProps) {
    const { height, width } = Dimensions.get("window");
    const carTripDetails: ICarTripState = useSelector(selectCarTripInfo);

    const updateType = React.useMemo(() => {
        return (carType: ICAR) => {
            setType(carType);
        };
    }, []);

    const insets = useSafeAreaInsets();

    React.useEffect(() => {
        if (carTripDetails?.hasStartedJourney) {
            SheetManager.show("carDetailsSheet");
        } else if (!carTripDetails?.hasStartedJourney) {
            SheetManager.hide("carDetailsSheet");
        }
    }, [carTripDetails]);

    return (
        <VStack
            flex={1}
            position="absolute"
            zIndex={10000}
            w={width}
            bg={"transparent"}
            pointerEvents="box-none"
            pt={insets.top + 15 + "px"}
            justifyContent="space-between"
            h={height}
        >
            <VStack>
                <LocationSearch
                    setDestinationLocation={() => {}}
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
            {carTripDetails?.hasStartedJourney ? <Sos /> : null}
            <BottomScan
                onLeftPress={() => SheetManager.show("selectionSheet")}
            />

            <SpeedSheet sheetId="speedSheet" onBtnPress={() => {}} />

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

            <CModal isOpen={false} py={8}>
                <H3 fontSize={fontSizes.lg} textAlign="center">
                    Before ending the ride make sure you have parked in a safe
                    zone. Make sure above 25% of fuel.
                </H3>
                <HStack justifyContent={"space-between"} px="4">
                    <Button
                        _text={{
                            fontWeight: 700,
                            fontSize: 11,
                            textTransform: "uppercase",
                            color: "primary.100",
                        }}
                        w={"100%"}
                        borderRadius={14}
                        variant="outline"
                        borderColor={"primary.100"}
                        borderWidth={1.5}
                        _pressed={{
                            bg: "#ffffff80",
                        }}
                        onPress={() => console.log("pressed")}
                    >
                        CONFIRM END RIDE
                    </Button>
                </HStack>
            </CModal>
        </VStack>
    );
}

export default React.memo(MapscreenComp);
