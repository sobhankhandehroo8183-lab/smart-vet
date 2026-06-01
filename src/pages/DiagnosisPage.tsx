import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Brain, Sparkles, AlertCircle, Check } from 'lucide-react';
import AnimalTypeSelector from '../features/diagnosis/components/AnimalTypeSelector';
import SymptomSelector from '../features/diagnosis/components/SymptomSelector';
import DiagnosisResult from '../features/diagnosis/components/DiagnosisResult';

type DiagnosisStep = 'animal' | 'symptoms' | 'result';

const DiagnosisPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<DiagnosisStep>('animal');
  const [selectedAnimal, setSelectedAnimal] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const steps = [
    { id: 'animal', title: 'انتخاب حیوان', icon: '🐾' },
    { id: 'symptoms', title: 'علائم', icon: '📋' },
    { id: 'result', title: 'تشخیص', icon: '🔍' },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleNextStep = () => {
    if (currentStep === 'symptoms') {
      setIsAnalyzing(true);
      setCurrentStep('result');
      setTimeout(() => setIsAnalyzing(false), 3000);
    } else {
      const nextStep = steps[currentStepIndex + 1];
      if (nextStep) {
        setCurrentStep(nextStep.id as DiagnosisStep);
      }
    }
  };

  const handlePrevStep = () => {
    const prevStep = steps[currentStepIndex - 1];
    if (prevStep) {
      setCurrentStep(prevStep.id as DiagnosisStep);
    }
  };

  const handleStartOver = () => {
    setSelectedAnimal('');
    setSelectedSymptoms([]);
    setIsAnalyzing(false);
    setCurrentStep('animal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">تشخیص بیماری حیوانات</h1>
                <p className="text-blue-100">با پیشرفته‌ترین هوش مصنوعی دامپزشکی</p>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  onClick={handleStartOver}
                  className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all flex items-center space-x-2 space-x-reverse"
                >
                  <Home className="w-5 h-5" />
                  <span>شروع مجدد</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* نوار مراحل */}
            <div className="relative mb-12">
              <div className="absolute top-1/2 right-0 left-0 h-1 bg-gray-200 rounded-full -translate-y-1/2"></div>
              <div className="relative flex justify-between">
                {steps.map((step, index) => {
                  const isActive = step.id === currentStep;
                  const isCompleted = index < currentStepIndex;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold z-10 transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110 shadow-lg'
                            : isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isCompleted ? <Check className="w-6 h-6" /> : step.icon}
                      </div>
                      <div className={`mt-2 font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                        {step.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* محتوا */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="min-h-[400px]"
            >
              {currentStep === 'animal' && (
                <AnimalTypeSelector
                  selectedType={selectedAnimal}
                  onSelect={setSelectedAnimal}
                />
              )}

              {currentStep === 'symptoms' && (
                <SymptomSelector
                  selectedSymptoms={selectedSymptoms}
                  onSymptomsChange={setSelectedSymptoms}
                />
              )}

              {currentStep === 'result' && (
                <DiagnosisResult
                  disease="عفونت تنفسی فوقانی (URI)"
                  confidence={94}
                  description="یک عفونت ویروسی یا باکتریایی که سیستم تنفسی فوقانی را درگیر می‌کند"
                  urgency="medium"
                  isLoading={isAnalyzing}
                />
              )}
            </motion.div>

            {/* دکمه‌ها */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className={`px-6 py-3 rounded-xl flex items-center space-x-2 space-x-reverse ${
                  currentStepIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
                <span>مرحله قبل</span>
              </button>

              {currentStepIndex < steps.length - 1 ? (
                <button
                  onClick={handleNextStep}
                  disabled={
                    (currentStep === 'animal' && !selectedAnimal) ||
                    (currentStep === 'symptoms' && selectedSymptoms.length === 0)
                  }
                  className={`px-6 py-3 rounded-xl flex items-center space-x-2 space-x-reverse ${
                    (currentStep === 'animal' && !selectedAnimal) ||
                    (currentStep === 'symptoms' && selectedSymptoms.length === 0)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  }`}
                >
                  <span>مرحله بعد</span>
                  <ChevronLeft className="w-5 h-5" />
                </button>
              ) : (
                <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
                  مشاهده درمان
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisPage;