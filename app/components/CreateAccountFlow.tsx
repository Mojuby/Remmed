'use client';

import { useState } from 'react';
import { XMarkIcon, CameraIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useUser } from '../contexts/UserContext';

interface CreateAccountFlowProps {
  email: string;
  onClose: () => void;
}

interface FormData {
  // Page 1: Basic Information
  profilePhoto: File | null;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  stateOfOrigin: string;
  localGovernmentArea: string;
  
  // Page 2: Location
  stateOfResidence: string;
  postalCode: string;
  homeAddress: string;
  
  // Page 3: Contact Information
  phoneNumber: string;
  nextOfKinFullName: string;
  nextOfKinPhoneNumber: string;
  relationshipToNextOfKin: string;
  
  // Page 4: Medical Information
  hasHealthCondition: string;
  takingMedication: string;
  onHealthRegimen: string;
  hasAllergies: string;
  allergiesList: string;
  bloodType: string;
  genotype: string;
}

const initialFormData: FormData = {
  profilePhoto: null,
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  stateOfOrigin: '',
  localGovernmentArea: '',
  stateOfResidence: '',
  postalCode: '',
  homeAddress: '',
  phoneNumber: '',
  nextOfKinFullName: '',
  nextOfKinPhoneNumber: '',
  relationshipToNextOfKin: '',
  hasHealthCondition: '',
  takingMedication: '',
  onHealthRegimen: '',
  hasAllergies: '',
  allergiesList: '',
  bloodType: '',
  genotype: ''
};

const relationships = [
  'Parent', 'Spouse', 'Sibling', 'Child', 'Grandparent', 'Grandchild',
  'Uncle/Aunt', 'Cousin', 'Friend', 'Guardian', 'Other'
];

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genotypes = ['AA', 'AS', 'AC', 'SS', 'SC', 'CC'];

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const lgasByState: { [key: string]: string[] } = {
  'Lagos': ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'],
  'Kano': ['Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta', 'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam', 'Gaya', 'Gezawa', 'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal', 'Karaye', 'Kibiya', 'Kiru', 'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir', 'Nasarawa', 'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tarauni', 'Tofa', 'Tsanyawa', 'Tudun Wada', 'Ungogo', 'Warawa', 'Wudil'],
  'FCT': ['Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal Area Council'],
  // Add more states and their LGAs as needed
};

