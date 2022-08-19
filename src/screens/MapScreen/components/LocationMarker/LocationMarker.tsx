import { Image, VStack } from "native-base";
import car from "../../../../../assets/images/car-small.png";
import cycle from "../../../../../assets/images/cycle-small.png";
import scooter from "../../../../../assets/images/veichle.png";
import MapMarker from "../../../../svgs/MapMarker";
import ParkMarker from "../../../../svgs/ParkMarker";

interface IMarker {
    fuelPercentage: number;
    type: "scooter" | "park" | "cycle" | "car";
}

const MarkerBar = ({ fuelPercentage, type }: IMarker) => {
    if (type === "park") {
        return <ParkMarker />;
    }

    const colors = ["#FF0000", "#FF7F00", "#fff000", "#2bb521"];

    const fuelColor = () => {
        if (fuelPercentage < 25) {
            return colors[0];
        } else if (fuelPercentage < 50) {
            return colors[1];
        } else if (fuelPercentage < 75) {
            return colors[2];
        }
        return colors[3];
    };

    if (type === "car") {
        return (
            <VStack position={"relative"}>
                <MapMarker
                    percentage={fuelPercentage || 100}
                    fill={fuelColor()}
                />
                <Image
                    tintColor={"#000"}
                    source={car}
                    alt="scooter"
                    position={"absolute"}
                    width={"14px"}
                    resizeMode={"contain"}
                    left={"27px"}
                    top={"-9px"}
                />
            </VStack>
        );
    }

    if (type === "cycle") {
        return (
            <VStack position={"relative"}>
                <MapMarker
                    percentage={fuelPercentage || 100}
                    fill={fuelColor()}
                />
                <Image
                    tintColor={"#000"}
                    source={cycle}
                    alt="scooter"
                    position={"absolute"}
                    width={"14px"}
                    resizeMode={"contain"}
                    left={"28px"}
                    bottom={"28px"}
                />
            </VStack>
        );
    }

    return (
        <VStack position={"relative"}>
            <MapMarker percentage={fuelPercentage || 100} fill={fuelColor()} />
            <Image
                tintColor={"#000"}
                source={scooter}
                alt="scooter"
                position={"absolute"}
                width={"14px"}
                resizeMode={"contain"}
                left={"26px"}
                top={"9px"}
            />
        </VStack>
    );
};

export default MarkerBar;
