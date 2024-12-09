import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'oU@*avJDbf&*28DLxa023k*¨jk(2dA!2lVo4*6VXs2z1'; 

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth_token; // Nome do cookie com o token

  if (!token) {
    return res.status(401).json({ isAuthenticated: false, message: 'Usuário não autenticado' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ isAuthenticated: false, message: 'Token inválido ou expirado' });
  }
};