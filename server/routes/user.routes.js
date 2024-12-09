const User = require("../database/models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");

const router = express.Router()

router.get("/", async (req, res) => {
    console.log(req.userId)
    const users = await User.findAll({
        attributes: {
            exclude: ["password"]
        }
    })

    res.status(200).json(users)
})

router.get("/:id", async (req, res) => {
    const id = req.params.id

    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "User id is not valid", data: {} })
    }

    const user = await User.findByPk(id, {
        attributes: {
            exclude: ["password"]
        }
    })

    if (!user) {
        return res.status(400).json({ success: false, message: "User id is not valid", data: {} })
    }

    res.status(200).json({ success: false, message: "User was found!", data: user })
})

router.post("/", async (req, res) => {
    const existingUser = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists", data: {} })
    }

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(req.body.password, salt)

    const user = await User.create({
        ...req.body,
        password: hashPassword,
    })

    delete user.dataValues.password

    res.status(200).json({ success: true, message: "User (re)created", data: user })
})

router.put("/:id", async (req, res) => {
    const id = req.params.id

    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "User id is not valid", data: {} })
    }

    const user = await User.findByPk(id)
    if (!user) {
        return res.status(400).json({ success: false, message: "User id is not valid", data: {} })
    }

    const updatedUser = await user.update({
        ...req.body,
    })

    delete updatedUser.dataValues.password

    res.status(200).json({ success: true, message: "User updated!", data: updatedUser })
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id

    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "User id is not valid", data: {} })
    }

    const user = await User.findByPk(id)
    if (!user) {
        return res.status(400).json({ success: false, message: "User id is not valid", data: {} })
    }

    await user.destroy()

    res.status(200).json({ success: true, message: "User deleted!", data: {} })
})


module.exports = router