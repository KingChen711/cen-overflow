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
    const { author, content, path, question: questionId } = params
    // Create a answer
    const newAnswer = await Answer.create({
      author,
      content,
      question: questionId
    })

    const question = await Question.findByIdAndUpdate(questionId, { $push: { answers: newAnswer._id } }, { new: true })

    // Create an interaction record for the user's answer action
    await Interaction.create({
      user: author,
      action: 'answer',
      answer: newAnswer._id,
      question: questionId,
      tags: question.tags
    })
    // Increment author's reputation by +5 for creating a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } })

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
      case 'highestUpVotes':
        sortOptions = { upVotes: -1 }
        break
      case 'lowestUpVotes':
        sortOptions = { upVotes: 1 }
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

export async function upVoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase()

    const { hasDownVoted, hasUpVoted, path, userId, answerId } = params

    let updateQuery = {}
    if (hasUpVoted) {
      updateQuery = { $pull: { upVotes: userId } }
    } else if (hasDownVoted) {
      updateQuery = { $pull: { downVotes: userId }, $push: { upVotes: userId } }
    } else {
      updateQuery = { $addToSet: { upVotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

    if (!answer) {
      throw new Error('Answer not found!')
    }

    if (answer.author.toString() !== userId.toString()) {
      // Increment actor's reputation by +2/-2 for down voting/revoking an upVote to the question
      await User.findByIdAndUpdate(userId, { $inc: { reputation: hasUpVoted ? -2 : +2 } })
      // Increment author's reputation by +10/-10 for receiving an upVote to the question
      await User.findByIdAndUpdate(answer.author, { $inc: { reputation: hasUpVoted ? -10 : +10 } })
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function downVoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase()

    const { answerId, hasDownVoted, hasUpVoted, path, userId } = params

    let updateQuery = {}
    if (hasDownVoted) {
      updateQuery = { $pull: { downVotes: userId } }
    } else if (hasUpVoted) {
      updateQuery = { $pull: { upVotes: userId }, $push: { downVotes: userId } }
    } else {
      updateQuery = { $addToSet: { downVotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

    if (!answer) {
      throw new Error('Answer not found!')
    }

    if (answer.author.toString() !== userId.toString()) {
      // Increment actor's reputation by +2/-2 for down voting/revoking an downVote to the question
      await User.findByIdAndUpdate(userId, { $inc: { reputation: hasDownVoted ? +2 : -2 } })
      // Increment author's reputation by +10/-10 for receiving an downVote to the question
      await User.findByIdAndUpdate(answer.author, { $inc: { reputation: hasDownVoted ? +10 : -10 } })
    }

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
