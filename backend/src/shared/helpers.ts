import { getDistance } from "geolib";

import { MarketType, GeoLocation } from "../interfaces/market.interface";

export const addDistanceToMarkets = (data: Array<MarketType>, location: GeoLocation) => (
    data.map(market => ({
        ...market,
        distance: getDistance(location, { lon: market.lon, lat: market.lat })
    }))
);