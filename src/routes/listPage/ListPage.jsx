import React from 'react'
import "./listPage.scss"
import Filter from '../../components/filter/Filter'
import { listData } from '../../lib/dummydata'
import Card from '../../components/Card/Card'
import Map from '../../components/map/Map'

function ListPage() {
  const data = listData
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <div className="cards">
            {data.map(item => (
            <Card key={item.id} item={item} />)
          )}
          </div>
          

        </div>
      </div>
      <div className="mapContainer">
        <Map />
      </div>
    </div>
  )
}

export default ListPage