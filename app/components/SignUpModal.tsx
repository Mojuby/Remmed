'use client';

import { useState } from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useUser } from '../contexts/UserContext';
import { useRouter } from 'next/navigation';

interface SignUpModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSignUpSuccess: (email: string, verificationCode: string) => void;
  userType?: 'patient' | 'doctor';
}

export default function SignUpModal({ onClose, onSwitchToLogin, onSignUpSuccess, userType = 'patient' }: SignUpModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const { setUser } = useUser();
  const router = useRouter();

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
    if (userType === 'patient') return true; // Patients can use any email
    
    // For specialists, reject personal email domains
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

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock Google user data
      const googleUser = {
        id: Date.now().toString(),
        email: 'user@gmail.com',
        firstName: 'Google',
        lastName: 'User',
        userType: userType,
        profilePhoto: undefined
      };

      setUser(googleUser);
      toast.success(`Welcome, ${googleUser.firstName}! Account created with Google.`);
      
      // Redirect based on user type
      if (userType === 'patient') {
        router.push('/home');
      } else {
        router.push('/doctor/dashboard');
      }
      
      onClose();
    } catch (error) {
      toast.error('Google sign-up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignUp = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Apple Sign In flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock Apple user data
      const appleUser = {
        id: Date.now().toString(),
        email: 'user@icloud.com',
        firstName: 'Apple',
        lastName: 'User',
        userType: userType,
        profilePhoto: undefined
      };

      setUser(appleUser);
      toast.success(`Welcome, ${appleUser.firstName}! Account created with Apple ID.`);
      
      // Redirect based on user type
      if (userType === 'patient') {
        router.push('/home');
      } else {
        router.push('/doctor/dashboard');
      }
      
      onClose();
    } catch (error) {
      toast.error('Apple sign-up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userType === 'doctor' && !validateWorkEmail(formData.email)) {
      toast.error('Please use a work email address. Personal email addresses are not allowed for specialist accounts.');
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

  const isSpecialist = userType === 'doctor';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {isSpecialist ? 'Join as Specialist' : 'Create Account'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Demo Notice */}
          <div className={`${isSpecialist ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-700' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'} border rounded-lg p-4 mb-6`}>
            <p className={`text-sm ${isSpecialist ? 'text-teal-800 dark:text-teal-200' : 'text-blue-800 dark:text-blue-200'}`}>
              <strong>Demo Mode:</strong> {isSpecialist 
                ? 'Please use your professional/work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted for specialist accounts.'
                : 'The verification code will be displayed in a notification for testing purposes. In production, it would be sent to your email.'
              }
            </p>
          </div>

          {/* Social Sign Up */}
          <div className="space-y-3 mb-6">
            <button 
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full btn-google disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="loading-spinner"></div>
                  <span>Signing up...</span>
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign up with Google</span>
                </>
              )}
            </button>
            
            <button 
              onClick={handleAppleSignUp}
              disabled={isLoading}
              className="w-full btn-apple disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="loading-spinner"></div>
                  <span>Signing up...</span>
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span>Sign up with Apple</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {isSpecialist ? 'Work Email Address' : 'Email Address'}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder={isSpecialist ? 'Enter your work email' : 'Enter your email'}
                required
              />
              {isSpecialist && formData.email && !validateWorkEmail(formData.email) && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                  Please use a work email address. Personal emails are not allowed.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
              disabled={isLoading || passwordStrength !== 'strong' || (isSpecialist && !validateWorkEmail(formData.email))}
              className={`w-full ${isSpecialist ? 'btn-success' : 'btn-primary'} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="loading-spinner"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                isSpecialist ? 'Create Specialist Account' : 'Sign Up'
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Already have {isSpecialist ? 'a specialist' : 'an'} account?
              <button
                onClick={onSwitchToLogin}
                className={`ml-2 ${isSpecialist ? 'text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300' : 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'} font-medium transition-colors`}
              >
                {isSpecialist ? 'Sign in' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}