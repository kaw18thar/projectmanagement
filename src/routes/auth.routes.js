import { Router } from "express";
import {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  login,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgotPassword,
  verifyEmail,
} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const authRouter = Router();
//unsecured routes
authRouter
  .route("/register")
  .post(userRegisterValidator(), validate, registerUser);
authRouter.route("/login").post(userLoginValidator(), validate, login);
authRouter.route("/verify-email/:verificationToken").get(verifyEmail);
authRouter.route("/refresh-token/").post(refreshAccessToken);
authRouter
  .route("/forgot-password/")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
authRouter
  .route("/reset-password/:resetToken")
  .post(userForgotPasswordValidator(), validate, resetForgotPassword);
//secure routes
authRouter.route("/logout").post(verifyJWT, logoutUser);
authRouter.route("/current-user").post(verifyJWT, getCurrentUser);
authRouter
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword,
  );
authRouter
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);
export default authRouter;
