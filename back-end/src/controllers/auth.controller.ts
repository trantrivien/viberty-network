import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    await authService.registerAdmin(username, email, password);
    res.status(201).json({ message: 'Admin registered' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await authService.loginAdmin(username, password);
    const { accessToken, refreshToken } = await authService.generateTokens(user);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ error: (err as Error).message });
  }
};

export const walletLogin = async (req: Request, res: Response) => {
  try {
    const { wallet_address } = req.body;
    const user = await authService.walletLogin(wallet_address);
    const { accessToken, refreshToken } = await authService.generateTokens(user);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token' });

    const user = await authService.verifyRefreshToken(token);
    const { accessToken, refreshToken } = await authService.generateTokens(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ error: (err as Error).message });
  }
};

