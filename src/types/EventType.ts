export type EventType = {
    id: string,
    name: string,
    created_at: Date,
    start: Date,
    end: Date,
    location: {
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
    organiser: string,
    capacity: number,
    details: string,
    status: string,
    price: number,
    category: string,
    image_url: string,
}