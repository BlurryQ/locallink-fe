// api
import baseURL from "./api";

// type
import { GoogleTokenType } from "../types/GoogleTokenType";


export const redirectToGoogleAuthForCode = async () => {
  const response = await baseURL.get('/google/auth-url')
  const {authUrl} = response.data
  window.location.href = authUrl;
};

export const exchangeCodeForToken = async (code: string) => {
  const tokens = await baseURL.post('/google/tokens', { code });
  localStorage.setItem(
    'google_token',
    JSON.stringify(tokens.data.tokens)
  );
  return 
}
  
export const sendToCalendar = async (token: GoogleTokenType, event:any) => {
  const response = await baseURL.post('/google/event', {token, event})
  return response
}