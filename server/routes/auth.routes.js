const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../database/models/User")

const router = express.Router()


router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({
        where: {
            email
        }
    })

    if (!existingUser) {
        return res.status(400).json({ success: false, message: "User not found!", data: {} })
    }

    const isValidPassword = bcrypt.compareSync(password, existingUser.dataValues.password)

    if (!isValidPassword) {
        return res.status(400).json({ success: false, message: "Not the same passowrd!", data: {} })
    }

    const token = jwt.sign({ id: existingUser.dataValues.id }, process.env.TOKEN_SECRET, {
        expiresIn: "1h"
    })

    res.status(200).json({ success: false, message: "Valid email and password!", data: token })
})


module.exports = router