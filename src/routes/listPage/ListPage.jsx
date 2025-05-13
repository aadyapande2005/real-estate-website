import React, { useState } from 'react'
import "./listPage.scss"
import Filter from '../../components/filter/Filter'
import { listData } from '../../lib/dummydata'
import Card from '../../components/Card/Card'
import Map from '../../components/map/Map'


function ListPage() {
  const data = listData
  const [position, setposition] = useState(
    {
    lat:data[0].latitude,
    long:data[0].longitude
    })    
 
    return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <div className="cards">
            {data.map(item => (
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
        <Map coords={[position.lat,position.long]} />
      </div>
    </div>
  )
}

export default ListPage