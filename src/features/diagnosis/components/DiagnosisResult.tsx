import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaClock, FaHeart } from 'react-icons/fa';

interface DiagnosisResultProps {
  disease: string;
  confidence: number;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  isLoading?: boolean;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  disease,
  confidence,
  description,
  urgency,
  isLoading = false
}) => {
  const urgencyConfig = {
    low: { color: 'bg-green-500', text: 'کم', icon: FaCheckCircle },
    medium: { color: 'bg-yellow-500', text: 'متوسط', icon: FaClock },
    high: { color: 'bg-orange-500', text: 'بالا', icon: FaExclamationTriangle },
    emergency: { color: 'bg-red-500', text: 'اضطراری', icon: FaExclamationTriangle },
  };

  const UrgencyIcon = urgencyConfig[urgency].icon;

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-gray-600">در حال تحلیل علائم با هوش مصنوعی...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">نتیجه تشخیص</h3>
          <p className="text-gray-600">تحلیل علائم با هوش مصنوعی</p>
        </div>
        <div className={`px-4 py-2 rounded-full text-white font-medium flex items-center space-x-2 space-x-reverse ${urgencyConfig[urgency].color}`}>
          <UrgencyIcon className="w-5 h-5" />
          <span>وضعیت: {urgencyConfig[urgency].text}</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">{disease}</h4>
            <p className="text-gray-600">{description}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-1">{confidence}%</div>
            <div className="text-sm text-gray-500">دقت تشخیص</div>
          </div>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6">
        <div className="flex items-start space-x-4 space-x-reverse">
          <FaExclamationTriangle className="w-8 h-8 text-orange-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-orange-800 mb-2">توجه مهم</h4>
            <p className="text-orange-700">
              این تشخیص توسط هوش مصنوعی انجام شده و جایگزین نظر دامپزشک نمی‌باشد.
              برای درمان قطعی حتما به دامپزشک مراجعه کنید.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiagnosisResult;