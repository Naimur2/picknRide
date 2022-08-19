import React from "react";
import { Marker } from "react-native-maps";
import MarkerBar from "../LocationMarker/LocationMarker";

function MapLoc({ car, onPress }) {
    return (
        <Marker
            onPress={onPress}
            coordinate={car.coordinates}
            tracksViewChanges={false}
        >
            <MarkerBar fuelPercentage={car.fuel} type={car.type} />
        </Marker>
    );
}

export default React.memo(MapLoc);
