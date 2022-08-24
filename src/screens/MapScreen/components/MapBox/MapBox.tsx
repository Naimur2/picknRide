import { useNavigation } from "@react-navigation/native";
import { Factory } from "native-base";
import React from "react";
import { Dimensions, Keyboard } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { ILatLng } from "../../MapScreen";
import MapLoc from "../MapLoc/MapLoc";
import Constants from "expo-constants";

function MapBox({ markers, currentLocation, destinationLocation, children }) {
    const Map = Factory(MapView);
    const mapRef = React.useRef<MapView>(null);
    const navigation = useNavigation();
    const { height, width } = Dimensions.get("window");

    const config = Constants?.manifest?.extra as { [key: string]: any };

    const [initialRegion, setInitialRegion] = React.useState({
        latitude: 25.286106,
        longitude: 51.534817,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    React.useEffect(() => {
        mapRef.current?.animateToRegion(initialRegion, 300);
    }, [navigation]);

    const fitToCoordinatesHandler = (coordinates: ILatLng[]) => {
        if (mapRef.current) {
            mapRef.current.fitToSuppliedMarkers(coordinates, {
                edgePadding: {
                    right: (width / 20) * 1.2,
                    left: (width / 20) * 1.2,
                    top: (height / 20) * 1.2,
                    bottom: (height / 20) * 1.2,
                },
            });

            mapRef.current.animateToRegion(initialRegion, 300);
        }
    };

    React.useEffect(() => {
        if (currentLocation && destinationLocation) {
            const coordinates = [
                {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                },
                {
                    latitude: destinationLocation.latitude,
                    longitude: destinationLocation.longitude,
                },
            ];
            fitToCoordinatesHandler(coordinates);
        }
    }, [destinationLocation, initialRegion]);

    React.useEffect(() => {
        if (mapRef.current && markers) {
            const markersCoords = markers.map((marker) => {
                return {
                    latitude: marker?.coordinates?.latitude,
                    longitude: marker?.coordinates?.longitude,
                };
            });

            // mapRef.current.animateToRegion(initialRegion, 300);
            mapRef?.current?.fitToSuppliedMarkers(
                markersCoords,
                false // not animated
            );
        }
    }, [markers]);

    const hasInitialRegion =
        initialRegion.latitude !== 0 && initialRegion.longitude !== 0;
    const hasDestinationLocation =
        destinationLocation?.latitude !== 0 &&
        destinationLocation?.longitude !== 0;

    return (
        <Map
            ref={mapRef}
            initialRegion={initialRegion}
            flex={1}
            provider={PROVIDER_GOOGLE}
            w={width}
            h={height}
            onPress={() => Keyboard.dismiss()}
        >
            {markers?.map((car, index) => (
                <MapLoc key={car._id.toString() + index.toString()} car={car} />
            ))}
            {hasDestinationLocation && hasInitialRegion ? (
                <MapViewDirections
                    origin={initialRegion}
                    destination={destinationLocation}
                    apikey={config?.GOOGLE_MAP_KEY ?? ""}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
            ) : null}
            {children}
        </Map>
    );
}

export default React.memo(MapBox);
