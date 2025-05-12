import React from 'react'
import './singlePage.scss'
import { useParams } from 'react-router-dom'
import { listData, singlePostData } from '../../lib/dummydata'
import SingleMap from '../../components/singleMap/SingleMap'
import Slider from '../../components/Slider/Slider'

function SinglePage(props) {
  const { id } = useParams();
  const founddata = listData.find(item => item.id === Number(id))

  return (
    <div className="singlePage">
      <div className="wrapper">
        <div className="details">
          <Slider images={singlePostData.images} />
          {/* <div className="images">
            <div className="front-image">
              <img src={founddata.img} alt="" />
            </div>
            <div className="side-images">
              <img src={founddata.img} alt="" />
              <img src={founddata.img} alt="" />
              <img src={founddata.img} alt="" />
            </div>
          </div> */}
          <div className="description">
            <div className="title">
              <div className="apartment-description">
                <h2>{founddata.title}</h2>
                <span><img src="pin.png" />{founddata.address}</span>
                <div className="price">₹ {founddata.price}</div>
              </div>
              <div className="owner-info">
                <img
                  src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
                <span>John Doe</span>
              </div>
            </div>
            <div className="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla iure laboriosam quas facere id suscipit quam natus obcaecati cupiditate autem dolore, libero error reiciendis repudiandae quos, quia molestias! Repellendus, quibusdam?

            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper2">
          <div className="general">
            <h4>General</h4>
            <div className="general-info">
              <div className="utility">
                <img src="utility.png" />
                <div className="description">
                  <h5>Utilities</h5>
                  <p>Renter is responsible</p>
                </div>
              </div>
              <div className="utility">
                <img src="pet.png" />
                <div className="description">
                  <h5>Pet Policy</h5>
                  <p>Pets allowed</p>
                </div>
              </div>
              <div className="utility">
                <img src="fee.png" />
                <div className="description">
                  <h5>Property fees</h5>
                  <p>Must have 3x the rent in total household income</p>
                </div>
              </div>
            </div>
          </div>
          <div className="room-sizes">
            <h4>Room Sizes</h4>
            <div className="specifications">
              <div className="specs">
                <img src="size.png" />
                <span>861 sqft</span>
              </div>
              <div className="specs">
                <img src="bed.png" />
                <span>2 bed</span>
              </div>
              <div className="specs">
                <img src="bath.png" />
                <span>1 bathroom</span>
              </div>
            </div>
          </div>
          <div className="nearby-places">
            <h4>Nearby Places</h4>
            <div className="places">
              <div className="place">
                <img src="school.png" />
                <div className="desc">
                  <h5>School</h5>
                  <p>250m away</p>
                </div>
              </div>
              <div className="place">
                <img src="bus.png" />
                <div className="desc">
                  <h5>Bus Stop</h5>
                  <p>100m away</p>
                </div>
              </div>
              <div className="place">
                <img src="restaurant.png" />
                <div className="desc">
                  <h5>Restaurant</h5>
                  <p>200m away</p>
                </div>
              </div>
            </div>
          </div>
          <div className="location">
            <SingleMap item={founddata}/>
          </div>
          <div className="actions">
            <button className="send"><img src="chat.png" />Send a message</button>
            <button className="save"><img src="save.png" />Save the place </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default SinglePage