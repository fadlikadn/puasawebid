import { toHijri } from 'hijri-date/lib/safe'
import { toZonedTime } from 'date-fns-tz'
import { addHours } from 'date-fns'

export const tileClassName = ({ date, view }: { date: Date, view: string }) => {
    const timezone = 'Asia/Jakarta'
    const zonedDate = toZonedTime(date, timezone)

    if (view === 'month') {
        // const adjustLocalBeforeHijriDate = addHours(zonedDate, -12)
        const adjustLocalBeforeHijriDate = addHours(zonedDate, 0)
        const hijriDate = toHijri(adjustLocalBeforeHijriDate)

        /**
         * Hari Tasrik (10, 11, 12, 13 Dzulhijjah)
         * 10 Dzulhijjah: Hari Raya Idul Adha
         * 1 Syawal: Hari Raya Idul Fitri
         */
        if ((hijriDate.getMonth() === 12 && (hijriDate.getDate() >= 10 && hijriDate.getDate() <= 13)) || (hijriDate.getMonth() === 10 && hijriDate.getDate() === 1)) {
            return 'dilarang-puasa-tasyrik'
        }

        /**
         * Puasa Arafah (9 Dzulhijjah)
         */
        if (hijriDate.getMonth() === 12 && hijriDate.getDate() === 9) {
            return 'puasa-arafah'
        }

        /**
         * Puasa Ayaamul Bidh (13, 14, 15 every hijri month), except 13 Dzulhijjah (Tasyrik)
         */
        if (((hijriDate.getDate() === 13 && hijriDate.getMonth() !== 12) || hijriDate.getDate() === 14 || hijriDate.getDate() === 15) && hijriDate.getMonth() !== 9) {
            return 'puasa-ayaamul-bidh'
        }

        /**
         * Puasa Tasu'a & 'Asyura (9 & 10 Muharram)
         */
        if ((hijriDate.getDate() === 9 || hijriDate.getDate() === 10) && hijriDate.getMonth() === 1) {
            return 'puasa-tasua-asyura'
        }
        /**
         * Puasa Senin & Kamis (every Monday & Thursday), except 9 Dzulhijjah (Arafah) and 13, 14, 15 Dzulhijjah (Tasyrik)
         */
        if ((zonedDate.getDay() === 1 || zonedDate.getDay() === 4) && hijriDate.getMonth() !== 9){
            return 'puasa-senin-kamis'
        }

        /**
         * Puasa Syawal (6 days after Eid al-Fitr)
         */
        if (hijriDate.getMonth() === 10 && hijriDate.getDate() >= 2) {
            return 'puasa-syawal'
        }
        
        /**
         * Puasa Ramadhan (9th month)
         */
        if (hijriDate.getMonth() === 9) {
            return 'puasa-ramadhan'
        }
    }
}

export const getPuasaInfo = (date: Date): string => {
    const timezone = 'Asia/Jakarta';
    const zonedDate = toZonedTime(date, timezone);
    const adjustLocalBeforeHijriDate = addHours(zonedDate, 0); // Adjust if necessary
    const hijriDate = toHijri(adjustLocalBeforeHijriDate);

    // Hari Tasrik (10, 11, 12, 13 Dzulhijjah)
    if (hijriDate.getMonth() === 12 && (hijriDate.getDate() >= 10 && hijriDate.getDate() <= 13)) {
        return 'Hari Tasrik - Dilarang Puasa';
    }

    // Hari Raya Idul Adha
    if (hijriDate.getMonth() === 12 && hijriDate.getDate() === 10) {
        return 'Hari Raya Idul Adha - Dilarang Puasa';
    }

    // Hari Raya Idul Fitri
    if (hijriDate.getMonth() === 10 && hijriDate.getDate() === 1) {
        return 'Hari Raya Idul Fitri - Dilarang Puasa';
    }

    // Puasa Arafah (9 Dzulhijjah)
    if (hijriDate.getMonth() === 12 && hijriDate.getDate() === 9) {
        return 'Puasa Arafah';
    }

    // Puasa Ayaamul Bidh (13, 14, 15 every hijri month), except 13 Dzulhijjah (Tasyrik)
    if (((hijriDate.getDate() === 13 && hijriDate.getMonth() !== 12) || hijriDate.getDate() === 14 || hijriDate.getDate() === 15) && hijriDate.getMonth() !== 9) {
        return 'Puasa Ayaamul Bidh';
    }

    // Puasa Tasu'a & 'Asyura (9 & 10 Muharram)
    if ((hijriDate.getDate() === 9 || hijriDate.getDate() === 10) && hijriDate.getMonth() === 1) {
        return 'Puasa Tasu\'a & \'Asyura';
    }

    // Puasa Senin & Kamis
    if ((zonedDate.getDay() === 1 || zonedDate.getDay() === 4) && hijriDate.getMonth() !== 9) {
        return 'Puasa Senin & Kamis';
    }

    // Puasa Syawal (6 days after Eid al-Fitr)
    if (hijriDate.getMonth() === 10 && hijriDate.getDate() >= 2) {
        return 'Puasa Syawal';
    }

    // Puasa Ramadhan (9th month)
    if (hijriDate.getMonth() === 9) {
        return 'Puasa Ramadhan';
    }

    return 'No specific puasa information for this day';
}

export const hijriDateToString = (date: Date): string => {
    // Array of Hijri month names in Bahasa
    const hijriMonths = [
      'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
      'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
      'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah'
    ]
  
    // Convert the given date to Hijri
    const hijriDate = toHijri(date)
  
    // Extract the day, month, and year from the Hijri date
    const day = hijriDate.getDate()
    const month = hijriMonths[hijriDate.getMonth() - 1] // Adjust for zero-based index
    const year = hijriDate.getFullYear()
  
    // Return the formatted date string in Bahasa
    return `${day} ${month} ${year} Hijriyah`
  }