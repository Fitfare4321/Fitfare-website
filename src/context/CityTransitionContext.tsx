import React, { createContext, useContext, useState, useCallback } from "react";
import CityTransitionGallery, { GalleryCityData } from "@/components/CityTransitionGallery";

interface CityTransitionContextType {
  activeTransitionCity: GalleryCityData | null;
  startTransition: (city: GalleryCityData) => void;
  closeTransition: () => void;
}

const CityTransitionContext = createContext<CityTransitionContextType | undefined>(undefined);

export const CityTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTransitionCity, setActiveTransitionCity] = useState<GalleryCityData | null>(null);

  const startTransition = useCallback((city: GalleryCityData) => {
    setActiveTransitionCity(city);
  }, []);

  const closeTransition = useCallback(() => {
    setActiveTransitionCity(null);
  }, []);

  return (
    <CityTransitionContext.Provider
      value={{
        activeTransitionCity,
        startTransition,
        closeTransition,
      }}
    >
      {children}
      {activeTransitionCity && (
        <CityTransitionGallery
          city={activeTransitionCity}
          isOpen={!!activeTransitionCity}
          onClose={closeTransition}
        />
      )}
    </CityTransitionContext.Provider>
  );
};

export const useCityTransition = () => {
  const context = useContext(CityTransitionContext);
  if (!context) {
    throw new Error("useCityTransition must be used within a CityTransitionProvider");
  }
  return context;
};

export default CityTransitionContext;
