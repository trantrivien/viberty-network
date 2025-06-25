import { Request, Response } from "express";
import { createAuth, type VerifyLoginPayloadParams } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { thirdwebClient } from "../thirdwebClient";
require('dotenv').config();

export const thirdwebAuth = createAuth({
  domain: process.env.CLIENT_DOMAIN!,
  client: thirdwebClient,
  adminAccount: privateKeyToAccount({
    client: thirdwebClient,
    privateKey: process.env.ADMIN_PRIVATE_KEY!,
  }),
});

export const authController = {
  root: (req: Request, res: Response) => {
    return res.send("Auth server is live");
  },

  getLoginPayload: async (req: Request, res: Response) => {
    const { address, chainId } = req.query;
    console.log("===============================")
    console.log(req)
    console.log("===============================")

    console.log(address, chainId)
    if (typeof address !== "string") {
      return res.status(400).send("Address is required");
    }

    const payload = await thirdwebAuth.generatePayload({
      address,
      chainId: chainId ? parseInt(chainId as string) : undefined,
    });
    
    return res.send(payload);
  },

  verifyLogin: async (req: Request, res: Response) => {
    const payload: VerifyLoginPayloadParams = req.body;

    const verifiedPayload = await thirdwebAuth.verifyPayload(payload);

    if (!verifiedPayload.valid) {
      return res.status(400).send("Failed to login");
    }

    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    });

    res.cookie("jwt", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).send({ token: jwt });
  },

  isLoggedIn: async (req: Request, res: Response) => {
    const jwt = req.cookies?.jwt;
    if (!jwt) return res.send(false);

    const result = await thirdwebAuth.verifyJWT({ jwt });

    return res.send(result.valid);
  },

  logout: (req: Request, res: Response) => {
    res.clearCookie("jwt");
    return res.send(true);
  },
};
