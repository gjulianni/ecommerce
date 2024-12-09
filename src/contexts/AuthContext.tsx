import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
  loading: boolean; // Novo estado de carregamento
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/auth/status', {
        method: 'GET',
        credentials: 'include', // Inclui os cookies na requisição
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Marca como carregado quando a verificação for feita
    }
  };

  const setAuthenticated = (authStatus: boolean) => {
    setIsAuthenticated(authStatus);
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/logout', {
        method: 'POST',
        credentials: 'include', // Inclui os cookies
      });

      if (response.ok) {
        setAuthenticated(false);
      } else {
        console.error('Erro ao fazer logout:', await response.text());
      }
    } catch (error) {
      console.error('Erro ao se conectar durante o logout:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus(); // Verifica a autenticação ao carregar
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};