import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
     const token = req.cookies.access_token;

     if (!token) {
      return next(createError(401,"Not authorized, please login."));
     }

     //verify token
     const verified = jwt.verify(token, process.env.JWT_SECRET);

     //get user id from token
     //then using that id get the user from the database, but exclude the password property from the query result   
     //for security reasons
     const user = await User.findById(verified.id).select("-password");

     if (!user) {
      return next(createError(404,"User not found"));
     }

     req.user = user;
     next();
  } catch (error) {
    return next(createError(401,"Not authorized, please login."));
  }
};

export const adminOnly =  async (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
     next();
  } else {
    return next(createError(401,"Not authorized as an admin."));
  }
};

