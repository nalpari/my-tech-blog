import { json, redirect } from '@remix-run/node'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

type TLoaderData = {
  status: number
  message: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log('해당 로그는 터미널로 노출...')

  const cookie = request.headers.get('Cookie')
  console.log('cookie: ', cookie)
  const url = new URL(request.url)
  console.log('url: ', url)
  const query = url.searchParams.get('q')
  console.log('query: ', query)

  return json<TLoaderData>({
    status: 200,
    message: 'Hello world!',
  })
}

export const action: ActionFunction = async ({ request, params }) => {
  console.log('Action 실행')
  const body = await request.formData()
  const name = body.get('name')
  console.log(name)
  return redirect('/test')
}

export default function Test() {
  const initialData = useLoaderData<TLoaderData>()

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {JSON.stringify(initialData)}
      <div>
        <Form method="post">
          <input type="text" name="name" />
          <input type="submit" value="제출" />
        </Form>
      </div>
    </>
  )
}
