'use client'

import { MonthView } from 'react-calendar'
// import 'react-calendar/dist/Calendar.css'
import './react-calendar-zendesk-garden.css'
import { useState } from 'react'

const year = new Date().getFullYear()
const months = Array.from({ length: 12 }, (_, i) => new Date(year, i))
const tileClassName = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
        // Monday = 1, Thursday = 4
        if (date.getDay() === 1 || date.getDay() === 4) {
            return 'puasa-senin-kamis'
        }
    }
}

const FullCalendar = () => {
    const [currentYear, _setCurrentYear] = useState(year)
    return (
        <div className="bg-kale-100">
            <div className='flex justify-center mb-5'>
                <h1 className="px-2 py-1 font-semibold round">Jadwal Puasa {currentYear}</h1>
            </div>
            {/* Legend */}
            <div className="flex justify-center mb-4">
                <div className="flex items-center mr-4">
                    <span className="inline-block w-4 h-4 bg-kale-800 mr-2"></span> Puasa Senin & Kamis
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
