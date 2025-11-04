'use client';

import { useState, useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface EmailVerificationProps {
  email: string;
  expectedCode: string;
  onClose: () => void;
  onVerified: () => void;
}

export default function EmailVerification({ email, expectedCode, onClose, onVerified }: EmailVerificationProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [currentExpectedCode, setCurrentExpectedCode] = useState(expectedCode);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const generateNewCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }

    if (timeRemaining <= 0) {
      toast.error('Verification code has expired. Please request a new one.');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to verify code
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if the entered code matches the expected code
    if (verificationCode === currentExpectedCode) {
      toast.success('Email verified successfully!');
      setIsLoading(false);
      onVerified();
    } else {
      toast.error('Invalid verification code. Please try again.');
      setIsLoading(false);
      setCode(['', '', '', '', '', '']); // Clear the input
      inputRefs.current[0]?.focus(); // Focus first input
    }
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    
    const newCode = generateNewCode();
    setCurrentExpectedCode(newCode);
    setResendTimer(60);
    setTimeRemaining(600); // Reset to 10 minutes
    setCode(['', '', '', '', '', '']); // Clear current code
    
    // Show the new code in a toast for demo purposes
    toast.success(`New verification code: ${newCode}`, {
      duration: 8000,
      style: {
        background: '#10B981',
        color: 'white',
        fontWeight: 'bold'
      }
    });
  };

  if (timeRemaining <= 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="p-6 text-center">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Code Expired</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your verification code has expired. Please request a new one.
              </p>
              <button
                onClick={handleResendCode}
                className="btn-primary"
              >
                Send New Code
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Verify Your Email</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              We&apos;ve sent a 6-digit verification code to
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{email}</p>
            
            {/* Demo Notice */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>Demo Code:</strong> {currentExpectedCode}
              </p>
              <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                (In production, this would be sent to your email)
              </p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Code expires in: <span className="font-semibold">{formatTime(timeRemaining)}</span>
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="verification-input"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading || code.join('').length !== 6}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="loading-spinner"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-2">Didn&apos;t receive the code?</p>
            <button
              onClick={handleResendCode}
              disabled={resendTimer > 0}
              className={`font-medium transition-colors ${
                resendTimer > 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
              }`}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}