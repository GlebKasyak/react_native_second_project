
export type MarketType = {
    id: string,
    city: string,
    title: string,
    type: "food/non-food" | "food" | "sport",
    openingTime: string,
    closingTime: string,
    distance: number,
    description: string,
    image: string,
    lat: number,
    lon: number
};

export type GeoLocation = {
    latitude: number,
    longitude: number
};
