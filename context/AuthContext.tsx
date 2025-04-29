import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'customer' | 'farmer';
}

interface AuthContextProps {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string, userType: 'customer' | 'farmer') => Promise<boolean>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signIn: async () => false,
  signUp: async () => false,
  signOut: () => {},
  isAuthenticated: false,
});

// Mock users data store
let USERS: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    userType: 'customer'
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signUp = async (name: string, email: string, password: string, userType: 'customer' | 'farmer'): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: `user${USERS.length + 1}`,
      name,
      email,
      userType
    };

    USERS.push(newUser);
    setUser(newUser);
    return true;
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);