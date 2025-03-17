// api
import baseURL from "./api";

// types
import { UserType } from "../types/UserType";


export default async function postUser(user: UserType) {
  const response = await baseURL.post(`/users`, user)
  return response;
}