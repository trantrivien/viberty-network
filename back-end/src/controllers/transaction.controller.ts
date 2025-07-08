import { Request, Response } from "express";
import * as txService from "../services/transaction.service";

export const getUserTransactions = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.userId;
    const data = await txService.getUserTransactions(userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string | undefined;

    const { transactions, total } = await txService.getAllTransactions(
      page,
      limit,
      search
    );

    res.json({
      data: transactions,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const transfer = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const fromUserId = req.user.userId;
    const { to_wallet_address, amount } = req.body;
    await txService.transfer(fromUserId, to_wallet_address, amount);
    res.json({ message: "Transfer successful" });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const adminTopupOrWithdraw = async (req: Request, res: Response) => {
  try {
    const { user_id, amount, type, description } = req.body;
    await txService.adminTopupOrWithdraw(user_id, amount, type, description);
    res.json({ message: "Transaction completed" });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const searchByWallet = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.query;
    if (!wallet)
      return res.status(400).json({ error: "Missing wallet address" });

    const data = await txService.searchTransactionsByWallet(wallet as string);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
