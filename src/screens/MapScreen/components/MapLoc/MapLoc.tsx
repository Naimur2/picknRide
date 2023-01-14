import React from "react";
import { MarkerAnimated } from "react-native-maps";
import { IVeichle } from "../../MapScreen.types";
import MarkerBar from "../LocationMarker/LocationMarker";

function MapLoc({ car, onPress }: { car: IVeichle; onPress?: () => void }) {
    return (
        <MarkerAnimated
            onPress={onPress}
            coordinate={{
                longitude: car.longitude,
                latitude: car.latitude,
            }}
            tracksViewChanges={false}
        >
            <MarkerBar {...car} />
        </MarkerAnimated>
    );
}

export default React.memo(MapLoc);
