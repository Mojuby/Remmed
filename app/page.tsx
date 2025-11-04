'use client';

import { useState } from 'react';
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  UserGroupIcon,
  HeartIcon,
  UserIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import EmailVerification from './components/EmailVerification';
import CreateAccountFlow from './components/CreateAccountFlow';
import SpecialistCreateAccountFlow from './components/SpecialistCreateAccountFlow';
import UserTypeModal from './components/UserTypeModal';
import SymptomChatbot from './components/SymptomChatbot';
import ThemeToggle from './components/ThemeToggle';
import Logo from './components/Logo';

export default function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showCreateAccountFlow, setShowCreateAccountFlow] = useState(false);
  const [showSpecialistCreateAccountFlow, setShowSpecialistCreateAccountFlow] = useState(false);
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedUserType, setSelectedUserType] = useState<'patient' | 'doctor'>('patient');

  const features = [
    {
      icon: VideoCameraIcon,
      title: 'Video & Audio Consultations',
      description: 'Connect with certified healthcare providers through secure, high-definition video and crystal-clear audio consultations from anywhere'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Secure Messaging',
      description: 'HIPAA-compliant encrypted messaging system for ongoing communication with your healthcare team and medical professionals'
    },
    {
      icon: ClockIcon,
      title: 'Easy Scheduling',
      description: 'Book medical appointments 24/7 with your preferred doctors and specialists using our intelligent scheduling system'
    },
    {
      icon: MapPinIcon,
      title: 'Location Services',
      description: 'Find nearby healthcare providers, hospitals, pharmacies, and emergency medical services in your area instantly'
    },
    {
      icon: HeartIcon,
      title: 'Health Monitoring',
      description: 'Track vital signs, medications, symptoms, and health progress with comprehensive monitoring tools and analytics'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Private',
      description: 'Bank-level encryption and security protocols protect all your personal health information and medical data'
    }
  ];

  const handleSignUpSuccess = (email: string, code: string) => {
    setUserEmail(email);
    setVerificationCode(code);
    setShowSignUpModal(false);
    setShowEmailVerification(true);
  };

  const handleEmailVerified = () => {
    setShowEmailVerification(false);
    if (selectedUserType === 'patient') {
      setShowCreateAccountFlow(true);
    } else {
      setShowSpecialistCreateAccountFlow(true);
    }
  };

  const handleGetStarted = () => {
    setShowUserTypeModal(true);
  };

  const handleUserTypeSelected = (userType: 'patient' | 'doctor') => {
    setSelectedUserType(userType);
    setShowUserTypeModal(false);
    setShowSignUpModal(true);
  };

  const handleStartHealthcareJourney = () => {
    setSelectedUserType('patient');
    setShowSignUpModal(true);
  };

  const handleChatbotClick = () => {
    // For non-signed-in users, show sign-up modal first
    setSelectedUserType('patient');
    setShowSignUpModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 slide-in-left">
              <Logo className="text-blue-600 dark:text-blue-400 icon-hover" size="md" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RemMed
              </span>
            </div>
            
            <div className="flex items-center space-x-4 slide-in-right">
              <ThemeToggle />
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 hover:scale-105"
              >
                Sign In
              </button>
              <button
                onClick={handleGetStarted}
                className="btn-primary interactive-hover"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-gray-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
              Revolutionary Telemedicine Platform for Modern Healthcare in Nigeria
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover the future of healthcare with RemMed — a secure, easy-to-use telemedicine platform that connects you with licensed medical professionals, simplifies access to prescriptions, and puts your medical records at your fingertips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center stagger-children">
              <button
                onClick={handleStartHealthcareJourney}
                className="btn-primary text-lg px-8 py-4 interactive-hover"
              >
                Start Your Healthcare Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Carousel */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-4">
              Comprehensive Digital Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Advanced telemedicine features designed for modern healthcare delivery
            </p>
          </div>
          
          <div className="carousel-container">
            <div className="carousel-track">
              {/* First set of features */}
              {features.map((feature, index) => (
                <div key={index} className="carousel-item w-80">
                  <div className="card card-hover h-full">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 icon-hover">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {features.map((feature, index) => (
                <div key={`duplicate-${index}`} className="carousel-item w-80">
                  <div className="card card-hover h-full">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 icon-hover">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Healthcare Professionals In Nigeria!
            </h2>
            <p className="text-xl text-blue-100">
              Leading the digital transformation in healthcare delivery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white stagger-children">
            <div className="card-hover">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Active Patients</div>
            </div>
            <div className="card-hover">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Healthcare Specialists</div>
            </div>
            <div className="card-hover">
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-blue-100">Successful Consultations</div>
            </div>
            <div className="card-hover">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Medical Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-4">
              Why Choose RemMed for Your Healthcare Needs?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Experience healthcare reimagined with cutting-edge technology and compassionate care
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            <div className="text-center card card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 icon-hover">
                <VideoCameraIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Instant Access to Care</h3>
              <p className="text-gray-600 dark:text-gray-300">Connect with board-certified physicians within minutes, eliminating wait times and travel barriers to quality healthcare.</p>
            </div>
            
            <div className="text-center card card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 icon-hover">
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">HIPAA Compliant Security</h3>
              <p className="text-gray-600 dark:text-gray-300">Your medical information is protected with enterprise-grade encryption and strict privacy protocols that exceed industry standards.</p>
            </div>
            
            <div className="text-center card card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 icon-hover">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Personalized Healthcare</h3>
              <p className="text-gray-600 dark:text-gray-300">Receive tailored treatment plans and ongoing care management designed specifically for your unique health profile and needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Transform Your Healthcare Experience Today
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of patients and healthcare specialists who trust RemMed for secure, convenient, and comprehensive digital healthcare solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center stagger-children">
            <button
              onClick={handleStartHealthcareJourney}
              className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2 interactive-hover"
            >
              <UserIcon className="w-5 h-5" />
              <span>Join as Patient</span>
            </button>
            <button
              onClick={handleGetStarted}
              className="btn-success text-lg px-8 py-4 flex items-center justify-center space-x-2 interactive-hover"
            >
              <HeartIcon className="w-5 h-5" />
              <span>Join as Healthcare Specialist</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 stagger-children">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Logo className="text-white" size="sm" />
                <span className="text-xl font-bold">RemMed</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing healthcare delivery through innovative telemedicine technology and compassionate patient care.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Healthcare Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">For Patients</li>
                <li className="hover:text-white transition-colors cursor-pointer">For Healthcare Specialists</li>
                <li className="hover:text-white transition-colors cursor-pointer">For Medical Institutions</li>
                <li className="hover:text-white transition-colors cursor-pointer">API Integration</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support & Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact Support</li>
                <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Emergency Information</h3>
              <div className="text-red-400 font-semibold">
                <p>For medical emergencies, call 112</p>
                <p className="text-sm text-gray-400 mt-2">
                  RemMed is designed for non-emergency medical consultations and ongoing healthcare management
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RemMed. All rights reserved. | Leading Digital Healthcare Platform</p>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      <button
        onClick={handleChatbotClick}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-40 animate-pulse"
        title="Check symptoms with AI"
      >
        <ComputerDesktopIcon className="w-8 h-8" />
      </button>

      {/* Modals */}
      {showUserTypeModal && (
        <UserTypeModal
          onClose={() => setShowUserTypeModal(false)}
          onSelectUserType={handleUserTypeSelected}
        />
      )}

      {showSignUpModal && (
        <SignUpModal
          onClose={() => setShowSignUpModal(false)}
          onSwitchToLogin={() => {
            setShowSignUpModal(false);
            setShowLoginModal(true);
          }}
          onSignUpSuccess={handleSignUpSuccess}
          userType={selectedUserType}
        />
      )}

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignUp={() => {
            setShowLoginModal(false);
            setShowUserTypeModal(true);
          }}
        />
      )}

      {showEmailVerification && (
        <EmailVerification
          email={userEmail}
          expectedCode={verificationCode}
          onClose={() => setShowEmailVerification(false)}
          onVerified={handleEmailVerified}
        />
      )}

      {showCreateAccountFlow && (
        <CreateAccountFlow
          email={userEmail}
          onClose={() => setShowCreateAccountFlow(false)}
        />
      )}

      {showSpecialistCreateAccountFlow && (
        <SpecialistCreateAccountFlow
          email={userEmail}
          onClose={() => setShowSpecialistCreateAccountFlow(false)}
        />
      )}

      {showChatbot && (
        <SymptomChatbot onClose={() => setShowChatbot(false)} />
      )}
    </div>
  );
}