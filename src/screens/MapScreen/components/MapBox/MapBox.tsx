import { useNavigation } from "@react-navigation/native";
import {
    selectCurrentRegion,
    selectInitialLocation,
} from "@store/features/user-location/userLocationSlice";
import { Factory } from "native-base";
import React from "react";
import { Dimensions, Keyboard } from "react-native";
import MapView, { MarkerAnimated, Region } from "react-native-maps";
import { useSelector } from "react-redux";
import { ILatLng } from "../../MapScreen.types";
import AllMarkers from "../AllMarker/AllMarker";
import { RootState } from "@store/store";

export interface IMapScreenProps {
    children?: any;
}
const { height, width } = Dimensions.get("window");

function MapBox() {
    const Map = Factory(MapView);
    const mapRef = React.useRef<MapView>(null);
    const navigation = useNavigation();

    const initialRegion = useSelector(selectInitialLocation) as Region;

    const currentLocation = useSelector(selectCurrentRegion) as ILatLng;
    const locationSlice = useSelector((state) => state.userLocation);

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
    console.log(currentLocation);

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
            <AllMarkers />
            {currentLocation.latitude && currentLocation.longitude ? (
                <MarkerAnimated
                    coordinate={{
                        longitude: currentLocation.latitude,
                        latitude: currentLocation.longitude,
                    }}
                    tracksViewChanges={false}
                />
            ) : (
                <></>
            )}
        </Map>
    );
}

export default React.memo(React.forwardRef(MapBox));
