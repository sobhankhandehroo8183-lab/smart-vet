const API_URL = 'http://localhost:5000';

// دریافت حیوانات کاربر
export const getUserAnimals = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/animals?userId=${userId}`);
    const animals = await response.json();
    return { success: true, animals };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// دریافت یک حیوان
export const getAnimalById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/animals/${id}`);
    const animal = await response.json();
    return { success: true, animal };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// افزودن حیوان جدید
export const addAnimal = async (animalData: any) => {
  try {
    const newAnimal = {
      id: Date.now().toString(),
      ...animalData,
      medicalHistory: [],
      createdAt: new Date().toISOString()
    };

    const response = await fetch(`${API_URL}/animals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAnimal)
    });

    const animal = await response.json();
    return { success: true, animal };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ویرایش حیوان
export const updateAnimal = async (id: string, animalData: any) => {
  try {
    const response = await fetch(`${API_URL}/animals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(animalData)
    });

    const animal = await response.json();
    return { success: true, animal };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// حذف حیوان
export const deleteAnimal = async (id: string) => {
  try {
    await fetch(`${API_URL}/animals/${id}`, {
      method: 'DELETE'
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};