const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
export const registerController = async (req, res) => {
  try {
      const { name, Mobile, Referral, Gender, profilePictures, dob, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Expected fields are missing" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)  return res.status(400).json({ message: "user Exist" });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({   name,
            Mobile,
            Referral,
            Gender,
            profilePictures,
            dob, password: hashed });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
   return res.status(500).json({ message: "server error form registerUser" });
  }
};


// ===== LOGIN =====
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Required field Missing" });

    const user = await User.findOne({ email });
    if (!user)  return res.status(400).json({ message: "invalid Creds" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)  return res.status(400).json({ message: "invalid Creds" });
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "60m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

   return  res.json({ accessToken });
  } catch (err) {
     return res.status(500).json({ message: "server error form Login User" });
  }
};

