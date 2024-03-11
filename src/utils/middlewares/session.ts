import  { Request, Response, NextFunction } from 'express';
import { AuthenticationService } from '../authentication/authentication';

interface AuthenticatedRequest extends Request {
    user?: unknown;
}
interface User {
  accessLevelId: unknown;
  // outras propriedades do usuário, se houver
}

const authService = new AuthenticationService();

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  try {
      const decoded = await authService.verifyToken(token);
      req.user = decoded;
      next();
  } catch (error) {
      return res.status(403).json({ message: 'Token inválido' });
  }
}
export const checkAdminRole = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const user = req.user as User;

  if (user && user.accessLevelId === 1) {
      next();
  } else {
      return res.status(403).json({ message: 'Acesso negado. Permissão de administrador necessária' });
  }
};
