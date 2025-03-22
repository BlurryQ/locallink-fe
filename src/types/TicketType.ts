import { LocationType } from "./LocationType"

export type TicketType = {
    event_id: string,
    owner_id: string,
    price: number,
    ticket_id?: string,
    name?: string,
    start?: Date,
    end?: Date,
    location?: LocationType
    status?: string,
    image?: string,
    total_tickets?: number
    category?: string
}