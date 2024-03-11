const ReviewModel = require("../models/user.model")
const { successResponse } = require("../utils/response")
const messages = require("../utils/constant")
const { v4: uuidv4 } = require('uuid');

const getAllReviews = async (req) => {
    const reviews = await ReviewModel.find()
    return successResponse(200, messages.success.SUCCESS, {reviews})
}

const createReview = async (req) => {
    console.log(req.body);
    const title = req.body.title
    const content = req.body.content
    const newReview = new ReviewModel({
        review_id: uuidv4(),
        review_title: title,
        review_content: content
    })
    await newReview.save()
    return successResponse(201, messages.success.SUCCESS)
}
const updateReview = async (req) => {
    const title = req.body.title
    const content = req.body.content
    const reviewId = req.body.id
    const review = await ReviewModel.findOne({review_id: reviewId})
    review.review_title = title
    review.review_content = content
    await review.save()
    return successResponse(200, messages.success.SUCCESS)
}

const getReview = async (req) => {
    const reviewId = req.params.id
    const review = await ReviewModel.findOne({review_id: reviewId})
    return successResponse(200, messages.success.SUCCESS, {review})
}

const deleteReview = async (req) => {
    const reviewId = req.params.id
    await ReviewModel.findOneAndDelete({review_id: reviewId})
    return successResponse(200, messages.success.SUCCESS)
}
module.exports = {getAllReviews, createReview, getReview, updateReview, deleteReview}