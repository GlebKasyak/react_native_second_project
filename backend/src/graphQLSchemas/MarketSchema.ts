export const MarketTypes = `
    type Market {
        id: String!
        city: String!
        title: String!
        type: String!
        openingTime: String!
        closingTime: String!
        distance: Int!
        description: String!
        image: String!
        lat: Float!
        lon: Float!
    }
    
    input InputMarkets {
        page: Int!
        limit: Int!
        value: String
        latitude: Float!
        longitude: Float!
        sortByDistance: Boolean!
    }
`;

export const MarketQueries = `
    getAllMarkets(latitude: Float!, longitude: Float!): [Market]!
`;

export const MarketMutations = `
    getMarkets(inputMarkets: InputMarkets): [Market]!
`;