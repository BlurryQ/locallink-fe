import { exchangeCodeForToken } from "../apis/third-party/google.api";

export default async function postEventToCalendar(code: string) {
  try {
    await exchangeCodeForToken(code);
  } catch (err) {
    console.log(err);
  }
  };
