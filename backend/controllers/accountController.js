import mongoose from "mongoose";
import { accountModel } from "../models/accountsModel.js";

export const checkBalance = async (req, res) => {
  try {
    const userId = req.userId;

    const account = await accountModel.findOne({ userId: userId });

    if (account) {
      return res.status(200).json({
        balance: account.balance,
      });
    } else {
      return res.status(411).json({
        message: "Account not found",
      });
    }
  } catch (error) {
    console.error("Error while checking balance", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const transferMoney = async (req, res) => {
  try {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { toAccountId, amount } = req.body;
    const senderId = req.userId;

    const senderAccount = await accountModel
      .findOne({ userId: senderId })
      .session(session);

    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const receiverAccount = await accountModel
      .findOne({ userId: toAccountId })
      .session(session);

    if (!receiverAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Receiver account not found",
      });
    }

    await accountModel
      .updateOne({ userId: senderId }, { $inc: { balance: -amount } })
      .session(session);
    await accountModel
      .updateOne({ userId: toAccountId }, { $inc: { balance: amount } })
      .session(session);

    await session.commitTransaction();

    return res.status(200).json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.error("Error while transferring money", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
