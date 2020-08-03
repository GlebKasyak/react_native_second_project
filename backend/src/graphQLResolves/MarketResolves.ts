import { Request } from "express";
import { readFileSync }  from "fs";
import { resolve } from "path";

import { MarketType, GeoLocation } from "../interfaces/market.interface";
import { addDistanceToMarkets } from "../shared/helpers";
import { ErrorHandler } from "../shared/error";

type InputType = {
    inputMarkets: {
        page: number,
        limit: number,
        value: string,
        latitude: number
        longitude: number,
        sortByDistance: boolean
    }
};

const getMarkets = ({ latitude, longitude }: GeoLocation) => {
    let markets: Array<MarketType> = JSON.parse(readFileSync(resolve(__dirname, "../markets.json"), "utf8"));

    if(latitude && longitude) {
        markets = addDistanceToMarkets(markets, { latitude, longitude });
    };

    return markets;
}

export default {
    getMarkets: async ({ inputMarkets }: InputType, req: Request) => {
        try {
            if(!req.isAuth) {
                throw new Error("Unauthenticated!");
            };

            const { page, limit, value, latitude, longitude, sortByDistance } = inputMarkets;

            const matchFilter = value && value !== "undefined"
                    ? new RegExp(value, "i")
                    : null;

            let markets = getMarkets({ latitude, longitude });

            const marketList = sortByDistance
                ? markets.sort((a, b) => a.distance - b.distance)
                : markets;

            const filteredData = matchFilter
                ? marketList.filter(({ title }) => matchFilter.test(title))
                : marketList;

            return filteredData.slice((page - 1) * limit, limit * page);
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    },
    getAllMarkets: async ({ latitude, longitude }: GeoLocation, req: Request) => {
        if(!req.isAuth) {
            throw new Error("Unauthenticated");
        };

        return getMarkets({ latitude, longitude });
    }
};