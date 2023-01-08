import { useNavigation } from "@react-navigation/native";
import { useGetNearestCarsApiQuery } from "@store/api/v2/carApi/carApiSlice";
import * as React from "react";
import { useDispatch } from "react-redux";
import ActualMap from "./ActualMap";
import { ILatLng } from "./MapScreen.types";
import AskBackgroundPermission from "./components/AskBackGroundPermission/AskBackgroundPermission";

function MapScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { data } = useGetNearestCarsApiQuery(
        {
            pageSize: 10,
            pageNumber: 1,
            latitude: 25.286106,
            longitude: 51.534817,
        },
        {}
    );

    console.log("data", data);

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
        <>
            <ActualMap
                type={selectedType}
                setType={setSelectedType}
                initialRegion={region}
                setDestination={handleAddDestination}
                destinationLocation={destinationLocation}
            />
            <AskBackgroundPermission />
        </>
    );
}

export default React.memo(MapScreen);
