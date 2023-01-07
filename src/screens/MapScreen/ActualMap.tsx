import { VStack } from "native-base";
import React from "react";

import MapBox, { IMapScreenProps } from "./components/MapBox/MapBox";
import MapscreenComp, {
    IMapTopDetailsProps,
} from "./components/MapScreenComp/MapscreenComp";
import { IVeichle, ICAR } from "./MapScreen";

interface IMapProps extends IMapScreenProps, IMapTopDetailsProps {
    cars: IVeichle[] | null;
}

function ActualMap({
    type,
    setType,
    setDestination,
    cars,
    destinationLocation,
    initialRegion,
    currentLocation,
}: IMapProps) {
    const [carType, setCarType] = React.useState<ICAR>("scooter");

    return (
        <VStack
            flex={1}
            position="relative"
            justifyContent="space-between"
            h="full"
            w="full"
            collapsable={false}
        >
            <VStack flex="1" collapsable={false}>
                <MapscreenComp
                    type={carType}
                    setType={(t) => setCarType(t)}
                    setDestination={setDestination}
                />

                <MapBox
                    markers={cars}
                    destinationLocation={destinationLocation}
                    initialRegion={initialRegion}
                    currentLocation={currentLocation}
                />
            </VStack>
        </VStack>
    );
}

export default React.memo(ActualMap);
