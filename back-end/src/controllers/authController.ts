import { Request, Response, NextFunction } from "express";
import { Pool } from "mysql2/promise";
import { AuthService } from "../services/authService";
import { sendResponse } from "../utils/response";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { wallet_address, username, referral_code, referred_by } = req.body;
      const result = await this.authService.register(
        { wallet_address, username, referral_code, referred_by },
        req.app.get("dbPool")
      );
      sendResponse(res, 201, result, "User registered successfully");
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { wallet_address } = req.body;
      const result = await this.authService.login(
        wallet_address,
        req.app.get("dbPool")
      );
      sendResponse(res, 200, result, "Login successful");
    } catch (error) {
      next(error);
    }
  };

  connect = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { wallet_address, chain_id, referred_by } = req.body;
      const result = await this.authService.connect(
        wallet_address,
        chain_id,
        req.app.get("dbPool"),
        referred_by ?? '',
      );
      sendResponse(res, 200, result, "User connected");
    } catch (error) {
      console.log(error)
      next(error);
    }
  };
}