export default function CreateAccountFlow({ email, onClose }: CreateAccountFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Reset LGA when state changes
    if (name === 'stateOfOrigin' || name === 'stateOfResidence') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        localGovernmentArea: ''
      }));
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit to 10 characters
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
    setFormData({
      ...formData,
      [e.target.name]: digitsOnly
    });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profilePhoto: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.dateOfBirth && 
                 formData.gender && formData.maritalStatus && formData.stateOfOrigin && 
                 formData.localGovernmentArea);
      case 2:
        return !!(formData.stateOfResidence && formData.postalCode && formData.homeAddress);
      case 3:
        return !!(formData.phoneNumber && formData.phoneNumber.length === 10 && 
                 formData.nextOfKinFullName && formData.nextOfKinPhoneNumber && 
                 formData.nextOfKinPhoneNumber.length === 10 && formData.relationshipToNextOfKin);
      case 4:
        return !!(formData.hasHealthCondition && formData.takingMedication && 
                 formData.onHealthRegimen && formData.hasAllergies && 
                 formData.bloodType && formData.genotype);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create user object with form data
    const newUser = {
      id: Date.now().toString(),
      email: email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      userType: 'patient' as const,
      profilePhoto: profilePhotoPreview || undefined
    };

    // Set user in context
    setUser(newUser);
    
    toast.success(`Account created successfully! Welcome, ${formData.firstName}!`);
    setIsLoading(false);
    
    // Redirect to homepage dashboard
    router.push('/home');
    onClose();
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`step-indicator ${
            step < currentStep ? 'step-completed' : 
            step === currentStep ? 'step-active' : 'step-inactive'
          }`}>
            {step < currentStep ? <CheckIcon className="w-4 h-4" /> : step}
          </div>
          {index < 3 && <div className={`step-line ${step < currentStep ? 'step-line-active' : ''}`} />}
        </div>
      ))}
    </div>
  );

  const renderRadioGroup = (name: string, label: string) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
      <div className="radio-group">
        <label className="radio-option">
          <input
            type="radio"
            name={name}
            value="yes"
            checked={formData[name as keyof FormData] === 'yes'}
            onChange={(e) => handleRadioChange(name, e.target.value)}
            className="radio-input"
          />
          <div className="radio-circle">
            <div className="radio-inner"></div>
          </div>
          <span className="text-sm text-gray-700">Yes</span>
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name={name}
            value="no"
            checked={formData[name as keyof FormData] === 'no'}
            onChange={(e) => handleRadioChange(name, e.target.value)}
            className="radio-input"
          />
          <div className="radio-circle">
            <div className="radio-inner"></div>
          </div>
          <span className="text-sm text-gray-700">No</span>
        </label>
      </div>
    </div>
  );

  const renderPhoneField = (name: string, label: string, value: string) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex">
        <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
          <span className="text-gray-700 font-medium">+234</span>
        </div>
        <input
          type="tel"
          name={name}
          value={value}
          onChange={handlePhoneNumberChange}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 bg-white"
          placeholder="8012345678"
          maxLength={10}
          required
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">Enter 10 digits (e.g., 8012345678)</p>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h3>
      
      {/* Profile Photo */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {profilePhotoPreview ? (
              <Image 
                src={profilePhotoPreview} 
                alt="Profile" 
                width={96}
                height={96}
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
              />
            ) : (
              <CameraIcon className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">Add profile photo</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          className="input-field"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status *</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">State of Origin *</label>
        <select
          name="stateOfOrigin"
          value={formData.stateOfOrigin}
          onChange={handleInputChange}
          className="input-field"
          required
        >
          <option value="">Select State</option>
          {nigerianStates.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Local Government Area *</label>
        <select
          name="localGovernmentArea"
          value={formData.localGovernmentArea}
          onChange={handleInputChange}
          className="input-field"
          required
          disabled={!formData.stateOfOrigin}
        >
          <option value="">Select LGA</option>
          {formData.stateOfOrigin && lgasByState[formData.stateOfOrigin] ? 
            lgasByState[formData.stateOfOrigin].map((lga) => (
              <option key={lga} value={lga}>{lga}</option>
            )) : 
            <option value="other">Other (Please specify in next field)</option>
          }
        </select>
        {formData.stateOfOrigin && !lgasByState[formData.stateOfOrigin] && (
          <input
            type="text"
            placeholder="Enter your LGA"
            className="input-field mt-2"
            onChange={(e) => setFormData({...formData, localGovernmentArea: e.target.value})}
          />
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Location</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">State of Residence *</label>
        <select
          name="stateOfResidence"
          value={formData.stateOfResidence}
          onChange={handleInputChange}
          className="input-field"
          required
        >
          <option value="">Select State</option>
          {nigerianStates.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          className="input-field"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Home Address *</label>
        <textarea
          name="homeAddress"
          value={formData.homeAddress}
          onChange={handleInputChange}
          className="input-field"
          rows={3}
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          value={email}
          className="input-field"
          disabled
        />
      </div>

      {renderPhoneField('phoneNumber', 'Phone Number *', formData.phoneNumber)}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Next of Kin Full Name *</label>
        <input
          type="text"
          name="nextOfKinFullName"
          value={formData.nextOfKinFullName}
          onChange={handleInputChange}
          className="input-field"
          required
        />
      </div>

      {renderPhoneField('nextOfKinPhoneNumber', 'Next of Kin Phone Number *', formData.nextOfKinPhoneNumber)}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Relationship to Next of Kin *</label>
        <select
          name="relationshipToNextOfKin"
          value={formData.relationshipToNextOfKin}
          onChange={handleInputChange}
          className="input-field"
          required
        >
          <option value="">Select Relationship</option>
          {relationships.map((relationship) => (
            <option key={relationship} value={relationship.toLowerCase()}>
              {relationship}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Medical Information</h3>
        <p className="text-sm text-gray-600 mt-1">
          Only the specialists here on the RemMed app will have access to your medical information
        </p>
      </div>
      
      {renderRadioGroup('hasHealthCondition', 'Do you have any health condition currently?')}
      {renderRadioGroup('takingMedication', 'Are you taking any kind of medication currently?')}
      {renderRadioGroup('onHealthRegimen', 'Are you on any health regimen?')}
      {renderRadioGroup('hasAllergies', 'Do you have any allergies?')}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Please list your allergies if you have any (optional)
        </label>
        <textarea
          name="allergiesList"
          value={formData.allergiesList}
          onChange={handleInputChange}
          className="input-field"
          rows={3}
          placeholder="List any allergies you may have..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type *</label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="">Select Blood Type</option>
            {bloodTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Genotype *</label>
          <select
            name="genotype"
            value={formData.genotype}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="">Select Genotype</option>
            {genotypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
        <p className="mb-2">
          By selecting Create account, you agree to RemMed&apos;s{' '}
          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
        </p>
        <p>
          To learn more about how we collect, use, share, and protect all your personal data, 
          please see the RemMed{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Form Content */}
          <div className="mb-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Back
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="btn-primary"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}