export interface ILinearProps {
    colors?: string[];
    start?: number[];
    end?: number[];
    height?: number | string;
    width?: number | string;
    style?: any;
    children?: any;
    h?: number | string;
    w?: number | string;
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch";
    justifyContent?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "stretch";
    borderRadius?: number;
    p?: number | string;
    pt?: number | string;
    pb?: number | string;
    pl?: number | string;
    pr?: number | string;
    m?: number | string;
    mt?: number | string;
    mb?: number | string;
    ml?: number | string;
    mr?: number | string;
    borderWidth?: number;
    borderColor?: string;
    borderStyle?: "solid" | "dotted" | "dashed";
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
    flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
}

export interface IUser {
    f_name: string | null;
    l_name: string | null;
    location_id: string | null;
    dialing_code: string | null;
    phone: string | null;
    email: string | null;
    wallet: number | null;
    card_status: "0" | "1" | null;
    photo: string | null;
    resident_status: "0" | "1" | "2" | null;
    userdocuments_status: "0" | "1" | null;
}
