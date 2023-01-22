import { useNavigation } from "@react-navigation/native";
import { selectNearestCars } from "@store/features/cars/carsSlice";
import { Factory } from "native-base";
import React from "react";
import { Dimensions, Keyboard } from "react-native";
import MapView, { AnimatedRegion, Region } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectInitialLocation } from "../../../../redux/features/user-location/userLocationSlice";
import { ILatLng } from "../../MapScreen.types";
import AllMarkers from "../AllMarker/AllMarker";

export interface IMapScreenProps {
    children?: any;
}
const { height, width } = Dimensions.get("window");

const getAnaimatedRegion = (region: Region) => {
    return new AnimatedRegion({
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
    });
};

function MapBox() {
    const Map = Factory(MapView);
    const mapRef = React.useRef<MapView>(null);
    const navigation = useNavigation();
    const markers = useSelector(selectNearestCars);
    const initialRegion = useSelector(selectInitialLocation) as Region;

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
    }, [navigation]);

    React.useEffect(() => {
        if (markers.length > 0) {
            const coordinates = markers.map((mk) => ({
                latitude: mk.latitude,
                longitude: mk.longitude,
            }));
            fitToCoordinatesHandler([...coordinates]);
        }
    }, [markers]);

    const allMarkers = React.useMemo(() => {
        return markers;
    }, [markers]);

    return (
        <Map
            ref={mapRef}
            initialRegion={initialRegion}
            flex={1}
            // provider={PROVIDER_GOOGLE}
            w={width}
            h={height}
            onPress={() => Keyboard.dismiss()}
        >
            <AllMarkers markers={allMarkers} />
        </Map>
    );
}

export default React.memo(React.forwardRef(MapBox));
