import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Dog, Cat, Rabbit, Bird, Plus, Save, User, Phone, AlertCircle, Calendar, Scale } from 'lucide-react';
import type { Animal } from '../types/animal';

interface AnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (animal: Partial<Animal>) => void;
  animal?: Animal | null;
  mode: 'add' | 'edit';
}

const AnimalModal: React.FC<AnimalModalProps> = ({ isOpen, onClose, onSave, animal, mode }) => {
  const [formData, setFormData] = useState<Partial<Animal>>(
    animal || {
      name: '',
      type: 'dog',
      breed: '',
      age: 1,
      weight: 1,
      gender: 'male',
      status: 'healthy',
      ownerName: '',
      ownerPhone: '',
      color: '',
      microchip: '',
      lastCheckup: new Date().toLocaleDateString('fa-IR')
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const animalTypes = [
    { value: 'dog', label: 'سگ', icon: Dog },
    { value: 'cat', label: 'گربه', icon: Cat },
    { value: 'rabbit', label: 'خرگوش', icon: Rabbit },
    { value: 'bird', label: 'پرنده', icon: Bird },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {mode === 'add' ? 'افزودن حیوان جدید' : 'ویرایش اطلاعات حیوان'}
                    </h2>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نام حیوان *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نوع حیوان *</label>
                      <div className="grid grid-cols-4 gap-3">
                        {animalTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, type: type.value as any }))}
                              className={`p-4 rounded-xl border-2 flex flex-col items-center ${
                                formData.type === type.value
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200'
                              }`}
                            >
                              <Icon className={`w-6 h-6 mb-2 ${formData.type === type.value ? 'text-blue-600' : 'text-gray-400'}`} />
                              <span className="text-sm">{type.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">نژاد</label>
                        <input
                          type="text"
                          name="breed"
                          value={formData.breed}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">سن (سال)</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">وزن (کیلوگرم)</label>
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          step="0.1"
                          className="w-full px-4 py-3 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">جنسیت</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border rounded-xl"
                        >
                          <option value="male">نر</option>
                          <option value="female">ماده</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">وضعیت سلامت</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-xl"
                      >
                        <option value="healthy">سالم</option>
                        <option value="sick">بیمار</option>
                        <option value="recovering">در حال بهبود</option>
                        <option value="critical">بحرانی</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">نام مالک</label>
                        <input
                          type="text"
                          name="ownerName"
                          value={formData.ownerName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                        <input
                          type="tel"
                          name="ownerPhone"
                          value={formData.ownerPhone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="flex items-start space-x-3 space-x-reverse">
                        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                        <p className="text-orange-700 text-sm">اطلاعات وارد شده صحیح بوده و مسئولیت آن بر عهده شماست</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <button type="button" onClick={onClose} className="px-6 py-3 border rounded-xl hover:bg-gray-50">
                      انصراف
                    </button>
                    <button type="submit" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700">
                      {mode === 'add' ? 'افزودن حیوان' : 'ذخیره تغییرات'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnimalModal;