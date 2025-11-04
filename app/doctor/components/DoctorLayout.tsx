'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import Logo from '../../components/Logo';
import ThemeToggle from '../../components/ThemeToggle';
import { useUser } from '../../contexts/UserContext';

interface DoctorLayoutProps {
  children: React.ReactNode;
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();
  const { user, logout } = useUser();

  const navigation = [
    { name: 'Dashboard', href: '/doctor/dashboard', icon: HomeIcon, current: true },
    { name: 'Schedule', href: '/doctor/schedule', icon: CalendarIcon, current: false },
    { name: 'Patients', href: '/doctor/patients', icon: UserGroupIcon, current: false },
    { name: 'Consultations', href: '/doctor/consultation', icon: VideoCameraIcon, current: false },
    { name: 'Messages', href: '/doctor/messages', icon: ChatBubbleLeftRightIcon, current: false },
    { name: 'Medical Records', href: '/doctor/records', icon: DocumentTextIcon, current: false },
    { name: 'Prescriptions', href: '/doctor/prescriptions', icon: ClipboardDocumentListIcon, current: false },
    { name: 'Analytics', href: '/doctor/analytics', icon: ChartBarIcon, current: false },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const firstName = user?.firstName || 'Doctor';
  const userInitial = firstName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 bg-gray-600/75 dark:bg-gray-900/75 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className={`fixed inset-y-0 left-0 flex w-full max-w-xs flex-col glass shadow-2xl transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Logo className="text-teal-600 dark:text-teal-400" size="sm" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">RemMed</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  item.current
                    ? 'bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/50 dark:to-blue-900/50 text-teal-700 dark:text-teal-300 border-r-2 border-teal-700 dark:border-teal-400'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </a>
            ))}
          </nav>
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/50 dark:to-blue-900/50 rounded-full flex items-center justify-center">
                {user?.profilePhoto ? (
                  <Image 
                    src={user.profilePhoto} 
                    alt="Profile" 
                    width={40}
                    height={40}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">{userInitial}</span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Dr. {firstName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Specialist</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="group flex w-full items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col sidebar-transition ${
        sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <div className="flex flex-col flex-grow glass border-r border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <div className="flex items-center h-16 px-4 border-b border-gray-200/50 dark:border-gray-700/50">
            {!sidebarCollapsed ? (
              <div className="flex items-center space-x-3">
                <Logo className="text-teal-600 dark:text-teal-400" size="sm" />
                <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">RemMed</span>
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <Logo className="text-teal-600 dark:text-teal-400" size="sm" />
              </div>
            )}
          </div>
          
          <div className="px-4 py-2 border-b border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 interactive-hover"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronLeftIcon className={`w-5 h-5 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2 custom-scrollbar overflow-y-auto">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  item.current
                    ? 'bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/50 dark:to-blue-900/50 text-teal-700 dark:text-teal-300 border-r-2 border-teal-700 dark:border-teal-400'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={sidebarCollapsed ? item.name : ''}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </a>
            ))}
          </nav>
          
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-4">
            {!sidebarCollapsed ? (
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/50 dark:to-blue-900/50 rounded-full flex items-center justify-center">
                  {user?.profilePhoto ? (
                    <Image 
                      src={user.profilePhoto} 
                      alt="Profile" 
                      width={40}
                      height={40}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-teal-600 dark:text-teal-400 font-semibold">{userInitial}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Dr. {firstName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Specialist</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/50 dark:to-blue-900/50 rounded-full flex items-center justify-center">
                  {user?.profilePhoto ? (
                    <Image 
                      src={user.profilePhoto} 
                      alt="Profile" 
                      width={40}
                      height={40}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-teal-600 dark:text-teal-400 font-semibold">{userInitial}</span>
                  )}
                </div>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className={`group flex w-full items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
              title={sidebarCollapsed ? 'Sign Out' : ''}
            >
              <ArrowRightOnRectangleIcon className={`h-5 w-5 flex-shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
              {!sidebarCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`sidebar-transition ${
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        {/* Top bar */}
        <div className="glass sticky top-0 z-40 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span>Online</span>
              </div>
              
              <ThemeToggle />
              
              <button className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors interactive-hover">
                <BellIcon className="w-6 h-6" />
                <span className="notification-badge">5</span>
              </button>
              
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors interactive-hover">
                <Cog6ToothIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}