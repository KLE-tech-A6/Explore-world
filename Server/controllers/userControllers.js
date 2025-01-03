const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const User = require("../models/userModel");
const HttpError = require("../models/errorModel");

/*=========================Register a new user =============*/
// POST : api/users/register

//unprotected
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;

    // Check if required fields are provided
    if (!name || !email || !password || !password2) {
      return next(new HttpError("Fill in all fields.", 422));
    }
    const newEmail = email.toLowerCase();

    // Check if email already exists
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("Email already exists.", 422));
    }

    //check password length
    if (password.trim().length < 6) {
      return next(
        new HttpError("Password should be at least 6 characters.", 422)
      );
    }

    if (password != password2) {
      return next(new HttpError("Password do not match.", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: newEmail,
      password: hashedPass,
    });
    // res.status(201).json(newUser)
    res.status(201).json(`New user ${newUser.email} registered.`);
  } catch (error) {
    return next(new HttpError("User registration failed.", 422));
  }
};
// const registerUser = async (req, res, next) => {
//     res.json("register user")
// }

/*=========================Loggin a register user =============*/
// POST : api/users/login
//unprotected
const loginUser = async (req, res, next) => {
  try {
    console.log("Login attempt:", req.body); // Log the request body
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing fields");
      return res.status(422).json({ message: "Fill in all fields." });
    }

    const newEmail = email.toLowerCase();
    const user = await User.findOne({ email: newEmail });
    if (!user) {
      console.log("User not found");
      return res.status(422).json({ message: "Invalid Credentials." });
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      console.log("Password mismatch");
      return res.status(422).json({ message: "Invalid credentials." });
    }

    console.log("User authenticated");
    const { _id: id, name } = user;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, id, name });
  } catch (error) {
    console.error("Backend Login Error:", error);
    res.status(500).json({ message: "Server error occurred." });
  }
};


/*=========================User profile =============*/
// POST : api/users/:id
// protected
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("User not found.", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    return next(new HttpError(error));
  }
};

/*======================== change user avatar =============*/
// POST : api/users/change-avatar
// protected
const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar) {
      return next(new HttpError("Please choose an image.", 422));
    }

    //find the user from database
    const user = await User.findById(req.user.id);

    //delete old avatar if exists
    if (user.avatar) {
      fs.unlink(path.join(__dirname, "..", "uploads", user.avatar), (err) => {
        if (err) {
          return next(new HttpError(err));
        }
      });
    }

    const { avatar } = req.files;
    //check file size
    if (avatar.size > 500000) {
      return next(
        new HttpError("Profile picture is too big. Should be less than 500kb"),
        422
      );
    }

    let fileName;
    fileName = avatar.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    avatar.mv(
      path.join(__dirname, "..", "uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        }

        const updatedAvatar = await User.findByIdAndUpdate(
          req.user.id,
          { avatar: newFilename },
          { new: true }
        );
        if (!updatedAvatar) {
          return next(new HttpError("Avatar couldn't be changed.", 422));
        }
        res.status(200).json(updatedAvatar);
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

/*========================= edit user details from profile =============*/
// POST : api/users/edit-user
//protected
const editUser = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, confirmNewPassword } =
      req.body;
    if (!name || !email || !currentPassword || !newPassword) {
      return next(new HttpError("Fill in all fields.", 422));
    }

    //get user from database
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User not found.", 403));
    }

    //make sure new email doesn't already exist
    const emailExists = await User.findOne({ email });

    //we want to update other details with/without changing the email (which is a uniqueid because we use it to login).
    if (emailExists && emailExists._id != req.user.id) {
      return next(new HttpError("Email already exist.", 422));
    }

    // compare current password to database password
    const validateUserPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!validateUserPassword) {
      return next(new HttpError("Invalid current password", 422));
    }

    // compare new passwords
    if (newPassword !== confirmNewPassword) {
      return next(new HttpError("New password do not match.", 422));
    }

    //hash new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    //update user info in database
    const newInfo = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, password: hash },
      { new: true }
    );
    res.status(200).json(newInfo);
  } catch (error) {
    return next(new HttpError(error));
  }
};

/*========================= Get Authors =============*/
// POST : api/users/authors
//unprotected
const getAuthors = async (req, res, next) => {
  try {
    const authors = await User.find().select("-password"); //.select('-password'); password ek ganna epa kiyala kiyanne
    res.json(authors);
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
};
