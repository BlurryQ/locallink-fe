export type LocationType = {
    name: string,
    street: string,
    city: string,
    country: string,
    postcode: string,
    coords: {
        lat: number,
        long: number
    }
}