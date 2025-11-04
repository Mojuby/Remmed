'use client';

import { useState } from 'react';
import DoctorLayout from '../components/DoctorLayout';
import { 
  CalendarIcon, 
  UserGroupIcon, 
  VideoCameraIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { useUser } from '../../contexts/UserContext';

export default function DoctorDashboard() {
  const { user } = useUser();
  const firstName = user?.firstName || 'Doctor';

  const [todayStats] = useState({
    appointments: 8,
    completed: 5,
    pending: 3,
    totalPatients: 127,
    newMessages: 12,
    prescriptions: 6
  });

  const [upcomingAppointments] = useState([
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '10:00 AM',
      type: 'Video Consultation',
      condition: 'Follow-up',
      status: 'confirmed'
    },
    {
      id: 2,
      patient: 'Michael Brown',
      time: '11:30 AM',
      type: 'In-Person',
      condition: 'Routine Checkup',
      status: 'confirmed'
    },
    {
      id: 3,
      patient: 'Emily Davis',
      time: '2:00 PM',
      type: 'Video Consultation',
      condition: 'Consultation',
      status: 'pending'
    },
    {
      id: 4,
      patient: 'James Wilson',
      time: '3:30 PM',
      type: 'In-Person',
      condition: 'Lab Results Review',
      status: 'confirmed'
    }
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'appointment',
      message: 'Completed consultation with Sarah Johnson',
      time: '30 minutes ago'
    },
    {
      id: 2,
      type: 'prescription',
      message: 'Prescribed medication for Michael Brown',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'message',
      message: 'New message from Emily Davis',
      time: '2 hours ago'
    },
    {
      id: 4,
      type: 'appointment',
      message: 'Appointment scheduled with James Wilson',
      time: '3 hours ago'
    }
  ]);

  const quickActions = [
    {
      icon: CalendarIcon,
      title: 'View Schedule',
      description: 'Manage appointments',
      color: 'bg-blue-500',
      href: '/doctor/schedule'
    },
    {
      icon: VideoCameraIcon,
      title: 'Start Consultation',
      description: 'Begin video call',
      color: 'bg-green-500',
      href: '/doctor/consultation'
    },
    {
      icon: UserGroupIcon,
      title: 'Patient Records',
      description: 'Access medical files',
      color: 'bg-purple-500',
      href: '/doctor/patients'
    },
    {
      icon: DocumentTextIcon,
      title: 'Write Prescription',
      description: 'Create new prescription',
      color: 'bg-orange-500',
      href: '/doctor/prescriptions'
    }
  ];

  return (
    <DoctorLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Dr. {firstName}!</h1>
          <p className="text-teal-100 mb-6">Here is your practice overview for today</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="w-8 h-8 text-teal-200" />
                <div>
                  <p className="text-sm text-teal-200">Appointments for Today</p>
                  <p className="font-semibold text-2xl">{todayStats.appointments}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <UserGroupIcon className="w-8 h-8 text-blue-200" />
                <div>
                  <p className="text-sm text-blue-200">Total Patients</p>
                  <p className="font-semibold text-2xl">{todayStats.totalPatients}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-green-200" />
                <div>
                  <p className="text-sm text-green-200">New Messages</p>
                  <p className="font-semibold text-2xl">{todayStats.newMessages}</p>
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
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{action.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{action.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Completed Today</p>
                <p className="text-3xl font-bold text-green-600">{todayStats.completed}</p>
              </div>
              <CheckCircleIcon className="w-12 h-12 text-green-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Pending</p>
                <p className="text-3xl font-bold text-orange-600">{todayStats.pending}</p>
              </div>
              <ClockIcon className="w-12 h-12 text-orange-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Prescriptions</p>
                <p className="text-3xl font-bold text-blue-600">{todayStats.prescriptions}</p>
              </div>
              <DocumentTextIcon className="w-12 h-12 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Schedule for Today</h2>
              <button className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium">View All</button>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{appointment.patient}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <span>•</span>
                        <span>{appointment.type}</span>
                        <span>•</span>
                        <span>{appointment.condition}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Activities</h2>
              <button className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium">View All</button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'appointment' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.type === 'prescription' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    {activity.type === 'appointment' && <CalendarIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    {activity.type === 'prescription' && <DocumentTextIcon className="w-4 h-4 text-green-600 dark:text-green-400" />}
                    {activity.type === 'message' && <ChatBubbleLeftRightIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-gray-100">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}