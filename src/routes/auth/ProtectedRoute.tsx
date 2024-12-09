import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; 
  }

  console.log('Status de autenticação:', isAuthenticated);
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;