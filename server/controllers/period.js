import jwt from "jsonwebtoken";
import periodModel from "../models/periodModel.js";

//ADD NEW PERIOD
export const addPeriod = async (req, res, next) => {
  try {
    const userData = jwt.verify(req.cookies.token, process.env.JWT_SECRECT);
    req.body.user_id = userData.id;
    const newPeriod = new periodModel(req.body);
    const savedPeriod = await newPeriod.save();
    res.json({
      messege: "succesfully added",
    });
  } catch (error) {
    const err = {
      status: 500,
      messege: error.messege,
    };
    next(err);
  }
};

//GETTING ALL PERIODS
export const getPeriod = async (req, res, next) => {
  try {
    const userData = jwt.verify(req.cookies.token, process.env.JWT_SECRECT);
    const periods = await periodModel
      .find({ user_id: userData.id })
      .sort({ endDate: -1 });
    res.json(periods);
  } catch (error) {
    const err = {
      status: 500,
      messege: error,
    };
    next(err);
  }
};

//REMOVE PERIOD
export const deletePeriod = async (req, res, next) => {
  try {
    const userData = jwt.verify(req.cookies.token, process.env.JWT_SECRECT);
    if (userData.id === req.query.userid) {
      await periodModel.findByIdAndDelete(req.query.id);
      res.json({
        messege: "removed succesfully!",
      });
    } else {
      const err = {
        status: 405,
        messege: "error deleting!",
      };
      next(err);
    }
  } catch (error) {
    const err = {
      status: 500,
      messege: error,
    };
    next(err);
  }
};
