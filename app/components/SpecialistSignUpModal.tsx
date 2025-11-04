'use client';

import { useState } from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface SpecialistSignUpModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSignUpSuccess: (email: string, verificationCode: string) => void;
}

export default function SpecialistSignUpModal({ onClose, onSwitchToLogin, onSignUpSuccess }: SpecialistSignUpModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasNoSpaces = !password.includes(' ');
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const validCriteria = [hasMinLength, hasNoSpaces, hasNumber, hasSpecialChar].filter(Boolean).length;
    
    if (validCriteria < 2) return 'weak';
    if (validCriteria < 4) return 'medium';
    return 'strong';
  };

  const validateWorkEmail = (email: string) => {
    // Common personal email domains to reject
    const personalDomains = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
      'icloud.com', 'live.com', 'msn.com', 'ymail.com', 'rocketmail.com'
    ];
    
    const domain = email.split('@')[1]?.toLowerCase();
    return domain && !personalDomains.includes(domain);
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    setPasswordStrength(validatePassword(password));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateWorkEmail(formData.email)) {
      toast.error('Please use a work email address. Personal email addresses are not allowed.');
      return;
    }
    
    if (passwordStrength !== 'strong') {
      toast.error('Password must meet all requirements');
      return;
    }
    
    setIsLoading(true);
    
    // Generate verification code
    const verificationCode = generateVerificationCode();
    
    // Simulate API call to create account and send verification email
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, show the code in a toast (in production, this would be sent via email)
    toast.success(`Verification code sent! Demo code: ${verificationCode}`, {
      duration: 8000,
      style: {
        background: '#10B981',
        color: 'white',
        fontWeight: 'bold'
      }
    });
    
    setIsLoading(false);
    onSignUpSuccess(formData.email, verificationCode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'password') {
      handlePasswordChange(e);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'Password must be 8+ characters, no spaces, include 1 number and 1 special character';
      case 'medium':
        return 'Password strength: Medium - Add more requirements';
      case 'strong':
        return 'Password strength: Strong ✓';
      default:
        return 'Password must be 8+ characters, no spaces, include 1 number and 1 special character';
    }
  };

  const getPasswordStrengthClass = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'strength-weak';
      case 'medium':
        return 'strength-medium';
      case 'strong':
        return 'strength-strong';
      default:
        return 'strength-weak';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Join as Specialist</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Demo Notice */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-teal-800">
              <strong>Work Email Required:</strong> Please use your professional/work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted for specialist accounts.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your work email"
                required
              />
              {formData.email && !validateWorkEmail(formData.email) && (
                <p className="text-red-600 text-xs mt-1">
                  Please use a work email address. Personal emails are not allowed.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pr-12"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className={`password-strength ${getPasswordStrengthClass()}`}>
                {getPasswordStrengthText()}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || passwordStrength !== 'strong' || !validateWorkEmail(formData.email)}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Specialist Account'
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have a specialist account?
              <button
                onClick={onSwitchToLogin}
                className="ml-2 text-teal-600 hover:text-teal-700 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}