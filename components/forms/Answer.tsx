'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from '../ui/button'
import { answerSchema } from '@/lib/validations'
import { useTheme } from '@/contexts/ThemeProvider'
import Image from 'next/image'
import { createAnswer } from '@/lib/actions/answer.action'
import { usePathname, useRouter } from 'next/navigation'
import { ReloadIcon } from '@radix-ui/react-icons'

type Props = {
  questionId: string
  authorId?: string
  question: string
}

function Answer({ questionId, authorId, question }: Props) {
  const editorRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { theme } = useTheme()
  const pathName = usePathname()
  const router = useRouter()
  const [isSubmittingAI, setIsSubmittingAI] = useState(false)

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: ''
    }
  })

  async function onSubmit(values: z.infer<typeof answerSchema>) {
    setIsSubmitting(true)
    try {
      // TODO: add toast about need to sign in
      if (!authorId) return router.push('/sign-in')

      await createAnswer({
        author: JSON.parse(authorId),
        content: values.answer,
        question: JSON.parse(questionId),
        path: pathName
      })

      form.reset()
      if (editorRef.current) {
        const editor = editorRef.current as any
        editor.setContent('')
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateAIAnswer = async () => {
    // TODO: add toast about need to sign in
    if (!authorId) return router.push('/sign-in')
    setIsSubmittingAI(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`, {
        method: 'POST',
        body: JSON.stringify({ question })
      })

      const aiAnswer = await response.json()

      if (aiAnswer.error) {
        throw new Error(aiAnswer.error)
      }

      const formattedAnswer = aiAnswer.reply.replace(/\n/g, '<br/>')
      if (editorRef.current) {
        const editor = editorRef.current as any
        editor.setContent(formattedAnswer)
      }

      // Toast...
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmittingAI(false)
    }
  }

  return (
    <div>
      <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
        <h4 className='paragraph-semibold text-dark400_light800'>Write your answer hear</h4>

        <Button
          onClick={generateAIAnswer}
          disabled={isSubmittingAI}
          className='btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none'
        >
          {isSubmittingAI ? (
            <>
              <ReloadIcon className='animate-spin text-primary-500' /> Generating...
            </>
          ) : (
            <>
              {' '}
              <Image src='/assets/icons/stars.svg' alt='star' width={12} height={12} className='object-contain' />
              Generate AI answer
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-6 flex w-full flex-col gap-10'>
          <FormField
            control={form.control}
            name='answer'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3'>
                <FormControl className='mt-3.5'>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) =>
                      // @ts-ignore
                      (editorRef.current = editor)
                    }
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue=''
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'codesample',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table'
                      ],
                      toolbar:
                        'undo redo | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter |' +
                        'alignright alignjustify | bullist numlist',
                      content_style: 'body { font-family:Inter; font-size:16px }',
                      content_css: theme === 'dark' ? 'dark' : 'light',
                      skin: theme === 'dark' ? 'oxide-dark' : 'oxide'
                    }}
                  />
                </FormControl>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />

          <div className='flex justify-end'>
            <Button type='submit' className='primary-gradient w-fit !text-light-900' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Answer
