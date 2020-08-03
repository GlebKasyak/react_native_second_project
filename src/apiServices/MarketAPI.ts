import axios from "axios";

import { GeolocationType } from "../interfaces/user";

type GetMarketsData = {
    page: number,
    limit: number,
    value?: string,
    geolocation: GeolocationType,
    sortByDistance: boolean
}

class MarketAPI {
    static getMarkets = async ({ page, limit, value, geolocation, sortByDistance }: GetMarketsData) => {
        const requestData = {
            query: `
                mutation {
                    getMarkets(inputMarkets: {
                        page: ${ page }
                        limit: ${ limit }
                        value: "${ value }"
                        latitude: ${ geolocation?.latitude }
                        longitude: ${ geolocation?.longitude }
                        sortByDistance: ${ sortByDistance }
                    }) {
                        id
                        city
                        title
                        type
                        openingTime
                        closingTime
                        distance
                        description
                        image
                        lat
                        lon
                    }
                }
            `
        };

        return axios.post("/graphql", JSON.stringify(requestData));
    };

    static getAllMarkets = async ({ latitude, longitude }: GeolocationType) => {
        const requestData = {
            query: `
                query {
                    getAllMarkets(latitude: ${ latitude }, longitude: ${ longitude }) {
                        id
                        city
                        title
                        type
                        openingTime
                        closingTime
                        distance
                        description
                        image
                        lat
                        lon
                    }
                }
            `
        };

        return axios.post("/graphql", JSON.stringify(requestData));
    };
};

export default MarketAPI;