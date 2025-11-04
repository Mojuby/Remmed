'use client';

import { useState, useEffect } from 'react';
import { 
  CalendarIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
  BookOpenIcon,
  ChevronRightIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  HomeIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import SymptomChatbot from '../components/SymptomChatbot';
import { useUser } from '../contexts/UserContext';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const router = useRouter();
  const { user, logout } = useUser();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const sidebarNavigation = [
    { name: 'Home', href: '/home', icon: HomeIcon, current: true },
    { name: 'Specialist', href: '/specialist', icon: UserGroupIcon, current: false },
    { name: 'Pharmacy', href: '/pharmacy', icon: BuildingStorefrontIcon, current: false },
    { name: 'Profile', href: '/profile', icon: UserIcon, current: false },
  ];

  const specialists = [
    {
      id: 1,
      name: 'Gynaecologist',
      description: 'Specialized care for women\'s reproductive health, pregnancy, and gynecological conditions.',
      icon: '👩‍⚕️',
      color: 'bg-gradient-to-r from-rose-500 to-pink-500',
      available: 12,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Psychologist',
      description: 'Mental health support, therapy, and psychological counseling services.',
      icon: '🧠',
      color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      available: 8,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Pediatrician',
      description: 'Comprehensive medical care for infants, children, and adolescents.',
      icon: '👶',
      color: 'bg-gradient-to-r from-amber-500 to-orange-500',
      available: 15,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Cardiologist',
      description: 'Heart and cardiovascular system diagnosis, treatment, and prevention.',
      icon: '❤️',
      color: 'bg-gradient-to-r from-red-600 to-rose-600',
      available: 6,
      rating: 4.9
    },
    {
      id: 5,
      name: 'Dermatologist',
      description: 'Skin, hair, and nail conditions treatment and cosmetic procedures.',
      icon: '🧴',
      color: 'bg-gradient-to-r from-orange-500 to-yellow-500',
      available: 10,
      rating: 4.6
    },
    {
      id: 6,
      name: 'Dentist',
      description: 'Oral health, dental procedures, and preventive dental care.',
      icon: '🦷',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      available: 20,
      rating: 4.8
    }
  ];

  const medicalDictionary = [
    {
      id: 1,
      term: 'Hematology',
      description: 'The branch of medicine concerned with the study, diagnosis, treatment, and prevention of diseases related to blood and blood-forming organs.',
      icon: '🩸',
      color: 'bg-gradient-to-r from-red-500 to-red-600'
    },
    {
      id: 2,
      term: 'Asthma',
      description: 'A respiratory condition marked by attacks of spasm in the bronchi of the lungs, causing difficulty in breathing and wheezing.',
      icon: '🫁',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      id: 3,
      term: 'Neurology',
      description: 'A branch of medicine dealing with disorders of the nervous system, including the brain, spinal cord, and nerves.',
      icon: '🧠',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    },
    {
      id: 4,
      term: 'Gastroenterology',
      description: 'The branch of medicine focused on the digestive system and its disorders, including the stomach, intestines, and liver.',
      icon: '🫄',
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600'
    },
    {
      id: 5,
      term: 'Pulmonology',
      description: 'A medical specialty that deals with diseases involving the respiratory tract, including lungs and breathing passages.',
      icon: '🫁',
      color: 'bg-gradient-to-r from-cyan-500 to-cyan-600'
    },
    {
      id: 6,
      term: 'Endocrinology',
      description: 'A branch of biology and medicine dealing with the endocrine system, hormones, and related disorders.',
      icon: '⚗️',
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600'
    }
  ];

  const quickActions = [
    {
      icon: CalendarIcon,
      title: 'Book Appointment',
      description: 'Schedule with available specialists',
      color: 'bg-gradient-to-r from-blue-600 to-blue-700',
      href: '/appointments/book'
    },
    {
      icon: ComputerDesktopIcon,
      title: 'AI Health Assistant',
      description: 'Check symptoms with AI',
      color: 'bg-gradient-to-r from-purple-600 to-indigo-600',
      onClick: () => setShowChatbot(true)
    },
    {
      icon: VideoCameraIcon,
      title: 'Video Consultation',
      description: 'Start or join a video call',
      color: 'bg-gradient-to-r from-green-600 to-emerald-600',
      href: '/consultation'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Message Doctor',
      description: 'Secure messaging with providers',
      color: 'bg-gradient-to-r from-purple-600 to-indigo-600',
      href: '/messages'
    },
    {
      icon: DocumentTextIcon,
      title: 'Medical Records',
      description: 'View your health history',
      color: 'bg-gradient-to-r from-teal-600 to-cyan-600',
      href: '/records'
    }
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const firstName = user.firstName || 'User';
  const userInitial = firstName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 flex page-transition">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 bg-gray-600/75 dark:bg-gray-900/75 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className={`fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Logo className="text-blue-600 dark:text-blue-400" size="sm" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">RemMed</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {sidebarNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  item.current
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-400'
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
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                {user.profilePhoto ? (
                  <img 
                    src={user.profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold">{userInitial}</span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{firstName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Patient</p>
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
      <div className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 sidebar-transition ${
        sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <div className="flex flex-col flex-grow glass border-r border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <div className="flex items-center h-16 px-4 border-b border-gray-200/50 dark:border-gray-700/50">
            {!sidebarCollapsed ? (
              <div className="flex items-center space-x-3">
                <Logo className="text-blue-600 dark:text-blue-400" size="sm" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">RemMed</span>
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <Logo className="text-blue-600 dark:text-blue-400" size="sm" />
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
            {sidebarNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  item.current
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-400'
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
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  {user.profilePhoto ? (
                    <img 
                      src={user.profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold">{userInitial}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{firstName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Patient</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  {user.profilePhoto ? (
                    <img 
                      src={user.profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold">{userInitial}</span>
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
      } flex-1`}>
        {/* Header */}
        <header className="glass sticky top-0 z-40 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  <Bars3Icon className="w-6 h-6" />
                </button>
                
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search specialists, conditions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 focus:bg-white dark:focus:bg-gray-800"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <button className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors interactive-hover">
                  <BellIcon className="w-6 h-6" />
                  <span className="notification-badge">3</span>
                </button>
                
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors interactive-hover">
                  <Cog6ToothIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-2xl p-8 text-white mb-8 card-hover">
            <div className="flex items-center justify-between">
              <div className="slide-in-left">
                <h1 className="text-4xl font-bold mb-2">Welcome back, {firstName}!</h1>
                <p className="text-blue-100 text-lg mb-6">How are you feeling today? Let us take care of your health together.</p>
                
                <div className="flex items-center space-x-6 stagger-children">
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="w-8 h-8 text-blue-200" />
                      <div>
                        <p className="text-sm text-blue-200">Next Appointment</p>
                        <p className="font-semibold">No appointments scheduled</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <HeartIcon className="w-8 h-8 text-red-200" />
                      <div>
                        <p className="text-sm text-red-200">Health Status</p>
                        <p className="font-semibold">Excellent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block slide-in-right">
                <button 
                  onClick={() => setShowChatbot(true)}
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 interactive-hover flex items-center space-x-2"
                >
                  <ComputerDesktopIcon className="w-6 h-6" />
                  <span>Check Symptoms with AI</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 stagger-children">
            {quickActions.map((action, index) => (
              <div 
                key={index} 
                className="card card-hover cursor-pointer group"
                onClick={action.onClick || (() => action.href && router.push(action.href))}
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{action.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{action.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Browse Specialists */}
            <div className="card slide-in-left">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Browse Specialists</h2>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">View All</button>
              </div>

              <div className="space-y-4">
                {specialists.map((specialist) => (
                  <div key={specialist.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 card-hover">
                    <div className={`w-12 h-12 ${specialist.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xl">{specialist.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{specialist.name}</h3>
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{specialist.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{specialist.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{specialist.available} available</span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Dictionary */}
            <div className="card slide-in-right">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Medical Dictionary</h2>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">View All</button>
              </div>

              <div className="space-y-4">
                {medicalDictionary.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 card-hover">
                    <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xl">{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.term}</h3>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Health Tips Section */}
          <div className="mt-8 card fade-in">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Health Tips of the Day</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Stay Hydrated</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Drink at least 8 glasses of water daily to maintain optimal health and energy levels.</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <ClockIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Regular Exercise</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Aim for 30 minutes of moderate exercise daily to boost your immune system and mood.</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Mental Wellness</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Practice mindfulness and meditation to reduce stress and improve mental clarity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chatbot Modal */}
      {showChatbot && (
        <SymptomChatbot onClose={() => setShowChatbot(false)} />
      )}
    </div>
  );
}