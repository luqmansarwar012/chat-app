import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// register user controller
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Passwords don't match" });
    }

    // checking wether user already exists
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists!" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const newUser = new User({
      fullName,
      username,
      password: hashedPass,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // generate jwt token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        success: true,
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ success: false, error: "Invalid user data!" });
    }
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong in signup controller!",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // checking wether username is valid
    const user = await User.findOne({ username });
    // verify password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid username or password!" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      success: true,
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Something went wrong in login controller!");
    res.status(500).json({
      success: false,
      error: "Something went wrong in login controller!",
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully!" });
  } catch (error) {
    console.log("Something went wrong in logout controller!");
    res.status(500).json({
      success: false,
      error: "Something went wrong in logout controller!",
    });
  }
};
