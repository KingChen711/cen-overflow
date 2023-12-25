import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    //   const { question } = await req.json()
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + process.env.OPEN_AI_API_KEY
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //       {
    //         role: 'system',
    //         content: 'You are a knowledgeable assistant tha provides quality information.'
    //       },
    //       {
    //         role: 'user',
    //         content: `Tell me ${question}`
    //       }
    //     ]
    //   })
    // })

    // const responseData = await response.json()
    // const reply = responseData.choice[0].message.content

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1)
      }, 2000)
    })

    return NextResponse.json({ reply: "This feature's not work, OpenAI_API is not free now!" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
