import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerUser, findUserByEmail, User } from '../models/userModel';

const JWT_SECRET = 'oU@*avJDbf&*28DLxa023k*¨jk(2dA!2lVo4*6VXs2z1';

// Rota de registro de usuário
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = await registerUser(name, email, hashedPassword);
    
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      user_type_id: newUser.user_type_id, 
    });
  } catch (error) {
    console.error(error); // Log do erro para depuração
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Rota de login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS em produção
      sameSite: 'strict',
      maxAge: 3600000, // 1 hora
    });

    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict',
  });

  res.status(200).json({ message: 'Logout sucessful' })
}

// Rota protegida (exemplo de acesso com token)
export const getProfile = async (req: Request, res: Response) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({ message: 'Welcome to your profile', userId: decoded.userId });
  });
};