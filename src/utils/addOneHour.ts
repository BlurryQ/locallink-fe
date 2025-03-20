export default function addOneHour (currentDate: Date): Date {
    const oneHour: number = 60 * 60 * 1000;
    return new Date(currentDate.getTime() + oneHour);
  };