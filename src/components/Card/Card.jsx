import React from 'react'
import { Link } from 'react-router-dom'
import './Card.scss'

function Card({item}) {
  return (
    <div className="card">
        <div className="imagecontainer">
            <Link to={`/${item.id}`}>
                <img src={item.img} alt="" />
            </Link>
        </div>
        <div className="textcontainer">
            <h3>Apartment {item.id}</h3>
            <p className='address'><img src="pin.png" />{item.address}</p>
            <p className='price'>₹{item.price}</p>
            <div className="features">
                <div className="feature">
                    <div className="bed-feature">
                        <img src="bed.png" />
                        <span> {item.bedroom} bedroom</span>
                    </div>
                    <div className="bath-feature">
                        <img src="bath.png" />
                        <span> {item.bathroom} bathroom</span>
                    </div>
                </div>
                <div className="icon">
                    <img src="save.png" className='save-icon' />
                    <img src="chat.png"  className='chat-icon '/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card