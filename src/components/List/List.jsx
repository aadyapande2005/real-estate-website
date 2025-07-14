import './list.scss'
import Card from '../Card/Card'

function List({posts, isSavedPost}){

  return (
    <div className='list'>
      {posts.map(item=>(
        <Card key={item.id} item={isSavedPost ? item.post : item }/>
      ))}
    </div>
  )
}

export default List