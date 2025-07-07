import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import './Map.scss'
import { listData } from '../../lib/dummydata';
import Pin from '../pin/Pin';
import MapUpdater from '../mapUpdater/MapUpdater';

function Map({coords, posts}) {
	return (
		<MapContainer className='map' center={coords} zoom={12} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{
				posts.map(pos =>
					<Pin item={pos} key={pos.id} />)
			}
			<MapUpdater coords={coords} />
		</MapContainer>

	)
}

export default Map