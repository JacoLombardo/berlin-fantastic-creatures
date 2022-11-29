import User from '../model/userModel.js';
import encryptPassword from '../tools/encryptPassword.js';

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


export {getAllUsers, registerUser};