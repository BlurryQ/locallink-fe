import { LocationType } from "./LocationType"

export type EventType = {
    id: string,
    name: string,
    created_at: Date,
    start: Date,
    end: Date,
    location: LocationType
    organiser: string,
    capacity: number,
    details: string,
    status: string,
    price: number,
    category: string,
    image_url: string,
    ticket_qty?: number
}