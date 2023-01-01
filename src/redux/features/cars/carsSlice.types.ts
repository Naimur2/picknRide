export interface ICarDetails {
    id: number;
    connected: number;
    name: string;
    carNumber: string;
    imei: string;
    ioTSimNumber: string;
    ioTBattery: string;
    speedLimit: number;
    fuel: number;
    totalKm: number;
    latitude: number;
    longitude: number;
    status: number;
    price: number;
    inTrip: number;
    distanceInMeter: number;
}

export interface ICarState {
    nearestCars: ICarDetails[];
}
