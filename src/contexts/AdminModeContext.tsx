"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser } from "aws-amplify/auth";

interface AdminModeContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  toggleEditMode: () => void;
  isLoading: boolean;
}

const AdminModeContext = createContext<AdminModeContextType>({
  isAdmin: false,
  isEditMode: false,
  toggleEditMode: () => {},
  isLoading: true,
});

export function AdminModeProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setIsAdmin(!!user);
        // Check localStorage for edit mode preference
        const savedEditMode = localStorage.getItem("adminEditMode");
        if (savedEditMode === "true" && !!user) {
          setIsEditMode(true);
        }
      } catch {
        setIsAdmin(false);
        setIsEditMode(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const toggleEditMode = () => {
    const newValue = !isEditMode;
    setIsEditMode(newValue);
    localStorage.setItem("adminEditMode", String(newValue));
  };

  return (
    <AdminModeContext.Provider value={{ isAdmin, isEditMode, toggleEditMode, isLoading }}>
      {children}
    </AdminModeContext.Provider>
  );
}

export function useAdminMode() {
  return useContext(AdminModeContext);
}
