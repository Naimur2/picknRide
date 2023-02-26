export interface ITemperatur {
    condtion: string;
    currentDay: string;
    icon: string;
    temp: number;
}

export interface UIState {
    loading: boolean;
    startOrEndRide?: "start" | "end";
    temperatur?: ITemperatur;
}
