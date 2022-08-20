import { useNavigation } from "@react-navigation/native";
import { Factory } from "native-base";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapLoc from "../MapLoc/MapLoc";

function MapBox({ markers, currentLocation, destinationLocation }) {
    const Map = Factory(MapView);
    const mapRef = React.useRef<MapView>(null);
    const navigation = useNavigation();

    const [initialRegion, setInitialRegion] = React.useState({
        latitude: 25.286106,
        longitude: 51.534817,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    React.useEffect(() => {
        mapRef.current?.animateToRegion(initialRegion, 300);
        mapRef.current?.fitToCoordinates(markers, {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
        });
    }, [navigation]);

    return (
        <Map
            ref={mapRef}
            initialRegion={initialRegion}
            flex={1}
            provider={PROVIDER_GOOGLE}
            zIndex={-1}
            position="absolute"
            w="full"
            h="full"
        >
            {markers?.map((car) => (
                <MapLoc key={car._id} car={car} />
            ))}
        </Map>
    );
}

export default React.memo(MapBox);
