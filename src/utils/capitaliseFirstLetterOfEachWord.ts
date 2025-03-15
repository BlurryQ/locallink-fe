export default function capitalizeFirstLetterOfEachWord(input: string): string {
    return input
      .trim()
      // replace multiple spaces with a single space
      .replace(/\s+/g, ' ') 
      .split(' ')
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }