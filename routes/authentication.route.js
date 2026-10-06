const express = require("express");
const {registerUser, loginUser, allUsers, forgotPassword, verifyUser, updateUserPassword} = require("../controllers/authentication.controller");

const authenticateRouter = express.Router();


authenticateRouter.post("/register", registerUser)
authenticateRouter.post("/login", loginUser)
authenticateRouter.get("/all-users", allUsers)
authenticateRouter.post("/forgot-password", forgotPassword)  
authenticateRouter.post("/verify-mail", verifyUser)
authenticateRouter.patch("/update-password", updateUserPassword)
 
module.exports = authenticateRouter 