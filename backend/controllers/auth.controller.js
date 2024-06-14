import User from "../models/user.model.js";

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

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.json({
      success: false,
      message: "Something went wrong in signup controller!",
    });
  }
};
export const login = (req, res) => {
  res.send("logged in");
};
export const logout = (req, res) => {
  res.send("logged out");
};
