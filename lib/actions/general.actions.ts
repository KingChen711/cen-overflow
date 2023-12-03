'use server'

import Question from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import { SearchParams } from './shared.types'
import User from '@/database/user.model'
import Answer from '@/database/answer.model'
import Tag from '@/database/tag.model'

const SearchableTypes = ['question', 'answer', 'tag', 'user']

export const globalSearch = async (params: SearchParams) => {
  try {
    await connectToDatabase()

    const { query, type } = params

    let result = []

    const modelsAndTypes = [
      { model: Question, searchField: 'title', type: 'question' },
      { model: User, searchField: 'name', type: 'user' },
      { model: Answer, searchField: 'content', type: 'answer' },
      { model: Tag, searchField: 'name', type: 'tag' }
    ]

    if (type && SearchableTypes.includes(type?.toLowerCase())) {
      // search specific
      const modelInfo = modelsAndTypes.find((model) => model.type === type.toLowerCase())

      if (!modelInfo) {
        throw new Error('Invalid search type')
      }

      let filterQuery = {}
      if (query) {
        filterQuery = { [modelInfo.searchField]: { $regex: query, $options: 'i' } }
      }

      const queryResult = await modelInfo.model.find(filterQuery).limit(8)

      result = queryResult.map((item) => ({
        ...item,
        type: modelInfo.type,
        title: type === 'answer' ? `Answers containing ${query}` : item[modelInfo.searchField],
        id: type === 'user' ? item.clerkId : type === 'answer' ? item.question : item._id
      }))
    } else {
      for (const { model, searchField, type } of modelsAndTypes) {
        let filterQuery = {}
        if (query) {
          filterQuery = { [searchField]: { $regex: query, $options: 'i' } }
        }
        const queryResult = await model.find(filterQuery).limit(2)
        result.push(
          ...queryResult.map((item) => ({
            ...item,
            type,
            title: type === 'answer' ? `Answers containing ${query}` : item[searchField],
            id: type === 'user' ? item.clerkId : type === 'answer' ? item.question : item._id
          }))
        )
      }
    }

    return JSON.stringify(result)
  } catch (error) {
    console.log(error)
    throw error
  }
}

// metadata
