import { exchangeCodeForToken } from "../api/googleAPI";

export default async function postEventToCalendar(code: string) {
  try {
    await exchangeCodeForToken(code);
  } catch (err) {
    console.log(err);
  }
  };
