'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from './shared.types'
import Tag from '@/database/tag.model'
import Question from '@/database/question.model'

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase()

    // const {  } = params

    const tags = await Tag.find({})

    return { tags }
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

    const { tagId } = params

    const tag = await Tag.findById(tagId)
    if (!tag) {
      throw new Error('Tag not found!')
    }

    const matchedQuestions = await Question.find({ tags: { $in: [tagId] } })
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })

    return { questions: matchedQuestions, tag }
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
