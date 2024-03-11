const express = require('express');
const router = express.Router();
const {createhabit, habits, updateHabit, deleteHabit} = require("../controllers/habit.controller")

router.post("/", async(req, res) => {
    try {
        const response = await createhabit(req)
        return res.status(response.code).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({})
    }
})

router.get("/", async(req, res) => {
    try {
        const response = await habits(req)
        return res.status(response.code).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({})
    }
})

router.put("/", async(req, res) => {
    try {
        const response = await updateHabit(req)
        return res.status(response.code).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({})
    }
})
router.delete("/:id", async(req, res) => {
    try {
        const response = await deleteHabit(req)
        return res.status(response.code).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({})
    }
})
module.exports = router;