import asyncHandler from 'express-async-handler'
import Reply from '../models/replyModel.js'



const addReply = asyncHandler ((req, res) => {
    try {
        const {questionId, userId, text } = req.body

        const newReply = Reply.create({
            question: questionId,
            user: userId,
            text: text,
        })

        if(newReply){
            res.status(201).json('Reply submited successfully')
        }else{
            throw new Error('Error')
        }
    } catch (error) {
        console.log(error);
    }
})


export {addReply}