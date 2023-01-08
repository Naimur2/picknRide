import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import ActualMap from "./ActualMap";
import { ILatLng } from "./MapScreen.types";

function MapScreen() {
    const navigation = useNavigation();

    const [selectedType, setSelectedType] = React.useState<ICAR>("cycle");

    const [destinationLocation, setDestinationLocation] = React.useState({
        latitude: 0,
        longitude: 0,
    });

    const handleAddDestination = (location: ILatLng) => {
        setDestinationLocation((prev) => ({
            ...prev,
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.01,
        }));
    };

    const region = {
        latitude: 25.286106,
        longitude: 51.534817,
        latitudeDelta: 0.009,
        longitudeDelta: 0.01,
    };

    return (
        <ActualMap
            type={selectedType}
            setType={setSelectedType}
            initialRegion={region}
            setDestination={handleAddDestination}
            destinationLocation={destinationLocation}
        />
    );
}

export default React.memo(MapScreen);
