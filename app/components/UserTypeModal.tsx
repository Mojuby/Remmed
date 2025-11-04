'use client';

import { useState } from 'react';
import { XMarkIcon, UserIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface UserTypeModalProps {
  onClose: () => void;
  onSelectUserType: (userType: 'patient' | 'doctor') => void;
}

export default function UserTypeModal({ onClose, onSelectUserType }: UserTypeModalProps) {
  const [selectedType, setSelectedType] = useState<'patient' | 'doctor' | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      onSelectUserType(selectedType);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Join RemMed</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-300">
              Choose how you&apos;d like to join our healthcare platform
            </p>
          </div>

          {/* User Type Selection */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => setSelectedType('patient')}
              className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedType === 'patient'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedType === 'patient' ? 'bg-blue-600' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <UserIcon className={`w-6 h-6 ${
                    selectedType === 'patient' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    I&apos;m a Patient
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Access healthcare services, book appointments, consult with doctors, and manage your medical records
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedType('doctor')}
              className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedType === 'doctor'
                  ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedType === 'doctor' ? 'bg-teal-600' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <UserGroupIcon className={`w-6 h-6 ${
                    selectedType === 'doctor' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    I&apos;m a Healthcare Specialist
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Provide medical services, manage patient consultations, access medical tools, and grow your practice
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}