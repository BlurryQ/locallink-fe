import { format } from 'date-fns';

export default function formatEventTime(date: Date): string {
    const time: Date = new Date(date);
    const localTime: Date = new Date(
      time.getTime() + time.getTimezoneOffset() * 60 * 1000
    );
    return format(localTime, 'kk:mm EEE MMM do yyyy');
  };