import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

//SIGN IN
export const signInWithGoogle = async (req, res, next) => {
  try {
    const userData = await userModel.findOne({ email: req.body.email });
    if (userData) {
      const token = jwt.sign(
        {
          id: userData._id,
          email: userData.email,
          username: userData.username,
          profilePicture: userData.profilePicture,
        },
        process.env.JWT_SECRECT,
        { expiresIn: "10d" }
      );
      res.json({
        id: userData._id,
        email: userData.email,
        username: userData.username,
        profilePicture: userData.profilePicture,
        token: token,
      });
    } else {
      const newData = new userModel(req.body);
      const savedData = await newData.save();
      const token = jwt.sign(
        {
          id: savedData._id,
          email: savedData.email,
          username: savedData.username,
          profilePicture: savedData.profilePicture,
        },
        process.env.JWT_SECRECT,
        { expiresIn: "10d" }
      );
      res.json({
        id: savedData._id,
        email: savedData.email,
        username: savedData.username,
        profilePicture: savedData.profilePicture,
        token: token,
      });
    }
  } catch (error) {
    const err = {
      status: 500,
      messege: error.message,
    };
    next(err);
  }
};

//GET USER DATA
export const getUserData = async (req, res, next) => {
  try {
    const { token } = req.query;
    const userData = jwt.verify(token, process.env.JWT_SECRECT);
    res.json(userData);
  } catch (error) {
    const err = {
      status: 500,
      messege: error.message,
    };
    next(err);
  }
};

//SIGN OUT
export const signOut = async (req, res, next) => {
  try {
    res.json({
      logout: true,
    });
  } catch (error) {
    const err = {
      status: 500,
      messege: error.message,
    };
    next(err);
  }
};
