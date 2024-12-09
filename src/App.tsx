import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import Teste from './pages/Teste';
import ProtectedRoute from './routes/auth/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Nav from './components/nav/Nav';
import Index from './pages/Index';

function App() {
 

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/home' element={ <Index />} />
          <Route
              path="/login"
              element={
                
                  <LoginForm />
              }
            />
            <Route
              path="/register"
              element={
                  <RegisterForm />
              }
            />
            <Route
              path="/test"
              element={
                  <ProtectedRoute>
                  <Teste />
                  </ProtectedRoute>
              }
            />
            <Route
              path="/addproduct"
              element={
                  <ProtectedRoute>
                  <Home />
                  </ProtectedRoute>
              }
            />
             <Route path='*' element={ <Index />} />
           
        </Routes>
      </Router>
      </AuthProvider>
  )
}

export default App
