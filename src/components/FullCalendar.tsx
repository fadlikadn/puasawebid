'use client'

import { MonthView } from 'react-calendar'

// import 'react-calendar/dist/Calendar.css'
import './react-calendar-zendesk-garden.css'
import { useState } from 'react'
import { Body, Close, Footer, FooterItem, Modal } from '@zendeskgarden/react-modals'
import { Button } from '@zendeskgarden/react-buttons'
import { getPuasaInfo, hijriDateToString, tileClassName } from '@/utils/generic'

const FullCalendar = () => {
    const year = new Date().getFullYear()
    const months = Array.from({ length: 12 }, (_, i) => new Date(year, i))

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
