import axios from 'axios';

export default async function getLongAndLatFromPostcode(postcode: string) {
    const response = await axios.get("https://api.postcodes.io/postcodes/" + postcode)
    return response.data.result;
}