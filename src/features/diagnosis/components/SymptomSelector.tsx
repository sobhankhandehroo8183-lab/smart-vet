import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { symptomsData } from '../utils/symptomsData';

interface SymptomSelectorProps {
  selectedSymptoms: string[];
  onSymptomsChange: (symptoms: string[]) => void;
}

const SymptomSelector: React.FC<SymptomSelectorProps> = ({ selectedSymptoms, onSymptomsChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSymptoms = symptomsData.filter(symptom =>
    symptom.name.includes(searchTerm)
  );

  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      onSymptomsChange(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      onSymptomsChange([...selectedSymptoms, symptomId]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">علائم مشاهده شده</h3>
        <p className="text-gray-600 mb-6">علائم حیوان خود را انتخاب کنید</p>
      </div>

      <div className="relative">
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="جستجو در علائم..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSymptoms.map((symptom, index) => (
          <motion.button
            key={symptom.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            onClick={() => toggleSymptom(symptom.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-right ${
              selectedSymptoms.includes(symptom.id)
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{symptom.icon}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedSymptoms.includes(symptom.id)
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedSymptoms.includes(symptom.id) && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
            <div className="font-medium text-gray-800">{symptom.name}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SymptomSelector;