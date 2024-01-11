const express = require("express");
const router = express.Router();

const { User } = require("../../models/user");

/** [S] APIs */
// create a user
router.post("/create", async (req, res) => {
    // console.log("posted!!!", req.body);
    const newUser = new User(req.body); // new User object
    // console.log("this is new user!", newUser);
    try {
        await newUser.save();
        return res.status(200).json({ newUser, message: "a user is created!" });
    } catch (error) {
        console.log("there's an error!!!", error);
        if (error.code === 11000) {
            return res.status(500).json({ message: `failed to create a user! ${error}` });
        }
    }
});

// login
router.post("/login", async (req, res) => {
    console.log("requested! with nodemon", req.body);

    const { username: id, password } = req.body;
    try {
        const user = await User.findOne({ id, password });
        console.log("is this yours?", user);
        if (!!user) {
            return res.status(200).json(user);
        } else {
            return res.status(500).json({ message: "can't find that account!" });
        }
    } catch (error) {
        console.log("there's an error!!!", error);
    }
});

/** [E] APIs */

module.exports = router;
