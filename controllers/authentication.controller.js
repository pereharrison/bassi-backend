const Authenticate = require("../model/authentication.model");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const {
  sendLoginEmailNoti,
  sendOtpEmail,
  sendForgotPasswordEmail,
} = require("./emailService");
const Otp = require("../model/otp.model");
// const jwt = require("jsonwebtoken");

dotenv.config();

const registerUser = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const checkForUser = await Authenticate.findOne({ email }).lean();
    if (checkForUser) {
      return res.status(400).json({
        success: false,
        message: "User with email already exists!",
      });
    }

    if (password === !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = await Authenticate.create({
      fullName,
      email,
      password: hashPassword,
    });

    if (!createUser) {
      return res.status(400).json({
        success: false,
        message: "Failed to create account!",
      });
    }

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const authenticateUser = await Authenticate.findOne({ email }).lean();

    if (!authenticateUser) {
      return res.status(404).json({
        success: false,
        message: "User with credentials couldn't be found!",
      });
    }

    const convertHashedPassword = await bcrypt.compare(
      password,
      authenticateUser.password,
    );

    if (!convertHashedPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match!",
      });
    }

    // Send login notification email
    await sendLoginEmailNoti(authenticateUser.email, authenticateUser.fullName);

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save/update OTP
    await Otp.findOneAndUpdate(
      { email: authenticateUser.email },
      { otp: otpCode },
      {
        upsert: true,
        returnDocument: "after",
      },
    );

    // Send OTP email
    await sendOtpEmail(authenticateUser.email, otpCode);

    return res.status(200).json({
      success: true,
      message: `Welcome ${authenticateUser.fullName}`,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required!",
    });
  }

  try {
    const findEmail = await Authenticate.findOne({ email }).lean();
    if (!findEmail) {
      return res.status(404).json({
        success: false,
        message: "Account with this email doesn't exist!",
      });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save/update OTP
    await Otp.findOneAndUpdate(
      { email: findEmail.email },
      { otp: otpCode },
      {
        upsert: true,
        returnDocument: "after",
      },
    );

    // Send OTP email
    await sendForgotPasswordEmail(findEmail.email, otpCode);
    res.status(200).json({
      success: true,
      message: "Email has been sent!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const allUsers = async (req, res) => {
  try {
    const checkDB = await Authenticate.find({});
    if (!checkDB) {
      return res.status(400).json({
        success: false,
        message: "An error occured",
      });
    }

    res.status(200).json({
      success: true,
      data: checkDB,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyUser = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "OTP is required!",
    });
  }

  try {
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired or does not exist!",
      });
    }

    console.log("OTP from user:", otp);
    console.log("OTP from database:", otpRecord.otp);

    if (String(otp).trim() !== String(otpRecord.otp).trim()) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP!",
      });
    }

    sendLoginEmailNoti(otpRecord.email, otpRecord.fullName);

    // OTP is correct
    await Otp.deleteOne({ email });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully!",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required!",
    });
  }

  try { 
    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    const updatePassword = await Authenticate.findOneAndUpdate(
      { email },
      { password: hashNewPassword },
      { new: true }
    );

    if (!updatePassword) {
      return res.status(404).json({
        success: false,
        message: "Could not find user!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  allUsers,
  verifyUser,
  updateUserPassword,
};
