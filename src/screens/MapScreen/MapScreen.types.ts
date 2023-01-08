export interface ILatLng {
    latitude: number;
    longitude: number;
}

export interface IVeichle {
    _id: string;
    coordinates: ILatLng;
    fuel: number;
    type: "scooter" | "park" | "cycle" | "car";
}

export type ICAR = "scooter" | "park" | "cycle" | "car";
