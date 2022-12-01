import User from '../model/userModel.js';
import { v2 as cloudinary } from 'cloudinary';
import encryptPassword from '../tools/encryptPassword.js';
import isPasswordCorrect from '../tools/isPasswordCorrect.js';
import issueToken from '../tools/jwt.js';

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({}).populate({path: 'posts'});
        res.json(allUsers);
    } catch (error) {
        console.log('error :>> ', error);
    }
};

const registerUser = async (req, res) => {

    console.log("req.body :>> ", req.body);
    const { firstName, lastName, username, email, password } = req.body;

    try {
        const existingUsername = await User.findOne({ username: req.body.username });
        const existingEmail = await User.findOne({ email: req.body.email });

        if (existingUsername) {
            res.status(200).json({ msg: "Username already in use" });
        } if (existingEmail) {
            res.status(200).json({ msg: "Email already in use" });
        } else {
            const hashedPassword = await encryptPassword(password);
            console.log("hashedPassword :>> ", hashedPassword);

            const blankPic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";

            const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: hashedPassword,
                profilePic: req.body.profilePic ? req.body.profilePic : blankPic,
            });
            
            try {
                const savedUser = await newUser.save();
                res.status(201).json({
                    msg: "Registration successful",
                    user: savedUser,
                });
            } catch (error) {
                console.log("error", error);
                res.status(500).json({
                    msg: "Registration error",
                    error: error,
                });
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            msg: "Registration error",
            error: error,
        });
    }
};

const loginUser = async (req, res) => {
    
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email: email });
        console.log("existingUser :>> ", existingUser);
        
        if (!existingUser) {
            res.status(200).json({ msg: "Invalid email" });
        } else {
            const verified = await isPasswordCorrect(password, existingUser.password);
            console.log("verified", verified);

            if (verified) {
                console.log("verified >>>>>", verified);
                const token = issueToken(existingUser._id);
                console.log("token :>> ", token);
                res.status(200).json({
                    msg: "Sucessfully logged in",
                    user: {
                        id: existingUser._id,
                        username: existingUser.username,
                        firstName: existingUser.firstName,
                        lastName: existingUser.lastName,
                        email: existingUser.email,
                        profilePic: existingUser.profilePic,
                    },
                    token,
                });
            } else {
                res.status(401).json({ msg: "incorrect password" });
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ msg: "Login error" });
    }
};

const imageUploadUser = async (req, res) => {
  try {
    console.log("req :>> ", req.file);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "berlin-fantastic-creatures/profilePics",
    });
    console.log("result >>>>", result);
    res.status(200).json({
      msg: "Image successfully uploaded",
      image: result.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error uploading image",
      error: error,
    });
  }
};


export {getAllUsers, registerUser, imageUploadUser, loginUser};