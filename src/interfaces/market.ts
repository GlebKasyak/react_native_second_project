
export type MarketType = {
    id: string,
    city: string,
    title: string,
    type: "food/non-food" | "food" | "sport",
    distance: number,
    description: string,
    image: string,
    lat: number,
    lon: number
}
