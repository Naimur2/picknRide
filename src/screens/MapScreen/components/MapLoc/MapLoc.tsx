import React from "react";
import { Marker } from "react-native-maps";
import Animated, { ZoomInDown, ZoomOutUp } from "react-native-reanimated";
import { IVeichle } from "../../MapScreen.types";
import MarkerBar from "../LocationMarker/LocationMarker";

function MapLoc({ car, onPress }: { car: IVeichle; onPress?: () => void }) {
    return (
        <Marker
            onPress={onPress}
            coordinate={{
                longitude: car.longitude,
                latitude: car.latitude,
            }}
            tracksViewChanges={false}
        >
            <MarkerBar {...car} />
        </Marker>
    );
}

export default React.memo(MapLoc);
