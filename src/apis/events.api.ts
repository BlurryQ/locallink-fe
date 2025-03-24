// api
import baseURL from "./baseURL";

// types
import { EventType } from "../types/EventType";

export async function getEvents() {
  const response = await baseURL.get(`/events`)
  return response.data;
}
export async function getEventByID(id: string) {
  const response = await baseURL.get(`/events/` + id)
  return response.data;
}

export async function getEventByOrganiser(id: string) {
  const response = await baseURL.get(`/events?organiser=` + id)
  return response.data;
}

export async function postEvent(event: EventType) {
  const response = await baseURL.post(`/events`, event)
  return response;
}

export async function patchEvent(id:string, event: EventType) {
  const response = await baseURL.patch(`/events/`+ id , event)
  return response;
}

export async function deleteEvent(id:string) {
  const response = await baseURL.delete(`/events/`+ id )
  return response;
}
