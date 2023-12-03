'use server'

import Question from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import Tag from '@/database/tag.model'
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  GetSavedQuestionsParams,
  QuestionVoteParams,
  ToggleSaveQuestionParams
} from './shared.types'
import User from '@/database/user.model'
import { revalidatePath } from 'next/cache'
import { FilterQuery } from 'mongoose'
import Answer from '@/database/answer.model'
import Interaction from '@/database/interaction.model'

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase()
    const { title, content, tags, author, path } = params

    // Create a question
    const question = await Question.create({
      title,
      content,
      author
    })

    const tagDocuments = []

    // Create the tags or get thêm if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      )

      tagDocuments.push(existingTag)
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } }
    })

    // Create an interaction record for the user's ask_question action
    await Interaction.create({
      user: author,
      action: 'ask_question',
      question: question._id,
      tags: tagDocuments
    })
    // Increment author's reputation by +5 for creating a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase()

    const { searchQuery, filter, page = 1, pageSize = 10 } = params

    const query: FilterQuery<typeof Question> = {}

    if (searchQuery) {
      query.$or = [
        {
          title: { $regex: new RegExp(searchQuery, 'i') }
        },
        {
          content: { $regex: new RegExp(searchQuery, 'i') }
        }
      ]
    }

    let sortOptions = {}

    switch (filter) {
      case 'newest':
        sortOptions = { createdAt: -1 }
        break
      case 'frequent':
        sortOptions = { views: -1 }
        break
      case 'unanswered':
        query.answers = { $size: 0 }
        break
      case 'recommended':
        break
      default:
        break
    }

    const questions = await Question.find(query)
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort(sortOptions)
      .skip(pageSize * (page - 1))
      .limit(pageSize)

    const questionsCount = await Question.find(query).countDocuments()
    const pageCount = Math.ceil(questionsCount / pageSize)

    return { questions, pageCount }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await connectToDatabase()

    const { questionId } = params

    const question = await Question.findById(questionId)
      .populate({ path: 'tags', model: Tag, select: '_id name' })
      .populate({ path: 'author', model: User, select: 'clerkId name picture' })

    return { question }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function upVoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase()

    const { questionId, hasDownVoted, hasUpVoted, path, userId } = params

    let updateQuery = {}
    if (hasUpVoted) {
      updateQuery = { $pull: { upVotes: userId } }
    } else if (hasDownVoted) {
      updateQuery = { $pull: { downVotes: userId }, $push: { upVotes: userId } }
    } else {
      updateQuery = { $addToSet: { upVotes: userId } }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

    if (!question) {
      throw new Error('Question not found!')
    }

    if (question.author.toString() !== userId.toString()) {
      // Increment actor's reputation by +1/-1 for up voting/revoking an upVote to the question
      await User.findByIdAndUpdate(userId, { $inc: { reputation: hasUpVoted ? -1 : 1 } })
      // Increment author's reputation by +10/-10 for receiving an upVote to the question
      await User.findByIdAndUpdate(question.author, { $inc: { reputation: hasUpVoted ? -10 : 10 } })
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function downVoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase()

    const { questionId, hasDownVoted, hasUpVoted, path, userId } = params

    let updateQuery = {}
    if (hasDownVoted) {
      updateQuery = { $pull: { downVotes: userId } }
    } else if (hasUpVoted) {
      updateQuery = { $pull: { upVotes: userId }, $push: { downVotes: userId } }
    } else {
      updateQuery = { $addToSet: { downVotes: userId } }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

    if (!question) {
      throw new Error('Question not found!')
    }

    if (question.author.toString() !== userId.toString()) {
      // Decrement actor's reputation by +1/-1 for down voting/revoking an downVote to the question
      await User.findByIdAndUpdate(userId, { $inc: { reputation: hasDownVoted ? +1 : -1 } })
      // Decrement author's reputation by +2/-2 for receiving an downVote to the question
      await User.findByIdAndUpdate(question.author, { $inc: { reputation: hasDownVoted ? +2 : -2 } })
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    await connectToDatabase()

    const { path, questionId, userId } = params

    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found!')
    }

    const isQuestionSaved = user.saved.includes(questionId)
    if (isQuestionSaved) {
      await User.findByIdAndUpdate(userId, { $pull: { saved: questionId } }, { new: true })
    } else {
      await User.findByIdAndUpdate(userId, { $push: { saved: questionId } }, { new: true })
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    await connectToDatabase()

    const { clerkId, searchQuery, filter, page = 1, pageSize = 10 } = params

    const user = await User.findOne({ clerkId })

    if (!user) {
      throw new Error('User not found!')
    }

    const query: FilterQuery<typeof Question> = { _id: { $in: user.saved } }

    if (searchQuery) {
      query.$or = [
        {
          title: { $regex: new RegExp(searchQuery, 'i') }
        },
        {
          content: { $regex: new RegExp(searchQuery, 'i') }
        }
      ]
    }

    let sortOptions = {}

    switch (filter) {
      case 'most_recent':
        sortOptions = { createdAt: -1 }
        break
      case 'oldest':
        sortOptions = { createdAt: 1 }
        break
      case 'most_viewed':
        sortOptions = { views: -1 }
        break
      case 'most_voted':
        sortOptions = { upVotes: -1 }
        break
      case 'most_answered':
        sortOptions = { answers: -1 }
        break
      default:
        break
    }

    const savedQuestions = await Question.find(query)
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort(sortOptions)
      .skip(pageSize * (page - 1))
      .limit(pageSize)

    const questionsCount = await Question.find(query).countDocuments()
    const pageCount = Math.ceil(questionsCount / pageSize)

    return { questions: savedQuestions, pageCount }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    await connectToDatabase()

    const { questionId, path } = params

    await Question.findByIdAndDelete(questionId)
    await Answer.deleteMany({ question: questionId })
    await Interaction.deleteMany({ question: questionId })
    await Tag.updateMany({ questions: { $in: [questionId] } }, { $pull: { questions: questionId } })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getHotQuestions() {
  try {
    await connectToDatabase()

    const hotQuestions = await Question.find().sort({ view: -1, upVotes: -1 }).limit(5)

    return { questions: hotQuestions }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    await connectToDatabase()

    const { questionId, content, path, title } = params

    const question = await Question.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }
    question.title = title
    question.content = content

    await question.save()

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

// TODO:recommend question
//  TODO:add metadata
