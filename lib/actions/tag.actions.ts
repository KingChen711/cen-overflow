'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from './shared.types'
import Tag from '@/database/tag.model'
import Question from '@/database/question.model'
import { FilterQuery } from 'mongoose'

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase()

    const { searchQuery, filter, page = 1, pageSize = 20 } = params

    const query: FilterQuery<typeof Tag> = {}

    if (searchQuery) {
      query.name = new RegExp(searchQuery, 'i')
    }

    let sortOptions = {}

    switch (filter) {
      case 'popular':
        sortOptions = { questions: -1 }
        break
      case 'recent':
        sortOptions = { createdOn: -1 }
        break
      case 'name':
        sortOptions = { name: 1 }
        break
      case 'old':
        sortOptions = { createdOn: 1 }
        break
      default:
        break
    }

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(pageSize * (page - 1))
      .limit(pageSize)

    const tagsCount = await Tag.find(query).countDocuments()
    const pageCount = Math.ceil(tagsCount / pageSize)

    return { tags, pageCount }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase()

    const { userId } = params

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')

    // Find interactions for the user and group by tags
    // Interaction...

    return [
      { _id: '1', name: 'tag1' },
      { _id: '2', name: 'tag2' },
      { _id: '3', name: 'tag3' }
    ]
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestionsByTagIdParams(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase()

    const { tagId, searchQuery, page = 1, pageSize = 10 } = params

    const tag = await Tag.findById(tagId)
    if (!tag) {
      throw new Error('Tag not found!')
    }

    const queryQuestions: FilterQuery<typeof Question> = { tags: { $in: [tagId] } }

    if (searchQuery) {
      queryQuestions.$or = [
        {
          title: { $regex: new RegExp(searchQuery, 'i') }
        },
        {
          content: { $regex: new RegExp(searchQuery, 'i') }
        }
      ]
    }

    const matchedQuestions = await Question.find(queryQuestions)
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)

    const questionsCount = await Question.find(queryQuestions).countDocuments()
    const pageCount = Math.ceil(questionsCount / pageSize)

    return { questions: matchedQuestions, tag, pageCount }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getTopPopularTags() {
  try {
    await connectToDatabase()

    const popularTags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          totalQuestions: { $size: '$questions' }
        }
      },
      {
        $sort: { totalQuestions: -1 }
      },
      {
        $limit: 5
      }
    ])

    return { questions: popularTags }
  } catch (error) {
    console.log(error)
    throw error
  }
}
