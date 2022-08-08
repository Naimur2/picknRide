// Language: typescript

// Path: src\components\CountryPicker\CountryPicker.d.ts

interface ICountry {
    flag: String;
    code: String;
    country: String;
    dialCode: String;
}

interface IContries {
    [key: string]: ICountry;
}

export declare const countries: IContries[];

export declare function getAllCountries(): IContries[];
export declare function getCountryByCode(): ICountry;
export declare function searchCountry(): IContries[];
export declare function getLength(): number;
export declare function getCountriesInRange(
    start: number,
    end: number
): IContries[];
