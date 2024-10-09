import { Message } from "../models/messageSchema.js";
import { asyncerror } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
export const sendMessage = asyncerror(async (req, res, next) => {
  //get email from body
  const { email } = req.body;
  //email should exists
  if (!email) {
    return next(new ErrorHandler("Please provide valid E-mail", 400));
  }
  //else
  await Message.create({ email });
  return res.status(200).json({
    success: true,
    message: `Thank you for subscribing! We will send offers to ${email}.`,
  });
});

//get AllMessages
export const getAllMessages = asyncerror(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
