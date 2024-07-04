'use client'

import dayjs from "dayjs"
import { Calendar, dayjsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import events from "./events"

const localizer = dayjsLocalizer(dayjs)

const BasicCalendar = () => {
    return (
        <>
            <Calendar
                localizer={localizer}
                startAccessor={"start"}
                endAccessor={"end"}
                // events={[]}
                events={events}
                style={{ height: 500 }}
                showMultiDayTimes
                views={['month', 'week', 'day']}
            />
        </>
    )
}

export default BasicCalendar
