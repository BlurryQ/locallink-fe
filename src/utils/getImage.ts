import placeholder from '../assets/logo.png';
import arts from '../assets/images/arts.jpg';
import community from '../assets/images/community.jpg';
import education from '../assets/images/education.jpg';
import family from '../assets/images/family.jpg';
import food from '../assets/images/food.jpg';
import markets from '../assets/images/markets.jpg';
import music from '../assets/images/music.jpg';
import seasonal from '../assets/images/seasonal.jpg';
import sports from '../assets/images/sports.jpg';
import tech from '../assets/images/tech.jpg';


export default function getImage(imageType: string) {
    const image: string = imageType.split(" ")[0]
    if (image === "default") return placeholder
    if (image === "arts") return arts
    if (image === "community") return community
    if (image === "education") return education
    if (image === "family") return family
    if (image === "food") return food
    if (image === "markets") return markets
    if (image === "music") return music
    if (image === "seasonal") return seasonal
    if (image === "sports") return sports
    if (image === "tech") return tech
}