import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Grid, List, Users, Activity, Heart, AlertTriangle } from 'lucide-react';
import AnimalCard from '../features/animals/components/AnimalCard';
import AnimalModal from '../features/animals/components/AnimalModal';
import { animalsData, animalStats } from '../features/animals/utils/animalsData';
import type { Animal } from '../features/animals/types/animal';

const AnimalsPage: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>(animalsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const filteredAnimals = animals.filter(animal =>
    animal.name.includes(searchTerm) || animal.breed.includes(searchTerm)
  );

  const handleAddAnimal = () => {
    setModalMode('add');
    setSelectedAnimal(null);
    setIsModalOpen(true);
  };

  const handleEditAnimal = (animal: Animal) => {
    setModalMode('edit');
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  };

  const handleDeleteAnimal = (id: string) => {
    if (confirm('آیا از حذف این حیوان مطمئن هستید؟')) {
      setAnimals(prev => prev.filter(animal => animal.id !== id));
    }
  };

  const handleSaveAnimal = (animalData: Partial<Animal>) => {
    if (modalMode === 'add') {
      const newAnimal = {
        ...animalData as Animal,
        id: Date.now().toString(),
        lastCheckup: new Date().toLocaleDateString('fa-IR')
      };
      setAnimals(prev => [...prev, newAnimal]);
    } else if (selectedAnimal) {
      setAnimals(prev => prev.map(animal =>
        animal.id === selectedAnimal.id ? { ...animal, ...animalData } : animal
      ));
    }
  };

  const statsCards = [
    { title: 'کل حیوانات', value: animalStats.total, icon: Users, color: 'bg-blue-500' },
    { title: 'سالم', value: animalStats.healthy, icon: Heart, color: 'bg-green-500' },
    { title: 'بیمار', value: animalStats.sick, icon: Activity, color: 'bg-yellow-500' },
    { title: 'بحرانی', value: animalStats.critical, icon: AlertTriangle, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">مدیریت حیوانات</h1>
          <p className="text-gray-600 mt-2">مدیریت کامل اطلاعات حیوانات خانگی شما</p>
        </div>
        <button
          onClick={handleAddAnimal}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 shadow-lg flex items-center space-x-2 space-x-reverse"
        >
          <Plus className="w-5 h-5" />
          <span>افزودن حیوان جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو بر اساس نام یا نژاد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
          {filteredAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onEdit={handleEditAnimal}
              onDelete={handleDeleteAnimal}
              onViewDetails={(a) => alert(`جزئیات ${a.name}`)}
            />
          ))}
        </div>

        {filteredAnimals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">حیوانی یافت نشد</p>
          </div>
        )}
      </div>

      <AnimalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAnimal}
        animal={selectedAnimal}
        mode={modalMode}
      />
    </div>
  );
};

export default AnimalsPage;