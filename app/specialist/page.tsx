'use client';

import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  VideoCameraIcon,
  UserIcon,
  FunnelIcon,
  CalendarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SpecialistPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Set initial specialty from URL params (from chatbot)
  useEffect(() => {
    const specialty = searchParams.get('specialty');
    if (specialty) {
      setSelectedSpecialty(specialty);
    }
  }, [searchParams]);

  const specialists = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      location: 'Lagos',
      rating: 4.9,
      reviews: 127,
      experience: '15+ years',
      consultationFee: 15000,
      availability: 'Available Today',
      image: null,
      languages: ['English', 'Yoruba'],
      education: 'MBBS, MD Cardiology',
      hospital: 'Lagos University Teaching Hospital'
    },
    {
      id: 2,
      name: 'Dr. Michael Adebayo',
      specialty: 'Pediatrician',
      location: 'Abuja',
      rating: 4.8,
      reviews: 89,
      experience: '12+ years',
      consultationFee: 12000,
      availability: 'Available Tomorrow',
      image: null,
      languages: ['English', 'Hausa'],
      education: 'MBBS, DCH',
      hospital: 'National Hospital Abuja'
    },
    {
      id: 3,
      name: 'Dr. Fatima Usman',
      specialty: 'Dermatologist',
      location: 'Kano',
      rating: 4.7,
      reviews: 156,
      experience: '10+ years',
      consultationFee: 18000,
      availability: 'Available Today',
      image: null,
      languages: ['English', 'Hausa'],
      education: 'MBBS, MD Dermatology',
      hospital: 'Aminu Kano Teaching Hospital'
    },
    {
      id: 4,
      name: 'Dr. Chinedu Okafor',
      specialty: 'Orthopedic Surgeon',
      location: 'Lagos',
      rating: 4.9,
      reviews: 203,
      experience: '18+ years',
      consultationFee: 25000,
      availability: 'Available Next Week',
      image: null,
      languages: ['English', 'Igbo'],
      education: 'MBBS, FWACS Orthopedics',
      hospital: 'Lagos State University Teaching Hospital'
    },
    {
      id: 5,
      name: 'Dr. Aisha Bello',
      specialty: 'Gynecologist',
      location: 'Abuja',
      rating: 4.8,
      reviews: 174,
      experience: '14+ years',
      consultationFee: 20000,
      availability: 'Available Today',
      image: null,
      languages: ['English', 'Hausa'],
      education: 'MBBS, FWACS Obstetrics & Gynecology',
      hospital: 'University of Abuja Teaching Hospital'
    },
    {
      id: 6,
      name: 'Dr. Emeka Nwosu',
      specialty: 'Neurologist',
      location: 'Port Harcourt',
      rating: 4.6,
      reviews: 98,
      experience: '11+ years',
      consultationFee: 22000,
      availability: 'Available Tomorrow',
      image: null,
      languages: ['English', 'Igbo'],
      education: 'MBBS, MD Neurology',
      hospital: 'University of Port Harcourt Teaching Hospital'
    },
    {
      id: 7,
      name: 'Dr. Adebola Adeyemi',
      specialty: 'General Practitioner',
      location: 'Lagos',
      rating: 4.7,
      reviews: 145,
      experience: '8+ years',
      consultationFee: 10000,
      availability: 'Available Today',
      image: null,
      languages: ['English', 'Yoruba'],
      education: 'MBBS',
      hospital: 'Lagos Island General Hospital'
    },
    {
      id: 8,
      name: 'Dr. Kemi Ogundimu',
      specialty: 'Gastroenterologist',
      location: 'Ibadan',
      rating: 4.8,
      reviews: 112,
      experience: '13+ years',
      consultationFee: 18000,
      availability: 'Available Tomorrow',
      image: null,
      languages: ['English', 'Yoruba'],
      education: 'MBBS, MD Gastroenterology',
      hospital: 'University College Hospital Ibadan'
    },
    {
      id: 9,
      name: 'Dr. Ahmed Hassan',
      specialty: 'Psychiatrist',
      location: 'Abuja',
      rating: 4.9,
      reviews: 87,
      experience: '16+ years',
      consultationFee: 20000,
      availability: 'Available Today',
      image: null,
      languages: ['English', 'Hausa'],
      education: 'MBBS, MD Psychiatry',
      hospital: 'Federal Neuropsychiatric Hospital'
    },
    {
      id: 10,
      name: 'Dr. Grace Okoro',
      specialty: 'Endocrinologist',
      location: 'Lagos',
      rating: 4.6,
      reviews: 76,
      experience: '9+ years',
      consultationFee: 17000,
      availability: 'Available Next Week',
      image: null,
      languages: ['English', 'Igbo'],
      education: 'MBBS, MD Endocrinology',
      hospital: 'Lagos State University Teaching Hospital'
    },
    {
      id: 11,
      name: 'Dr. Yusuf Ibrahim',
      specialty: 'Hematologist',
      location: 'Kano',
      rating: 4.7,
      reviews: 94,
      experience: '12+ years',
      consultationFee: 19000,
      availability: 'Available Tomorrow',
      image: null,
      languages: ['English', 'Hausa'],
      education: 'MBBS, MD Hematology',
      hospital: 'Aminu Kano Teaching Hospital'
    },
    {
      id: 12,
      name: 'Dr. Funmi Adebayo',
      specialty: 'Emergency Room',
      location: 'Lagos',
      rating: 4.8,
      reviews: 156,
      experience: '10+ years',
      consultationFee: 15000,
      availability: 'Available 24/7',
      image: null,
      languages: ['English', 'Yoruba'],
      education: 'MBBS, Emergency Medicine',
      hospital: 'Lagos University Teaching Hospital Emergency'
    }
  ];

  const specialties = [
    'Cardiologist', 'Pediatrician', 'Dermatologist', 'Orthopedic Surgeon', 
    'Gynecologist', 'Neurologist', 'Psychiatrist', 'Ophthalmologist',
    'General Practitioner', 'Gastroenterologist', 'Endocrinologist', 
    'Hematologist', 'Emergency Room'
  ];

  const locations = ['Lagos', 'Abuja', 'Kano', 'Port Harcourt', 'Ibadan', 'Kaduna'];

  const filteredSpecialists = specialists.filter(specialist => {
    const matchesSearch = specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         specialist.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         specialist.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 'all' || specialist.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === 'all' || specialist.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes('Today') || availability.includes('24/7')) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
    if (availability.includes('Tomorrow')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const handleBookAppointment = (specialistId: number) => {
    console.log('Booking appointment with specialist:', specialistId);
  };

  const handleBackToHome = () => {
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      {/* Header */}
      <div className="glass border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors interactive-hover"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">Find Specialists</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, specialty, or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="input-field"
              >
                <option value="all">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input-field"
              >
                <option value="all">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {filteredSpecialists.length} Specialists Found
            {selectedSpecialty !== 'all' && (
              <span className="text-blue-600 dark:text-blue-400"> for {selectedSpecialty}</span>
            )}
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <FunnelIcon className="w-4 h-4" />
            <span>Sort by: Relevance</span>
          </div>
        </div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecialists.map((specialist) => (
            <div key={specialist.id} className="card card-hover">
              {/* Doctor Info */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{specialist.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{specialist.specialty}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{specialist.rating}</span>
                    <span className="text-sm text-gray-400">({specialist.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  {specialist.location} • {specialist.hospital}
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  {specialist.experience} experience
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Education:</strong> {specialist.education}
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Languages:</strong> {specialist.languages.join(', ')}
                </div>
              </div>

              {/* Availability and Fee */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityColor(specialist.availability)}`}>
                  {specialist.availability}
                </span>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">₦{specialist.consultationFee.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Consultation fee</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleBookAppointment(specialist.id)}
                  className="btn-primary flex items-center justify-center space-x-2 text-sm py-2 interactive-hover"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Book</span>
                </button>
                <button className="btn-secondary flex items-center justify-center space-x-2 text-sm py-2 interactive-hover">
                  <VideoCameraIcon className="w-4 h-4" />
                  <span>Video Call</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSpecialists.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No specialists found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}