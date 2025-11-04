'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  BuildingStorefrontIcon,
  StarIcon,
  FunnelIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function PharmacyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const router = useRouter();

  const pharmacies = [
    {
      id: 1,
      name: 'HealthPlus Pharmacy',
      address: '123 Victoria Island, Lagos',
      location: 'Lagos',
      phone: '+234 801 234 5678',
      rating: 4.8,
      reviews: 156,
      openHours: '24/7',
      services: ['Prescription Filling', 'Home Delivery', 'Health Screening'],
      distance: '2.3 km',
      isOpen: true
    },
    {
      id: 2,
      name: 'MedPlus Pharmacy',
      address: '45 Wuse II, Abuja',
      location: 'Abuja',
      phone: '+234 802 345 6789',
      rating: 4.6,
      reviews: 89,
      openHours: '8:00 AM - 10:00 PM',
      services: ['Prescription Filling', 'Consultation', 'Medical Supplies'],
      distance: '1.8 km',
      isOpen: true
    },
    {
      id: 3,
      name: 'Alpha Pharmacy',
      address: '78 Ahmadu Bello Way, Kano',
      location: 'Kano',
      phone: '+234 803 456 7890',
      rating: 4.5,
      reviews: 67,
      openHours: '7:00 AM - 9:00 PM',
      services: ['Prescription Filling', 'Health Products', 'Immunization'],
      distance: '3.1 km',
      isOpen: false
    },
    {
      id: 4,
      name: 'Wellness Pharmacy',
      address: '12 GRA Phase 2, Port Harcourt',
      location: 'Port Harcourt',
      phone: '+234 804 567 8901',
      rating: 4.7,
      reviews: 134,
      openHours: '24/7',
      services: ['Prescription Filling', 'Home Delivery', 'Emergency Services'],
      distance: '0.9 km',
      isOpen: true
    },
    {
      id: 5,
      name: 'CareFirst Pharmacy',
      address: '56 Ring Road, Ibadan',
      location: 'Ibadan',
      phone: '+234 805 678 9012',
      rating: 4.4,
      reviews: 78,
      openHours: '8:00 AM - 8:00 PM',
      services: ['Prescription Filling', 'Health Consultation', 'Medical Devices'],
      distance: '4.2 km',
      isOpen: true
    }
  ];

  const locations = ['Lagos', 'Abuja', 'Kano', 'Port Harcourt', 'Ibadan', 'Kaduna'];

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pharmacy.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = selectedLocation === 'all' || pharmacy.location === selectedLocation;
    
    return matchesSearch && matchesLocation;
  });

  const getStatusColor = (isOpen: boolean) => {
    return isOpen ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
  };

  const getStatusText = (isOpen: boolean) => {
    return isOpen ? 'Open' : 'Closed';
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">Find Pharmacies</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search pharmacies, services, or medications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
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
            {filteredPharmacies.length} Pharmacies Found
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <FunnelIcon className="w-4 h-4" />
            <span>Sort by: Distance</span>
          </div>
        </div>

        {/* Pharmacies List */}
        <div className="space-y-6">
          {filteredPharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="card card-hover">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full flex items-center justify-center">
                    <BuildingStorefrontIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{pharmacy.name}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{pharmacy.rating}</span>
                          <span className="text-sm text-gray-400">({pharmacy.reviews} reviews)</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(pharmacy.isOpen)}`}>
                          {getStatusText(pharmacy.isOpen)}
                        </span>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{pharmacy.distance} away</div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        {pharmacy.address}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        {pharmacy.phone}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        {pharmacy.openHours}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {pharmacy.services.map((service, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center space-x-4">
                <button className="btn-primary flex-1 interactive-hover">
                  Get Directions
                </button>
                <button className="btn-secondary flex-1 interactive-hover">
                  Call Pharmacy
                </button>
                <button className="btn-secondary flex-1 interactive-hover">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPharmacies.length === 0 && (
          <div className="text-center py-12">
            <BuildingStorefrontIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No pharmacies found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Try adjusting your search criteria or location.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}