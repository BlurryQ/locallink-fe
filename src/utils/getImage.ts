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
    if (imageType === "default") return placeholder
    if (imageType === "arts") return arts
    if (imageType === "community") return community
    if (imageType === "education") return education
    if (imageType === "family") return family
    if (imageType === "food") return food
    if (imageType === "markets") return markets
    if (imageType === "music") return music
    if (imageType === "seasonal") return seasonal
    if (imageType === "sports") return sports
    if (imageType === "tech") return tech
}