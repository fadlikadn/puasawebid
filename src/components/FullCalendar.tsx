'use client'

import { MonthView } from 'react-calendar'
import { toHijri } from 'hijri-date/lib/safe'
// import 'react-calendar/dist/Calendar.css'
import './react-calendar-zendesk-garden.css'
import { useState } from 'react'
import { toZonedTime } from 'date-fns-tz'
import { addHours } from 'date-fns'

const year = new Date().getFullYear()
const months = Array.from({ length: 12 }, (_, i) => new Date(year, i))
const tileClassName = ({ date, view }: { date: Date, view: string }) => {
    const timezone = 'Asia/Jakarta'
    const zonedDate = toZonedTime(date, timezone)

    if (view === 'month') {
        const adjustLocalBeforeHijriDate = addHours(zonedDate, -12)
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

// TODO: handle onClick on each tile and show popup inform detail of the day (Gregorian & Hijri date, fasting type, etc)

const FullCalendar = () => {
    const [currentYear, _setCurrentYear] = useState(year)
    return (
        <div className="bg-kale-100">
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
                        />
                        {/* <Calendar
                            value={month}
                            tileClassName={tileClassName}
                            showNavigation={false}
                            locale='id-ID'
                        /> */}
                    </div>
                ))}
            </div>
            {/* Open Source License*/}
            <div className="text-center py-4">
                <p>© {currentYear} Puasa.web.id. This project is open source and available under the MIT License.</p>
            </div>
        </div>
    )
}

export default FullCalendar
