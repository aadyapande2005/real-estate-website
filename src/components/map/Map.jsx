import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import './Map.scss'
import { listData } from '../../lib/dummydata';
import Pin from '../pin/Pin';

function Map() {
    return (
        <MapContainer className='map' center={[18.5308, 73.8470]} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                listData.map(pos =>                     
                        <Pin item={pos} key={pos.id}/>)
            }
        </MapContainer>

    )
}

export default Map