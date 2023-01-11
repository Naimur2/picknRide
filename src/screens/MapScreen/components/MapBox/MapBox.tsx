import { useNavigation } from "@react-navigation/native";
import { selectNearestCars } from "@store/features/cars/carsSlice";
import { Factory } from "native-base";
import React from "react";
import { Dimensions, Keyboard } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useSelector } from "react-redux";
import { ILatLng } from "../../MapScreen.types";
import { carsData } from "../../data";
import AllMarkers from "../AllMarker/AllMarker";
import { selectCurrentRegion } from "@store/features/user-location/userLocationSlice";

export interface IMapScreenProps {
    children?: any;
}
const { height, width } = Dimensions.get("window");

function MapBox() {
    const Map = Factory(MapView);
    const mapRef = React.useRef<MapView>(null);
    const navigation = useNavigation();
    const markers = useSelector(selectNearestCars);
    const initialRegion = useSelector(selectCurrentRegion) as Region;
    console.log("initialRegion", initialRegion);

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
        mapRef.current?.animateToRegion(initialRegion, 300);
    }, [navigation, initialRegion]);

    React.useEffect(() => {
        if (markers.length > 0) {
            const coordinates = markers.map((marker) => ({
                latitude: marker.latitude,
                longitude: marker.longitude,
            }));
            fitToCoordinatesHandler(coordinates);
        }
    }, [markers]);

    return (
        <Map
            ref={mapRef}
            initialRegion={initialRegion as Region}
            flex={1}
            // provider={PROVIDER_GOOGLE}
            w={width}
            h={height}
            onPress={() => Keyboard.dismiss()}
        >
            <AllMarkers markers={markers} />
        </Map>
    );
}

export default React.memo(React.forwardRef(MapBox));
