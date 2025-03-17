// api
import baseURL from "./api";

// util
import { comparePassword } from "../utils/Passwords";


export default async function loginUser(email: string, password: string) {
  // get user by email
  try {
    const res = await baseURL.get(`/users?email=` + email)
    const hash = res.data.password
    // compare passwords
    const match: boolean = await comparePassword(hash, password)
    const { id } = res.data
    if (!match) return {error: "incorrect password"}
    return {id, email}
  } catch (error: any) {
    if (error.response.statusText === "Not Found")
      return {error: "email address not found"}
    return {error}
  }
}