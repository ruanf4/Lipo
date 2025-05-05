import React, { createContext, useContext, useState } from "react";

type PackageOption = "10 meses: 6x de 130R$" | "5 meses: 6x de 130R$";

interface UserData {
  weight: string;
  age: string;
  height: string;
  email: string;
  name: string;
  gender: "masculino" | "feminino" | "";
  cpf: string;
  phone: string;
  city: string;
  zipCode: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  state: string;
  selectedPackage: PackageOption | null;
  installments: string;
  dueDate: string;
}

interface QuizContextType {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  progress: number;
}

const defaultUserData: UserData = {
  weight: "",
  age: "",
  height: "",
  email: "",
  name: "",
  gender: "",
  cpf: "",
  phone: "",
  city: "",
  zipCode: "",
  address: "",
  number: "",
  complement: "",
  neighborhood: "",
  state: "",
  selectedPackage: null,
  installments: "6x",
  dueDate: "1",
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  // Calculate progress based on current page (8 pages total)
  const progress = (currentPage / 8) * 100;

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  return (
    <QuizContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        userData,
        updateUserData,
        progress,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
