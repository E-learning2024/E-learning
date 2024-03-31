import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthenticationService {
  public async comparePasswords(passwordBody: string, passwordBd: string): Promise<boolean> {
    try {
      return bcrypt.compare(passwordBody, passwordBd);
    } catch (error) {
      throw new Error(`Erro Interno: ${error}`);
    }
  }

  public async encryptPassword(senha: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(senha, salt);
    } catch (error) {
      throw new Error(`Erro ao criptografar a senha: ${error}`);
    }
  }
  public async generateToken(payload: any): Promise<string> {
    try {
      const secretKey = 'ISVALDO2024@minhaChaveSecreta@ISAAC';
      const token: string = jwt.sign(payload, secretKey, { expiresIn: '3h' });

      return token;
    } catch (error) {
      throw new Error(`Erro ao gerar o token: ${error}`);
    }
  }
  public async verifyToken(token: string): Promise<unknown> {
    try {
      const secretKey = '@minhaChaveSecreta@';
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      throw new Error(`Erro ao verificar o token: ${error}`);
    }
  }
}
