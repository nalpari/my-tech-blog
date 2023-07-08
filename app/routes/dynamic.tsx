import { json, type LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { getBoards, type TBoard } from '~/models/board.service'

interface ILoaderData {
  boards: TBoard[]
}

export const loader: LoaderFunction = async () => {
  const boards = await getBoards()
  console.log(boards)
  return json<ILoaderData>({ boards: boards.data || [] })
}

export default function dynamic() {
  const loaderData = useLoaderData<ILoaderData>()
  const [boards] = useState<TBoard[]>(loaderData.boards)

  return (
    <>
      <h1>Dynamic</h1>
      {boards.map((board, index) => (
        <>
          <Link to={`/dynamic/${board.id}`} key={index}>
            {board.name}
          </Link>{' '}
        </>
      ))}
      <Outlet />
    </>
  )
}
