// api
import baseURL from "./api";

// types
import { EventType } from "../types/EventType";
import { TicketType } from "../types/TicketType";


export default async function postTickets(userID: string, event: EventType, qty: number) {
    const okReponsses: boolean[] = []
    const ticket: TicketType = {
        event_id: event.id,
        owner_id: userID,
        price: event.price
    }
    for (let i = 0; i < qty; i++) {
        try {
            const response = await baseURL.post(`/tickets`, ticket)
            if (response.status === 201)
                okReponsses.push(true)
            else 
                okReponsses.push(false)
        } catch (err) {
            console.error(err)
            okReponsses.push(false)
        }
    }
    return okReponsses
}