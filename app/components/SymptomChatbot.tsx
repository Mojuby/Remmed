'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  XMarkIcon, 
  PaperAirplaneIcon, 
  UserIcon, 
  ComputerDesktopIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  conditions?: ProbableCondition[];
  showBooking?: boolean;
}

interface ProbableCondition {
  name: string;
  probability: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendedSpecialist: string;
  urgency: 'routine' | 'soon' | 'urgent';
}

interface SymptomChatbotProps {
  onClose: () => void;
}

export default function SymptomChatbot({ onClose }: SymptomChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI health assistant. I can help you understand your symptoms and guide you to the right specialist. Please describe what you're experiencing, and I'll ask follow-up questions to better understand your condition.",
      timestamp: new Date(),
      suggestions: [
        "I have a headache",
        "I'm feeling chest pain",
        "I have stomach issues",
        "I'm experiencing fatigue"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userSymptoms, setUserSymptoms] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const symptomDatabase = {
    headache: {
      followUp: "Can you describe the type of headache? Is it throbbing, sharp, or dull? Where exactly do you feel it?",
      conditions: [
        { name: "Tension Headache", probability: 70, description: "Common stress-related headache", severity: "low", recommendedSpecialist: "General Practitioner", urgency: "routine" },
        { name: "Migraine", probability: 25, description: "Severe headache often with nausea", severity: "medium", recommendedSpecialist: "Neurologist", urgency: "soon" },
        { name: "Cluster Headache", probability: 5, description: "Severe headache in clusters", severity: "high", recommendedSpecialist: "Neurologist", urgency: "urgent" }
      ]
    },
    "chest pain": {
      followUp: "This is important. Can you describe the chest pain? Is it sharp, crushing, or burning? Does it radiate to your arm, neck, or jaw? When did it start?",
      conditions: [
        { name: "Acid Reflux", probability: 40, description: "Stomach acid causing chest discomfort", severity: "low", recommendedSpecialist: "Gastroenterologist", urgency: "routine" },
        { name: "Muscle Strain", probability: 30, description: "Chest muscle injury or strain", severity: "low", recommendedSpecialist: "General Practitioner", urgency: "routine" },
        { name: "Angina", probability: 20, description: "Reduced blood flow to heart", severity: "high", recommendedSpecialist: "Cardiologist", urgency: "urgent" },
        { name: "Heart Attack", probability: 10, description: "Blocked blood flow to heart", severity: "high", recommendedSpecialist: "Emergency Room", urgency: "urgent" }
      ]
    },
    "stomach pain": {
      followUp: "Where exactly is the stomach pain? Is it cramping, sharp, or dull? Have you had any nausea, vomiting, or changes in bowel movements?",
      conditions: [
        { name: "Gastritis", probability: 50, description: "Inflammation of stomach lining", severity: "medium", recommendedSpecialist: "Gastroenterologist", urgency: "soon" },
        { name: "Food Poisoning", probability: 30, description: "Illness from contaminated food", severity: "medium", recommendedSpecialist: "General Practitioner", urgency: "soon" },
        { name: "Appendicitis", probability: 15, description: "Inflammation of appendix", severity: "high", recommendedSpecialist: "Emergency Room", urgency: "urgent" },
        { name: "Ulcer", probability: 5, description: "Sore in stomach lining", severity: "medium", recommendedSpecialist: "Gastroenterologist", urgency: "soon" }
      ]
    },
    fatigue: {
      followUp: "How long have you been feeling fatigued? Is it constant or does it come and go? Have you noticed any other symptoms like fever, weight changes, or mood changes?",
      conditions: [
        { name: "Stress/Overwork", probability: 40, description: "Physical or mental exhaustion", severity: "low", recommendedSpecialist: "General Practitioner", urgency: "routine" },
        { name: "Anemia", probability: 25, description: "Low red blood cell count", severity: "medium", recommendedSpecialist: "Hematologist", urgency: "soon" },
        { name: "Thyroid Disorder", probability: 20, description: "Thyroid gland dysfunction", severity: "medium", recommendedSpecialist: "Endocrinologist", urgency: "soon" },
        { name: "Depression", probability: 15, description: "Mental health condition", severity: "medium", recommendedSpecialist: "Psychiatrist", urgency: "soon" }
      ]
    }
  };

  const generateBotResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();
    let botResponse = "";
    let suggestions: string[] = [];
    let conditions: ProbableCondition[] = [];
    let showBooking = false;

    // Check for emergency symptoms
    if (lowerInput.includes('chest pain') && (lowerInput.includes('crushing') || lowerInput.includes('radiating') || lowerInput.includes('arm') || lowerInput.includes('jaw'))) {
      botResponse = "⚠️ URGENT: Based on your symptoms, this could be serious. Please seek immediate medical attention or call emergency services (112). Do not delay medical care.";
      conditions = [
        { name: "Possible Heart Attack", probability: 80, description: "Requires immediate medical attention", severity: "high", recommendedSpecialist: "Emergency Room", urgency: "urgent" }
      ];
      showBooking = true;
    }
    // Check for known symptoms
    else if (lowerInput.includes('headache') || lowerInput.includes('head pain')) {
      const symptomData = symptomDatabase.headache;
      botResponse = symptomData.followUp;
      conditions = symptomData.conditions;
      suggestions = ["It's throbbing and on one side", "It's a dull ache all over", "Sharp pain behind my eyes", "It comes with nausea"];
    }
    else if (lowerInput.includes('chest pain') || lowerInput.includes('chest discomfort')) {
      const symptomData = symptomDatabase["chest pain"];
      botResponse = symptomData.followUp;
      conditions = symptomData.conditions;
      suggestions = ["Sharp pain when breathing", "Burning sensation", "Crushing feeling", "Pain radiates to arm"];
    }
    else if (lowerInput.includes('stomach') || lowerInput.includes('abdominal') || lowerInput.includes('belly')) {
      const symptomData = symptomDatabase["stomach pain"];
      botResponse = symptomData.followUp;
      conditions = symptomData.conditions;
      suggestions = ["Cramping pain", "Sharp pain in lower right", "Nausea and vomiting", "Burning sensation"];
    }
    else if (lowerInput.includes('tired') || lowerInput.includes('fatigue') || lowerInput.includes('exhausted')) {
      const symptomData = symptomDatabase.fatigue;
      botResponse = symptomData.followUp;
      conditions = symptomData.conditions;
      suggestions = ["Constant tiredness for weeks", "Tired with weight gain", "Tired with mood changes", "Tired after normal activities"];
    }
    // Follow-up responses
    else if (currentStep > 0) {
      if (lowerInput.includes('throbbing') || lowerInput.includes('one side')) {
        botResponse = "Based on your description, this sounds like it could be a migraine. Have you experienced any sensitivity to light, sound, or nausea with these headaches?";
        conditions = [
          { name: "Migraine", probability: 85, description: "Severe headache often with nausea and light sensitivity", severity: "medium", recommendedSpecialist: "Neurologist", urgency: "soon" },
          { name: "Tension Headache", probability: 15, description: "Common stress-related headache", severity: "low", recommendedSpecialist: "General Practitioner", urgency: "routine" }
        ];
        suggestions = ["Yes, light bothers me", "No, just the pain", "Sometimes nausea", "It affects my daily activities"];
      }
      else if (lowerInput.includes('crushing') || lowerInput.includes('radiating')) {
        botResponse = "⚠️ This description is concerning for a heart condition. I strongly recommend seeking immediate medical attention. Would you like me to help you find the nearest emergency facility or cardiologist?";
        conditions = [
          { name: "Angina/Heart Attack", probability: 90, description: "Requires immediate medical evaluation", severity: "high", recommendedSpecialist: "Emergency Room", urgency: "urgent" }
        ];
        showBooking = true;
      }
      else if (lowerInput.includes('lower right') || lowerInput.includes('sharp')) {
        botResponse = "Sharp pain in the lower right abdomen could indicate appendicitis, which requires immediate medical attention. Have you had fever, nausea, or vomiting along with this pain?";
        conditions = [
          { name: "Appendicitis", probability: 75, description: "Inflammation of appendix requiring surgery", severity: "high", recommendedSpecialist: "Emergency Room", urgency: "urgent" },
          { name: "Gastritis", probability: 25, description: "Stomach inflammation", severity: "medium", recommendedSpecialist: "Gastroenterologist", urgency: "soon" }
        ];
        showBooking = true;
      }
      else {
        botResponse = "Thank you for the additional information. Based on your symptoms, I've identified some possible conditions. Would you like me to help you book an appointment with the appropriate specialist?";
        showBooking = true;
      }
    }
    // General response
    else {
      botResponse = "I understand you're experiencing some health concerns. Could you please describe your main symptom in more detail? For example, where do you feel it, when did it start, and how severe is it on a scale of 1-10?";
      suggestions = ["I have pain in my...", "I've been feeling...", "I noticed that...", "It started when..."];
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date(),
      suggestions,
      conditions,
      showBooking
    };
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserSymptoms(prev => [...prev, content]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      setCurrentStep(prev => prev + 1);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleBookSpecialist = (specialist: string) => {
    router.push(`/specialist?specialty=${encodeURIComponent(specialist)}`);
    onClose();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'routine': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300';
      case 'soon': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-300';
      case 'urgent': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <ComputerDesktopIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Health Assistant</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Symptom checker & specialist finder</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Disclaimer */}
        <div className="px-6 py-3 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-700">
          <div className="flex items-center space-x-2 text-sm text-yellow-800 dark:text-yellow-200">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span>This is not a substitute for professional medical advice. For emergencies, call 112 immediately.</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className="flex items-start space-x-3">
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <ComputerDesktopIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Conditions */}
                {message.conditions && message.conditions.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Possible Conditions:</h4>
                    {message.conditions.map((condition, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h5 className="font-semibold text-gray-900 dark:text-gray-100">{condition.name}</h5>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {condition.probability}% match
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{condition.description}</p>
                            <div className="flex items-center space-x-3">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(condition.severity)}`}>
                                {condition.severity} severity
                              </span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(condition.urgency)}`}>
                                {condition.urgency}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <button
                              onClick={() => handleBookSpecialist(condition.recommendedSpecialist)}
                              className="btn-primary text-xs px-3 py-1 flex items-center space-x-1"
                            >
                              <UserGroupIcon className="w-3 h-3" />
                              <span>Book {condition.recommendedSpecialist}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {/* Booking CTA */}
                {message.showBooking && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">Ready to book an appointment?</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Get professional medical care from qualified specialists</p>
                      </div>
                      <button
                        onClick={() => router.push('/specialist')}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <CalendarIcon className="w-4 h-4" />
                        <span>Find Specialists</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <ComputerDesktopIcon className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="Describe your symptoms..."
              className="flex-1 input-field"
              disabled={isTyping}
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}