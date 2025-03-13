import { UserType } from "../types/UserType";
import baseURL from "./api";

export default async function postUser(user: UserType) {
  const response = await baseURL.post(`/users`, user)
  return response;
}