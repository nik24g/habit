const HabitModel = require("../models/habit.model")
const { successResponse, errorResponse } = require("../utils/response")
const messages = require("../utils/constant")

const createhabit = async (req) => {
    const {title, description} = req.body
    // check is this habit already exists or not 
    const dbHabit = await HabitModel.findOne({habit_title: title})
    if(dbHabit) return errorResponse(409, messages.error.ALREADY_HABIT, {})
    const habit = new HabitModel({
        habit_title: title,
        habit_description: description
    })
    await habit.save()
    return successResponse(201, messages.success.HABIT_CREATED, {})
}

const habits = async (req) => {
    const habits = await HabitModel.find()
    return successResponse(200, messages.success.SUCCESS, {habits})
}

const deleteHabit = async (req) => {
    const habitId = req.params.id
    await HabitModel.findOneAndDelete({habit_id: habitId})
    return successResponse(200, messages.success.HABIT_DELETED)
}

const updateHabit = async (req) => {
    const {title, description, id} = req.body
    const habit = await HabitModel.findOne({habit_id: id})
    if(!habit) return errorResponse(404, messages.error.NO_HABIT)
    habit.habit_title = title
    habit.habit_description = description
    await habit.save()
    return successResponse(200, messages.success.HABIT_UPDATED)
}
module.exports = { createhabit, habits, deleteHabit, updateHabit }