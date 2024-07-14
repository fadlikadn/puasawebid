'use client'

import { MonthView } from 'react-calendar'
import { toHijri } from 'hijri-date/lib/safe'
// import 'react-calendar/dist/Calendar.css'
import './react-calendar-zendesk-garden.css'
import { useState } from 'react'
import { toZonedTime } from 'date-fns-tz'
import { addHours } from 'date-fns'
import { Body, Close, Footer, FooterItem, Header, Modal } from '@zendeskgarden/react-modals'
import { Button } from '@zendeskgarden/react-buttons'

const year = new Date().getFullYear()
const months = Array.from({ length: 12 }, (_, i) => new Date(year, i))
const tileClassName = ({ date, view }: { date: Date, view: string }) => {
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

const getPuasaInfo = (date: Date): string => {
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

const hijriDateToString = (date: Date): string => {
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

const FullCalendar = () => {
    const [currentYear, _setCurrentYear] = useState<number>(year)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const onDayClick = (value: Date) => {
        setSelectedDate(value)
        setModalVisible(true)
    }

    return (
        <>
            <div className="max-w-screen-lg mx-auto px-4 py-2">
                <div className='flex justify-center mb-5'>
                    <h1 className="px-2 py-1 font-semibold round">Jadwal Puasa {currentYear}</h1>
                </div>
                {/* Legend */}
                <div className="flex flex-wrap justify-center mb-4">
                    <div className="flex items-center mr-4 mb-2">
                        <span className="inline-block w-4 h-4 bg-[#d653c2] mr-2"></span> Puasa Arafah
                    </div>
                    <div className="flex items-center mr-4 mb-2">
                        <span className="inline-block w-4 h-4 bg-kale-800 mr-2"></span> Puasa Sunnah Senin & Kamis
                    </div>
                    <div className="flex items-center mr-4 mb-2">
                        <span className="inline-block w-4 h-4 bg-blue-700 mr-2"></span> Puasa Ramadhan
                    </div>
                    <div className="flex items-center mr-4 mb-2">
                        <span className="inline-block w-4 h-4 bg-[#ffeedb] mr-2"></span> Puasa Sunnah Syawal
                    </div>
                    <div className="flex items-center mr-4 mb-2">
                        <span className="inline-block w-4 h-4 bg-[#6a27b8] mr-2"></span> Puasa Sunnah Ayaamul Bidh
                    </div>
                    <div className="flex items-center mr-4 mb-2">
                        <span className="inline-block w-4 h-4 bg-[#e35b66] mr-2"></span> Dilarang Berpuasa / Hari Tasyrik
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {months.map((month, index) => (
                        <div key={index} className=''>
                            <h2 className='text-center font-semibold my-2'>{typeof month === 'string' ? month : month.toLocaleString('id-ID', { month: 'long' })}</h2>
                            <MonthView 
                                activeStartDate={new Date(currentYear, index)} 
                                tileClassName={tileClassName} 
                                valueType={'month'} 
                                locale='id-ID'
                                onClick={onDayClick}
                            />
                        </div>
                    ))}
                </div>
                {/* Open Source License*/}
                <div className="text-center py-4">
                    <p>© {currentYear} Puasa.web.id. This project is open source and available under the MIT License.</p>
                </div>
            </div>
            {!!modalVisible && (
                <Modal aria-label="Informasi detail puasa hari yang diklik" onClose={() => setModalVisible(false)}>
                    {/* <Header tag="h2">
                        Informasi Tanggal
                    </Header> */}
                    <Body>
                        <div className="text-lg text-gray-800 dark:text-gray-200">
                            <div className="font-semibold">
                                {selectedDate?.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                {hijriDateToString(selectedDate as Date)}
                            </div>
                            <div className="mt-4 p-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg">
                                {getPuasaInfo(selectedDate as Date)}
                            </div>
                        </div>
                    </Body>
                    <Footer>
                        <FooterItem>
                            <Button isPrimary onClick={() => setModalVisible(false)}>OK</Button>
                        </FooterItem>
                    </Footer>
                    <Close aria-label="Close modal" />
                </Modal>
            )}
        </>
    )
}

export default FullCalendar
