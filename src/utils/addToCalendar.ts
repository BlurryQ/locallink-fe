// api
import { sendToCalendar } from "../apis/third-party/google.api";

// types
import { GoogleTokenType } from "../types/GoogleTokenType";
import { TicketType } from "../types/TicketType";

// utils
import capitalizeFirstLetterOfEachWord from "./capitaliseFirstLetterOfEachWord";


export default async function addToCalendar(jsonToken: string, ticket: TicketType) {
    const error: {status: number} = {status: 404}
    let token: GoogleTokenType = JSON.parse(jsonToken);
    if (!token.expiry_date) return error

    const timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const event = {
        summary: capitalizeFirstLetterOfEachWord(ticket.name || 'Local Link Event'),
        start: {
            dateTime: ticket.start,
            timeZone,
        },
        end: {
            dateTime: ticket.end,
            timeZone,
        },
    };

    const res = await sendToCalendar(token, event);
    return res
}