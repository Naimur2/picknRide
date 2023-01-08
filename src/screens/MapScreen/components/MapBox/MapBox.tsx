import { useNavigation } from "@react-navigation/native";
import { Factory } from "native-base";
import React from "react";
import { Dimensions, Keyboard } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { carsData } from "../../data";
import AllMarkers from "../AllMarker/AllMarker";
import { ILatLng } from "../../MapScreen.types";

export interface IMapScreenProps {
    destinationLocation: ILatLng;
    currentLocation: ILatLng;
    children?: any;
    initialRegion: ILatLng;
}
const { height, width } = Dimensions.get("window");

function MapBox(
    { currentLocation, destinationLocation, initialRegion }: IMapScreenProps,
    ref: any
) {
    const Map = Factory(MapView);
    const mapRef = React.useRef<MapView>(null);
    const navigation = useNavigation();
    const [markers, setMarkers] = React.useState<IVeichle[] | null>(null);

    React.useEffect(() => {
        setMarkers(carsData);
    }, []);

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
            const markersCoords: ILatLng[] = markers?.map((marker) => {
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
        initialRegion?.latitude !== 0 && initialRegion?.longitude !== 0;

    const hasDestinationLocation =
        destinationLocation?.latitude !== 0 &&
        destinationLocation?.longitude !== 0;

    const renderMap = hasDestinationLocation && hasInitialRegion;

    React.useImperativeHandle(ref, () => ({
        fitToCoordinatesHandler,
        get map() {
            return mapRef.current as MapView;
        },
    }));

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
            <AllMarkers markers={markers} />

            {/* {renderMap ? (
                <MapViewDirections
                    origin={initialRegion}
                    destination={destinationLocation}
                    apikey={config?.GOOGLE_MAP_KEY || null}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
            ) : (
                <></>
            )} */}
        </Map>
    );
}

export default React.memo(React.forwardRef(MapBox));
