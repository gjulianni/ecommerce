import React, { useState } from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import LoginForm from '../components/auth/LoginForm';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div>
      <h1>Teste</h1>
      <div>
        <button onClick={() => setIsLogin(true)}>Login</button>
        <button onClick={() => setIsLogin(false)}>Register</button>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default Auth;