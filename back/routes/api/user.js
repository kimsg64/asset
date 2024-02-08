const express = require("express");
const router = express.Router();

const { User } = require("../../models/user");

/** [S] APIs */
// create a user
router.post("/", async (req, res) => {
    console.log("posted!!!", req.body);
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
    const { id, password } = req.body;
    console.log("id", id, "password", password);
    try {
        const user = await User.findOne({ id, password });
        console.log("is this yours?", user);
        if (!!user) {
            return res.status(200).json(user);
        } else {
            return res.status(500).json({ message: "not_exist" });
        }
    } catch (error) {
        console.log("there's an error!!!", error);
    }
});

// logout
router.post("/logout", async (req, res) => {
    res.clearCookie();
});

/** [E] APIs */

module.exports = router;
