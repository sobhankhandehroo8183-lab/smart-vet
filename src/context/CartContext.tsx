import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DiagnosisItem {
  id: string;
  animalId: string;
  animalName: string;
  symptoms: string[];
  price: number;
  status: 'pending' | 'paid';
  createdAt: string;
}

interface CartContextType {
  pendingDiagnosis: DiagnosisItem | null;
  addToCart: (diagnosis: DiagnosisItem) => void;
  removeFromCart: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [pendingDiagnosis, setPendingDiagnosis] = useState<DiagnosisItem | null>(null);

  const addToCart = (diagnosis: DiagnosisItem) => {
    setPendingDiagnosis(diagnosis);
  };

  const removeFromCart = () => {
    setPendingDiagnosis(null);
  };

  const clearCart = () => {
    setPendingDiagnosis(null);
  };

  return (
    <CartContext.Provider
      value={{
        pendingDiagnosis,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};