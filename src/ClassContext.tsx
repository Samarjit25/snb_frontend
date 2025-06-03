import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ClassItem = {
  subject: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  notes: string;
};

type ClassContextType = {
  classList: ClassItem[];
  addClass: (cls: ClassItem) => void;
  removeClass: (cls: ClassItem) => void;
};

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const useClassContext = () => {
  const context = useContext(ClassContext);
  if (!context) throw new Error('useClassContext must be used within ClassProvider');
  return context;
};

export const ClassProvider = ({ children }: { children: ReactNode }) => {
  const [classList, setClassList] = useState<ClassItem[]>([]);


  useEffect(() => {
    const stored = localStorage.getItem('classList');
    if (stored) {
      setClassList(JSON.parse(stored));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('classList', JSON.stringify(classList));
  }, [classList]);

  const addClass = (cls: ClassItem) => {
    setClassList(prev => [...prev, cls]);
  };

  const removeClass = (cls: ClassItem) => {
    setClassList(prev =>
      prev.filter(c =>
        !(
          c.subject === cls.subject &&
          c.day === cls.day &&
          c.startTime === cls.startTime &&
          c.endTime === cls.endTime
        )
      )
    );
  };

  return (
    <ClassContext.Provider value={{ classList, addClass, removeClass }}>
      {children}
    </ClassContext.Provider>
  );
};
