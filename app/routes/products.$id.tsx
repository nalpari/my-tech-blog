import { json, type LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

type TLoaderData = {
  status: number
  message?: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  return json<TLoaderData>({
    status: 200,
    message: params.id,
  })
}

export default function Products() {
  const initialData = useLoaderData<TLoaderData>()

  return <>{JSON.stringify(initialData)}</>
}
