import MapLoc from "../MapLoc/MapLoc";
import { IVeichle } from "../../MapScreen.types";

const AllMarkers = ({ markers }: { markers: IVeichle[] | null }) => {
    if (!markers) return null;

    return (
        <>
            {markers?.map((car, index) => (
                <MapLoc key={car?.id + index.toString()} car={car} />
            ))}
        </>
    );
};

export default AllMarkers;