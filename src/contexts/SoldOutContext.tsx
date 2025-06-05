import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SoldOutContextType {
  soldOutProducts: number[];
  markProductAsSoldOut: (productId: number) => void;
  isProductSoldOut: (productId: number) => boolean;
}

export const SoldOutContext = createContext<SoldOutContextType>({
  soldOutProducts: [],
  markProductAsSoldOut: () => {},
  isProductSoldOut: () => false
});

export const useSoldOut = () => {
  const context = useContext(SoldOutContext);
  if (!context) {
    throw new Error('useSoldOut must be used within a SoldOutProvider');
  }
  return context;
};

export const SoldOutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [soldOutProducts, setSoldOutProducts] = useState<number[]>([]);

  const markProductAsSoldOut = (productId: number) => {
    setSoldOutProducts(prev => 
      prev.includes(productId) ? prev : [...prev, productId]
    );
  };

  const isProductSoldOut = (productId: number) => {
    return soldOutProducts.includes(productId);
  };

  return (
    <SoldOutContext.Provider value={{
      soldOutProducts,
      markProductAsSoldOut,
      isProductSoldOut
    }}>
      {children}
    </SoldOutContext.Provider>
  );
};