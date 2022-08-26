import React from "react";
import { Marker } from "react-native-maps";
import Animated, { ZoomInDown, ZoomOutUp } from "react-native-reanimated";
import MarkerBar from "../LocationMarker/LocationMarker";
import { ICAR } from "../../MapScreen";

function MapLoc({ car, onPress }: { car: ICAR; onPress?: () => void }) {
    return (
        <Marker
            onPress={onPress}
            coordinate={car.coordinates}
            tracksViewChanges={false}
        >
            <Animated.View entering={ZoomOutUp} exiting={ZoomInDown}>
                <MarkerBar fuelPercentage={car.fuel} type={car.type} />
            </Animated.View>
        </Marker>
    );
}

export default React.memo(MapLoc);
