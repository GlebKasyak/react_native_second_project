
export type User = {
    _id?: string,
    firstName: string,
    secondName: string,
    email: string,
    password?: string,
};

export type GeolocationType = {
    latitude: number,
    longitude: number
};

export type LoginType = {
    email: string,
    password: string
};
