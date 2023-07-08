import { json, type LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
import {
  getPostsTitleByBoardId,
  type TPostTitleOnly,
} from '~/models/post.service'

interface ILoaderData {
  posts: TPostTitleOnly[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const boardId = params.id ?? 'No ID'

  if (boardId === 'No ID') {
    return json<ILoaderData>({
      posts: [],
    })
  }

  console.log('before')
  const posts = await getPostsTitleByBoardId(parseInt(boardId))
  console.log('after')

  return json<ILoaderData>({
    posts: posts.data || [],
  })
}

export default function Board() {
  const params = useParams()
  const boardId = params.id ?? 'No ID'

  const loaderData = useLoaderData<ILoaderData>()
  const [posts, setPosts] = useState<TPostTitleOnly[]>(loaderData.posts)

  useEffect(() => {
    setPosts(loaderData.posts)
  }, [loaderData.posts])

  return (
    <>
      <h1>게시판 ID: {boardId}</h1>
      {posts.map((post, index) => (
        <Link to={`/dynamic/${boardId}/${post.id}`} key={index}>
          {post.title}
        </Link>
      ))}
      <Outlet />
    </>
  )
}
