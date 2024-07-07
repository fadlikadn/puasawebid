'use client'

import Calendar from 'react-calendar'
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
    const [currentYear, setCurrentYear] = useState(year)
    return (
        <div>
            <div className='flex justify-center mb-5'>
                <h1 className="px-2 py-1 bg-yellow-200 round">Jadwal Puasa {currentYear}</h1>
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
                        <Calendar
                            value={month}
                            tileClassName={tileClassName}
                            showNavigation={false}
                            locale='id-ID'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FullCalendar
