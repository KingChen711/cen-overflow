'use server'

import Answer from '@/database/answer.model'
import { connectToDatabase } from '../mongoose'
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from './shared.types'
import { revalidatePath } from 'next/cache'
import Question from '@/database/question.model'
import User from '@/database/user.model'
import Interaction from '@/database/interaction.model'

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await connectToDatabase()
    const { author, content, path, question } = params
    // Create a answer
    const newAnswer = await Answer.create({
      author,
      content,
      question
    })

    await Question.findByIdAndUpdate(question, { $push: { answers: newAnswer._id } }, { new: true })

    // TODO:Add interaction...

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    await connectToDatabase()
    const { questionId, sortBy, page = 1, pageSize = 10 } = params

    let sortOptions = {}

    switch (sortBy) {
      case 'highestUpvotes':
        sortOptions = { upvotes: -1 }
        break
      case 'lowestUpvotes':
        sortOptions = { upvotes: 1 }
        break
      case 'recent':
        sortOptions = { createdAt: -1 }
        break
      case 'old':
        sortOptions = { createdAt: 1 }
        break
      default:
        break
    }

    const answers = await Answer.find({ question: questionId })
      .sort(sortOptions)
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name picture'
      })
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)

    const answersCount = await Answer.find({ question: questionId }).countDocuments()
    const pageCount = Math.ceil(answersCount / pageSize)

    return { answers, answersCount, pageCount }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase()

    const { hasdownVoted, hasupVoted, path, userId, answerId } = params

    let updateQuery = {}
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } }
    } else if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId }, $push: { upvotes: userId } }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

    if (!answer) {
      throw new Error('Answer not found!')
    }

    // TODO: calculate author reputation

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase()

    const { answerId, hasdownVoted, hasupVoted, path, userId } = params

    let updateQuery = {}
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } }
    } else if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId }, $push: { downvotes: userId } }
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

    if (!answer) {
      throw new Error('Answer not found!')
    }

    // TODO: calculate author reputation

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    await connectToDatabase()

    const { answerId, path } = params

    const answer = await Answer.findByIdAndDelete(answerId)
    if (!answer) {
      throw new Error('Answer not found')
    }
    await Question.findByIdAndUpdate(answer.question, { $pull: { answers: answerId } })
    await Interaction.deleteMany({ answer: answerId })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
