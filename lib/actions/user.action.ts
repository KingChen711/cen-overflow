'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  GetUserStatsParams,
  UpdateUserParams
} from './shared.types'
import { revalidatePath } from 'next/cache'
import Question from '@/database/question.model'
import Answer from '@/database/answer.model'
import Tag from '@/database/tag.model'
import { FilterQuery } from 'mongoose'

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    await connectToDatabase()

    const { searchQuery, filter, page = 1, pageSize = 20 } = params

    const query: FilterQuery<typeof User> = {}

    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: new RegExp(searchQuery, 'i') }
        },
        {
          username: { $regex: new RegExp(searchQuery, 'i') }
        }
      ]
    }

    let sortOptions = {}

    switch (filter) {
      case 'new_users':
        sortOptions = { joinedAt: -1 }
        break
      case 'old_users':
        sortOptions = { joinedAt: 1 }
        break
      case 'top_contributors':
        sortOptions = { reputation: -1 }
        break
      default:
        break
    }

    const users = await User.find(query)
      .sort(sortOptions)
      .skip(pageSize * (page - 1))
      .limit(pageSize)

    const usersCount = await User.find(query).countDocuments()
    const pageCount = Math.ceil(usersCount / pageSize)

    return { users, pageCount }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    await connectToDatabase()

    const { userId } = params

    const user = await User.findOne({ clerkId: userId })

    return user
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function createdUser(userData: CreateUserParams) {
  try {
    await connectToDatabase()

    const newUser = await User.create(userData)

    return newUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase()

    const { clerkId, path, updateData } = params

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase()

    const { clerkId } = params

    const user = await User.findOneAndDelete({ clerkId })

    if (!user) {
      throw new Error('User not found')
    }

    // delete everything invole with user in the database
    // const userQuestionIds = await Question.find({ author: user._id }).distinct('_id')

    await Question.deleteMany({ author: user._id })

    // TODO: delete user answers, comments,etc.

    const deletedUser = await User.findByIdAndDelete(user._id)

    return deletedUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    await connectToDatabase()

    const { userId } = params

    const user = await User.findOne({ clerkId: userId })

    if (!user) {
      throw new Error('Use not found')
    }

    const totalQuestions = await Question.countDocuments({ author: user._id })
    const totalAnswers = await Answer.countDocuments({ author: user._id })

    return { totalQuestions, totalAnswers, user }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    await connectToDatabase()

    const { userId, page = 1, pageSize = 10 } = params

    const questions = await Question.find({ author: userId })
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ views: -1, upvotes: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)

    const questionsCount = await Question.find({ author: userId }).countDocuments()
    const pageCount = Math.ceil(questionsCount / pageSize)

    return { questions, pageCount, questionsCount }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    await connectToDatabase()

    const { userId, page = 1, pageSize = 1 } = params

    const totalAnswers = await Answer.countDocuments({ author: userId })
    const answers = await Answer.find({ author: userId })
      .populate({ path: 'question', model: Question })
      .populate({ path: 'author', model: User })
      .sort({ views: -1, upvotes: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)

    const answersCount = await Answer.find({ author: userId }).countDocuments()
    const pageCount = Math.ceil(answersCount / pageSize)

    return { totalAnswers, answers, pageCount }
  } catch (error) {
    console.log(error)
    throw error
  }
}
