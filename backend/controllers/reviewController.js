import Course from "../models/courseModel.js";
import Review from "../models/reviewModel.js";
import asyncHandler from "express-async-handler";

const submitReview = asyncHandler(async(req, res) => {
    try {
        const { courseId, userId, review, rating }= req.body

        const newReview = await Review.create({
            user: userId,
            course: courseId,
            review: review,
            rating: rating
        })

        const course = await Course.findById(courseId)

        if(course){
            course.totalRating += parseInt(rating)
            course.reviewCount++
            course.rating = course.totalRating / course.reviewCount
        }

       await course.save()

        if(newReview){
            res.status(201).json('success')
        }else{
            throw new Error('Error ocuured')
        }
    } catch (error) {
        console.log(error);
    }
})


const getReviews = asyncHandler(async(req, res) => {
    try {
        const reviewsData = await Review.find()
        if(reviewsData){
            res.json(reviewsData)
        }else{
            throw new Error('Error occured')
        }
    } catch (error) {
        console.log(error);
    }
})



const getCourseReviews = asyncHandler(async(req, res) => {
    try {
        const id = req.query.id
        console.log(id);
        const reviewsData = await Review.find({course: id}).populate("user")
        if(reviewsData){
            res.json(reviewsData)
        }else{
            throw new Error('Error occured')
        }
    } catch (error) {
        console.log(error);
    }
})



export { submitReview, getReviews, getCourseReviews }