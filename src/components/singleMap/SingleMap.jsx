import React from 'react'
import './singleMap.scss'
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import Pin from '../pin/Pin';
import MapUpdater from '../mapUpdater/MapUpdater';

function SingleMap({ item }) {
  return (
    <MapContainer className='single-map' center={[item.latitude,item.longitude]} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Pin item={item} />

      <MapUpdater coords={[item.latitude,item.longitude]} />

    </MapContainer>

  )
}

export default SingleMap