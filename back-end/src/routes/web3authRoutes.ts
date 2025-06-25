import { Router } from "express";
import { authController, thirdwebAuth } from "../controllers/authWeb3Controller";
import { authenticateJWT } from "../middleware/authWeb3Middleware";
import { VerifyLoginPayloadParams } from "thirdweb/auth";


const router = Router();

router.get("/", authController.root);
// router.get("/login-get-payload", authController.getLoginPayload);   // ?address=...&chainId=...
// router.post("/login", authController.verifyLogin);
// router.get("/isLoggedIn", authController.isLoggedIn);
// router.post("/logout", authController.logout);

router.get("/login", async (req, res) => {
  const address = req.query.address ?? '';
  const chainId = req.query.chainId;
 
  if (!address) {
    return res.status(400).send("Address is required");
  }
  if (typeof address !== "string") {
    return res.status(400).send("Address is required");
  }
  return res.send(
    await thirdwebAuth.generatePayload({
      address,
      chainId: chainId ? parseInt(`${chainId}`) : undefined,
    }),
  );
});

router.post("/login", async (req, res) => {
  const payload: VerifyLoginPayloadParams = req.body;

  console.log("===============================")
  console.log(payload)
  console.log("===============================")
 
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
 
  if (verifiedPayload.valid) {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    });
    res.cookie("jwt", jwt);
    return res.status(200).send({ token: jwt });
  }
 
  res.status(400).send("Failed to login");
});



router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  return res.send(true);
});


router.get("/isLoggedIn", async (req, res) => {
  const jwt = req.cookies?.jwt;
 
  if (!jwt) {
    return res.send(false);
  }
 
  const authResult = await thirdwebAuth.verifyJWT({ jwt });
 
  if (!authResult.valid) {
    return res.send(false);
  }
 
  return res.send(true);
});

export default router;