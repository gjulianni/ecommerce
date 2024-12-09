import { Router, Request, Response } from 'express';
import { register, login, getProfile, logout } from '../controllers/userController';
import { verifyTokenMiddleware } from '../middlewares/auth';

const router = Router();

// Rota de registro de usuário
router.post('/register', async (req: Request, res: Response) => {
  await register(req, res);
});

// Rota de login
router.post('/login', async (req: Request, res: Response) => {
  await login(req, res);
});

router.get('/auth/status', verifyTokenMiddleware, (req, res) => {
  const user = (req as any).user; // Dados do usuário decodificados do token
  res.json({ isAuthenticated: true, user });
});

router.post('/logout', async (req: Request, res: Response) => {
  await logout(req, res);
});

// Rota protegida - perfil
router.get('/profile', async (req: Request, res: Response) => {
  await getProfile(req, res);
});

export default router;