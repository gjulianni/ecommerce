import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"; 
import styled from "styled-components";

export default function LoginComponent() {
  const { isAuthenticated, loading, setAuthenticated, logout } = useAuth(); 


  useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.log('Usuário não está autenticado');
    }
  }, [isAuthenticated, loading]); 

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

 
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();  

    if (!email || !password) {
      setErrorMessage('Por favor, preencha ambos os campos.');
      return;
    }

    try {
      // Fazendo a requisição para o backend
      const response = await fetch('http://localhost:3001/api/users/login', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',  
      });

      const data = await response.json();  

      if (response.ok && data.message === 'Logged in successfully') {
        alert('Login bem-sucedido!');
        setAuthenticated(true);  
      } else {
        setErrorMessage(data.error || 'Login falhou. Verifique suas credenciais.');
      }
    } catch (error) {
      setErrorMessage('Ocorreu um erro ao fazer login.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
    <WrapperSld>
      {isAuthenticated ? (
        <>
          <button id="logout-btn" onClick={logout}>Sair</button>
          <div style={{
            color: 'orange', fontFamily: 'Aldrich', fontSize: '2rem',
            position: 'absolute', left: '50%', transform: 'translateX(-50%)', letterSpacing: '3px'
          }}>
            <h2>Seja bem-vindo!</h2>
          </div>
        </>
      ) : (
       
        <FormSld onSubmit={handleLogin}>
          <InputSld
            type="email"
            name="email"
            placeholder="e-mail"
            className="emailinput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordContainerSld>
            <PassInputSld
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="senha"
              className="input-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PassContainerBtnSld
              className="toggle-password"
              onClick={togglePasswordVisibility}
              type="button"
            >
              {passwordVisible ? '🙈' : '👁️'}
            </PassContainerBtnSld>
          </PasswordContainerSld>
          <ButtonSld
          type="submit"
          disabled={!isFormValid}
          style={{
            backgroundColor: isFormValid ? 'white' : '#8d8d8d',
            color: isFormValid ? 'black' : '#bdbdbd',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
          }}
        >
          Entrar
        </ButtonSld>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
       
        </FormSld>
      )}
    </WrapperSld>
    </div>
    
  );
}



const WrapperSld = styled.div`
     width: 78.8%;
    background-color: rgb(30, 135, 255);
    height: 150px;
    display: flex;
    justify-content: flex-end;
    align-items: center;  
    border-radius: 8px;
    @media (max-width: 768px) {
        flex-direction: column;
        height: 190px;
        align-items: center;
        justify-content: center;
    }
`
const FormSld = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    @media (max-width: 768px) {
        flex-direction: column;
        
    }
`;

const InputSld = styled.input`
     background-color: #D9D9D9;
    border: none;
    height: 55px;
    width: 100%;
    max-width: 270px;
    margin-right: 40px;
    margin-left: 15px;
    font-size: 2rem;
    font-family: 'Hubballi', sans-serif;
    font-weight: bolder;
    text-align: center;
    outline: none;
    @media (max-width: 768px) {
      margin-bottom: 10px;
      height: 45px;
      margin-right: 0;
      
  }
   
`

const PassInputSld = styled.input`
     flex: 1; 
    background-color: #D9D9D9;
    border: none;
    height: 45px;
    max-width: 230px; /* Limita o tamanho inicial */
  width: 100%; /* Permite flexibilidade */
  font-size: 2rem;
  font-family: 'Hubballi', sans-serif;
  font-weight: bolder;
  text-align: center;
  outline: none;

  @media (max-width: 768px) {
      height: 45px;
      margin-left: 10px;
  
  }
`

const ButtonSld = styled.button`
padding: 12px 20px;
    background-color: #8d8d8d;
    border: none;
    color: white;
    font-family: 'Bolwby One SC', sans-serif;
    text-transform: uppercase;
    font-size: 1.2rem;
    margin-right: 40px;
    font-weight: 800;
    cursor: pointer;
    transition: .3s;

    &:hover {
        background-color: #183810;
    }
    @media (max-width: 768px) {
      margin-left: 15px;
      margin-top: 10px;
      height: 45px;

  }
`

const PassContainerBtnSld = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 25px; 
    

`

const PasswordContainerSld = styled.div`
    display: flex;
    align-items: center;
    background-color: #D9D9D9;
    margin-right: 40px;
    border: none;
    outline: none;
    @media (max-width: 768px) {
      margin-right: 0px;
      
      height: 45px;

  }
`
