import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDog, FaCat, FaEllipsisV, FaHeartbeat, FaHeart, FaExclamationTriangle, FaCheckCircle, FaCalendarAlt, FaPhone, FaEdit, FaTrash, FaUser, FaWeightHanging } from 'react-icons/fa';
import type { Animal } from '../types/animal';

interface AnimalCardProps {
  animal: Animal;
  onEdit: (animal: Animal) => void;
  onDelete: (id: string) => void;
  onViewDetails: (animal: Animal) => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onEdit, onDelete, onViewDetails }) => {
  const [showActions, setShowActions] = useState(false);

  const getAnimalIcon = () => {
    switch (animal.type) {
      case 'dog': return <FaDog className="w-6 h-6" />;
      case 'cat': return <FaCat className="w-6 h-6" />;
      default: return <FaDog className="w-6 h-6" />;
    }
  };

  const getStatusConfig = () => {
    switch (animal.status) {
      case 'healthy':
        return { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, label: 'سالم' };
      case 'sick':
        return { color: 'bg-yellow-100 text-yellow-800', icon: FaHeartbeat, label: 'بیمار' };
      case 'recovering':
        return { color: 'bg-blue-100 text-blue-800', icon: FaHeart, label: 'در حال بهبود' };
      case 'critical':
        return { color: 'bg-red-100 text-red-800', icon: FaExclamationTriangle, label: 'بحرانی' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: FaHeartbeat, label: 'نامشخص' };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
              {getAnimalIcon()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{animal.name}</h3>
              <p className="text-gray-600">{animal.breed}</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <FaEllipsisV className="w-5 h-5 text-gray-400" />
            </button>
            {showActions && (
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border z-50">
                <button
                  onClick={() => onViewDetails(animal)}
                  className="w-full text-right px-4 py-2 hover:bg-gray-50 text-sm"
                >
                  جزئیات
                </button>
                <button
                  onClick={() => onEdit(animal)}
                  className="w-full text-right px-4 py-2 hover:bg-gray-50 text-sm"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => onDelete(animal.id)}
                  className="w-full text-right px-4 py-2 hover:bg-red-50 text-red-600 text-sm"
                >
                  حذف
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusConfig.color}`}>
            <StatusIcon className="w-4 h-4 ml-1" />
            {statusConfig.label}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="w-4 h-4 ml-2" />
            {animal.age} سال
          </div>
          <div className="flex items-center text-gray-600">
            <FaWeightHanging className="w-4 h-4 ml-2" />
            {animal.weight} کیلوگرم
          </div>
          <div className="flex items-center text-gray-600">
            <FaUser className="w-4 h-4 ml-2" />
            {animal.ownerName}
          </div>
          <div className="flex items-center text-gray-600">
            <FaPhone className="w-4 h-4 ml-2" />
            {animal.ownerPhone}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl text-sm">
          <span className="text-gray-500">آخرین ویزیت:</span>
          <span className="font-medium mr-2">{animal.lastCheckup}</span>
        </div>
      </div>

      <div className="border-t p-4 bg-gray-50 flex justify-between">
        <button
          onClick={() => onEdit(animal)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaEdit className="w-4 h-4 ml-1" />
          ویرایش
        </button>
        <button
          onClick={() => onDelete(animal.id)}
          className="flex items-center text-red-600 hover:text-red-800"
        >
          <FaTrash className="w-4 h-4 ml-1" />
          حذف
        </button>
      </div>
    </motion.div>
  );
};

export default AnimalCard;