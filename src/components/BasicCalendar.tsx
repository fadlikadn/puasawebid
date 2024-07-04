'use client'

import { Calendar, dateFnsLocalizer, Event, View, Views } from "react-big-calendar"
import React, { useCallback, useState } from "react"
import 'date-fns/locale/id'
import { id } from "date-fns/locale/id"
import { add, endOfDay, getDay, startOfDay, startOfWeek } from "date-fns"
import { format } from "date-fns/format"
import { parse } from "date-fns/parse"

import "react-big-calendar/lib/css/react-big-calendar.css"
import "./calendar-zendesk-garden.css"

const locales = {
    'id': id,
    // 'id': require('date-fns/locale/id'),
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})
const generatePuasaSunnahSeninKamis = (startDate: Date, endDate: Date, title: string) => {
    let events: Event[] = []
    let currentDate = startDate

    while (currentDate <= endDate) {
        const dayOfWeek = getDay(currentDate)
        if (dayOfWeek === 1 || dayOfWeek === 4) {
            events.push({
                title,
                allDay: true,
                start: startOfDay(currentDate),
                end: endOfDay(currentDate),
            })
        }
        currentDate = add(currentDate, { days: 1 })
    }
    return events
}

const BasicCalendar = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [view, setView] = useState<View>(Views.MONTH)
    const handleOnChangeView = (selectedView: View) => {
        setView(selectedView)
    }
    const [date, setDate] = useState(new Date())
    const onNavigate = useCallback(
        (newDate: Date) => {
            setCurrentYear(newDate.getFullYear())
            return setDate(newDate)
        },
        [setDate]
    )
    const events = generatePuasaSunnahSeninKamis(new Date(currentYear, 0, 1), new Date(currentYear, 11, 31), 'Puasa Sunnah Senin/Kamis')

    return (
        <>
            <Calendar
                date={date}
                onNavigate={onNavigate}
                view={view}
                defaultView={Views.MONTH}
                views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                showMultiDayTimes
                onView={handleOnChangeView}
                localizer={localizer}
                events={events}
                style={{ height: '95vh' }}
                culture={"id"}
            />
        </>
    )
}

export default BasicCalendar
