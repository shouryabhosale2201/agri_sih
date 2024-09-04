const express = require("express");
const bcrypt = require("bcryptjs");
const Farmer = require("../Models/Farmer");
const router = express.Router();
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
const zod = require("zod");
// const validator = require("validator")

const signupBody = zod.object({
    name: zod.string().max(20, { message: "Max 20 characters allowed" }),
    email: zod.string().email(),
    phone: zod.string().min(10, { message: "Min 10 characters required" }),
    password: zod.string().min(6, { message: "Min 6 characters required" })
})

router.post("/register", async (req, res) => {
    // const { name, email, phone } = req.body;
    const { success, error } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs",
            error: error.format()
        })
    }

    const existingFarmer = await Farmer.findOne({
        email: req.body.email
    })

    if (existingFarmer) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    try {
        const FarmerDoc = await Farmer.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            phone: req.body.phone,
        });
        const FarmerId = FarmerDoc._id;
        const token = jwt.sign({ FarmerId }, JWT_SECRET);

        res.json({ message: "Farmer registered successfully", token });
    } catch (error) {
        console.log(error);
        res.status(422).json({ error: "Failed to register Farmer" });
    }
});

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6, { message: "Min 6 characters required" })
})

router.post("/login", async (req, res) => {
    try {
        const { success } = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }

        const FarmerDoc = await Farmer.findOne({ email : req.body.email });

        if (!FarmerDoc) {
            return res.status(404).json({ error: "Farmer not found" });
        }

        const passOk = bcrypt.compareSync(req.body.password, FarmerDoc.password);

        if (!passOk) {
            return res.status(422).json({ error: "Invalid password" });
        }

        const token = jwt.sign({
            FarmerId: FarmerDoc._id,
        }, JWT_SECRET);

        const {password: pass, ...rest} = Farmer._doc;
        res.cookie("token", token,{httpOnly: true}).status(200).json(rest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/checkLoginStatus', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ isLoggedIn: false });
            }
            res.json({ isLoggedIn: true });
        });
    } else {
        res.json({ isLoggedIn: false });
    }
});

router.post("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true }).json({ message: "Logged out successfully" });
});

module.exports = router;
