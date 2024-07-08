// hijri-date.d.ts
declare module 'hijri-date/lib/safe' {
    export default class HijriDate {
      constructor();
      constructor(date: Date | number | string);
      constructor(year: number, month: number, date: number);
  
      getDate(): number;
      getMonth(): number;
      getFullYear(): number;
      getMonthName(): string;
      toString(): string;
      // Add more methods as needed based on your usage
    }
  
    export function toHijri(date: Date | number | string): HijriDate;
  }