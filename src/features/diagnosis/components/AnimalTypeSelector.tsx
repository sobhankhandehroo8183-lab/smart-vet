import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { animalTypes } from '../utils/symptomsData';

interface AnimalTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const AnimalTypeSelector: React.FC<AnimalTypeSelectorProps> = ({ selectedType, onSelect }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">نوع حیوان</h3>
        <p className="text-gray-600 mb-6">لطفا نوع حیوان خود را انتخاب کنید</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {animalTypes.map((animal, index) => (
          <motion.button
            key={animal.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => onSelect(animal.id)}
            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
              selectedType === animal.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="text-4xl mb-3">{animal.icon}</div>
            <div className="font-medium text-gray-800">{animal.name}</div>
            {selectedType === animal.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default AnimalTypeSelector;