import { NextFunction, Request, Response } from "express";
import { type VerifyLoginPayloadParams } from "thirdweb/auth";
import { thirdwebAuth } from "../controllers/authWeb3Controller";
require('dotenv').config();



export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload: VerifyLoginPayloadParams = req.body;

  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);

  if (verifiedPayload.valid) {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    });
    res.cookie("jwt", jwt);
    return res.status(200).send({ token: jwt });
  }

  res.status(400).send("Failed to login");
  next();
};
