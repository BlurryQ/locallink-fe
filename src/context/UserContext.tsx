import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserType } from '../types/UserType';

const noUser: UserType = { id: '', email: '' };

type UserContextType = {
  user: UserType;
  login: (userData: UserType) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Load user data from localStorage on initial render
  const [user, setUser] = useState<UserType>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : noUser;
  });

  const login = (userData: UserType) => {
    setUser(userData);
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(noUser);
    // Clear localStorage on logout
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
