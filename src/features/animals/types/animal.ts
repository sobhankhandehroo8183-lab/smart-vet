export interface Animal {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed: string;
  age: number;
  weight: number;
  gender: 'male' | 'female';
  status: 'healthy' | 'sick' | 'recovering' | 'critical';
  lastCheckup: string;
  nextCheckup?: string;
  ownerName: string;
  ownerPhone: string;
  color?: string;
  microchip?: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  veterinarian: string;
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'missed';
}