import './list.scss'
import Card from '../Card/Card'
import type { Post, SavedPost } from '../../types'

function List({posts, isSavedPost}: { posts: Post[] | SavedPost[]; isSavedPost: boolean }){
  const postItems = isSavedPost ? (posts as SavedPost[]).map(({ post }) => post) : posts as Post[];

  return (
    <div className='list'>
      {postItems.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List