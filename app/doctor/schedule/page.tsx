'use client';

import { useState } from 'react';
import DoctorLayout from '../components/DoctorLayout';
import { 
  CalendarIcon, 
  ClockIcon,
  VideoCameraIcon,
  UserIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function DoctorSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '09:00',
      duration: 30,
      type: 'Video Consultation',
      condition: 'Follow-up',
      status: 'confirmed'
    },
    {
      id: 2,
      patient: 'Michael Brown',
      time: '10:30',
      duration: 45,
      type: 'In-Person',
      condition: 'Routine Checkup',
      status: 'confirmed'
    },
    {
      id: 3,
      patient: 'Emily Davis',
      time: '14:00',
      duration: 30,
      type: 'Video Consultation',
      condition: 'Consultation',
      status: 'pending'
    },
    {
      id: 4,
      patient: 'James Wilson',
      time: '15:30',
      duration: 30,
      type: 'In-Person',
      condition: 'Lab Results Review',
      status: 'confirmed'
    }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <DoctorLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Schedule</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your appointments and availability</p>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <PlusIcon className="w-5 h-5" />
            <span>Add Appointment</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex space-x-1">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day && setSelectedDate(day)}
                    className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
                      !day 
                        ? 'invisible' 
                        : isToday(day)
                        ? 'bg-teal-600 text-white font-semibold'
                        : isSameDay(day, selectedDate)
                        ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-medium'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {day?.getDate()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Schedule View */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {formatDate(selectedDate)}
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>{appointments.length} appointments</span>
                </div>
              </div>

              <div className="space-y-2">
                {timeSlots.map((time) => {
                  const appointment = appointments.find(apt => apt.time === time);
                  
                  return (
                    <div key={time} className="flex items-center space-x-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <div className="w-16 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {time}
                      </div>
                      
                      {appointment ? (
                        <div className="flex-1 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-700 rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center">
                                <UserIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">{appointment.patient}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.condition}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{appointment.duration} min</span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{appointment.type}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {appointment.type === 'Video Consultation' && (
                                <button className="p-1 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50 rounded">
                                  <VideoCameraIcon className="w-4 h-4" />
                                </button>
                              )}
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                appointment.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                              }`}>
                                {appointment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 text-gray-400 dark:text-gray-500 text-sm">
                          Available
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}