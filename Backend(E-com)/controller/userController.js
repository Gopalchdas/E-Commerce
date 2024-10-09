import { asyncerror } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
export const registration = asyncerror(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("please fill full form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(
      new ErrorHandler("already registered! Try with different account", 400)
    );
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });
  generateToken(user, "succesfully Registered", 200, res);
});

//login user
export const login = asyncerror(async (req, res, next) => {
  const { email, password,role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("please fill full form", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  const ispasswordmatched = await user.comparePassword(password);
  if (!ispasswordmatched) {
    return next(new ErrorHandler("Invalid password or email", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found!", 400));
  }
  generateToken(user, "logged in succesfully", 200, res);
});

//Add New Admin
export const addAdmin = asyncerror(async (req, res, next) => {
  const { firstName, lastName, email,password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password
  ) {
    return next(new ErrorHandler("please Fill Full form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this account is already registered`
      )
    );
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "Admin Registered Succesfully",
  });
});


//getuserdetails
export const getUserDetails = asyncerror(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

/*when httpOnly attribute set to true for cookie then
it increase the security of cookie by preventing client side scripting for accessing it  */

//logout Admin
export const logoutAdmin = asyncerror(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "logged out succesfully",
    });
});

//logout patient
export const logoutCustomer = asyncerror(async (req, res, next) => {
  res
    .status(200)
    .cookie("customerToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),

  
    })
    .json({
      success: true,
      message: "logged out succesfully",
    });
});
