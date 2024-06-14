import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Passwords don't match" });
    }

    const user = await User;
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};
export const login = (req, res) => {
  res.send("logged in");
};
export const logout = (req, res) => {
  res.send("logged out");
};
