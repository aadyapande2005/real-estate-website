import React, { useState } from 'react'
import "./listPage.scss"
import Filter from '../../components/filter/Filter'
import { listData } from '../../lib/dummydata'
import Card from '../../components/Card/Card'
import Map from '../../components/map/Map'
import { useLoaderData } from 'react-router-dom'


function ListPage() {
  const data = listData
  const posts = useLoaderData()
  const [position, setposition] = useState(
    {
      lat: posts.length ? posts[0].latitude : 18.4862335,
      long: posts.length ? posts[0].longitude : 73.827826
    })

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <div className="cards">
            {posts.map(item => (
              <div key={item.id} onClick={() => {
                setposition(
                  {
                    lat:item.latitude,
                    long:item.longitude
                  });                
              }}>
                <Card item={item} />
              </div>)
          )}
          </div>        

        </div>
      </div>
      <div className="mapContainer">
        <Map coords={[position.lat,position.long]} posts={posts} />
      </div>
    </div>
  )
}

export default ListPage