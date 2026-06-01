import dotenv from "dotenv";
dotenv.config();
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import z from "zod";
import { accountModel } from "../models/accountsModel.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const userSignup = async (req, res) => {
  const requiredBody = z.object({
    username: z.string().email(),
    password: z.string().min(8).max(8),
    firstName: z.string().min(3).max(8),
    lastName: z.string().min(3).max(8),
  });

  try {
    const userDetails = requiredBody.safeParse(req.body);
    

    if (!userDetails.success) {
      return res.status(411).json({
        message: "email already taken/incorrect inputs",
      });
    }

    const { username, password, firstName, lastName } = req.body;

    const existingUser = await userModel.findOne({ username: username });

    if (existingUser) {
      return res.status(411).json({
        message: "User already exists",
      });
    }

    const userCreated = await userModel.create({
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    await accountModel.create({
      userId: userCreated._id,
      balance: Math.floor(Math.random() * 10000) + 1,
    });

    if (userCreated) {
      const token = jwt.sign({ userId: userCreated._id }, JWT_SECRET);
      return res.status(200).json({
        token: token,
        message: "User created successfully",
      });
    }
  } catch (e) {
    console.error("Error while signing up user", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const userSignin = async (req, res) => {
  const requiredBody = z.object({
    username: z.string().email(),
    password: z.string().min(8).max(8),
  });

  try {
    const userDetails = requiredBody.safeParse(req.body);

    if (!userDetails.success) {
      return res.status(411).json({
        message: "email already taken/incorrect inputs",
      });
    }

    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username: username });

    if (!existingUser) {
      return res.status(411).json({
        message: "User not exists",
      });
    }

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);
    return res.status(200).json({
      token: token,
      message: "User signed in successfully",
    });
  } catch (e) {
    console.error("Error while signing in user", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  const updateSchema = z.object({
    password: z.string().min(8).max(8).optional(),
    firstName: z.string().min(3).max(8).optional(),
    lastName: z.string().min(3).max(8).optional(),
  });

  const userId = req.userId;
  const updatedDetails = updateSchema.safeParse(req.body);

  if (!updatedDetails.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  try {
    const user = await userModel.findByIdAndUpdate(userId, updatedDetails.data);

    if (!user) {
      return res.status(411).json({
        message: "Error while updating profile",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (e) {
    console.error("Error while updating profile", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const findUser = async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await userModel.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });

    res.status(200).json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
      })),
    });
  } catch (e) {
    console.error("Error while finding user", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
