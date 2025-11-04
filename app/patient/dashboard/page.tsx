'use client';

import { useState } from 'react';
import PatientLayout from '../components/PatientLayout';
import { 
  CalendarIcon, 
  VideoCameraIcon, 
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ClockIcon,
  UserIcon,
  BellIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function PatientDashboard() {
  const [notifications] = useState([
    { id: 1, message: 'Appointment with Dr. Smith tomorrow at 2:00 PM', time: '2 hours ago', type: 'appointment' },
    { id: 2, message: 'Prescription refill reminder for Lisinopril', time: '4 hours ago', type: 'medication' },
    { id: 3, message: 'Lab results are now available', time: '1 day ago', type: 'results' }
  ]);

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiologist',
      date: '2024-01-15',
      time: '2:00 PM',
      type: 'Video Consultation',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Johnson',
      specialty: 'General Practitioner',
      date: '2024-01-18',
      time: '10:30 AM',
      type: 'In-Person',
      status: 'pending'
    }
  ];

  const quickActions = [
    {
      icon: CalendarIcon,
      title: 'Book Appointment',
      description: 'Schedule with available doctors',
      color: 'bg-blue-500',
      href: '/patient/appointments/book'
    },
    {
      icon: VideoCameraIcon,
      title: 'Start Video Call',
      description: 'Join scheduled consultation',
      color: 'bg-green-500',
      href: '/patient/consultation'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Message Doctor',
      description: 'Secure messaging',
      color: 'bg-purple-500',
      href: '/patient/messages'
    },
    {
      icon: HeartIcon,
      title: 'Health Records',
      description: 'View medical history',
      color: 'bg-red-500',
      href: '/patient/records'
    }
  ];

  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', status: 'normal', color: 'text-green-600' },
    { label: 'Heart Rate', value: '72 bpm', status: 'normal', color: 'text-green-600' },
    { label: 'Weight', value: '165 lbs', status: 'stable', color: 'text-blue-600' },
    { label: 'Last Checkup', value: '2 weeks ago', status: 'recent', color: 'text-gray-600' }
  ];

  return (
    <PatientLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-blue-100 mb-6">Here is your health overview for today</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="w-8 h-8 text-blue-200" />
                <div>
                  <p className="text-sm text-blue-200">Next Appointment</p>
                  <p className="font-semibold">Tomorrow, 2:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <BellIcon className="w-8 h-8 text-purple-200" />
                <div>
                  <p className="text-sm text-purple-200">Notifications</p>
                  <p className="font-semibold">{notifications.length} New</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <HeartIcon className="w-8 h-8 text-red-200" />
                <div>
                  <p className="text-sm text-red-200">Health Score</p>
                  <p className="font-semibold">Excellent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <div key={index} className="card hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </div>
              
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <UserIcon className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                          <p className="text-gray-600 text-sm">{appointment.specialty}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{appointment.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Health Metrics & Notifications */}
          <div className="space-y-6">
            {/* Health Metrics */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Health Metrics</h2>
              <div className="space-y-4">
                {healthMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{metric.label}</span>
                    <span className={`font-semibold ${metric.color}`}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Notifications</h2>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}