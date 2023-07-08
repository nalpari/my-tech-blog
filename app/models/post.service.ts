import supabase from './supabase'

export type TPostTitleOnly = {
  id: number
  title: string | null
}

export type TPost = {
  id: number
  title: string | null
  content: string | null
  board_id: number
}

export async function getPostsByBoardId(boardId: number) {
  return await supabase.from('posts').select('*').eq('board_id', boardId)
}

export async function getPostsTitleByBoardId(boardId: number) {
  console.log(boardId)
  return await supabase
    .from('posts')
    .select('id, title')
    .eq('board_id', boardId)
}

export async function getPostById(id: number) {
  return await supabase.from('posts').select('*').eq('id', id).single()
}

export function createPost(title: string, content: string) {
  return supabase.from('posts').insert({ title, content })
}

export function updatePost(id: number, title: string, content: string) {
  return supabase.from('posts').update({ title, content }).eq('id', id)
}

export function deletePost(id: number) {
  return supabase.from('posts').delete().eq('id', id)
}
