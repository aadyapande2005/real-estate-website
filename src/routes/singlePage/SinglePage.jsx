import './singlePage.scss'
import { useLoaderData } from 'react-router-dom'
import SingleMap from '../../components/singleMap/SingleMap'
import Slider from '../../components/Slider/Slider'
import DOMPurify from 'dompurify'
import apiRequest from '../../lib/apiRequest'
import { useState } from 'react'
import { toast } from 'react-toastify'

function SinglePage() {
  const post = useLoaderData()

  console.log(post)

  const [save, setSave] = useState(post.isSaved)

  const handleCreateChat = async () => {
    try {
      const chat = await apiRequest.post(`/chats/${user.id}`);
      toast.success("Chat created!");
      window.location.href = "/profile";
    } catch (error) {
      toast.error("Failed to create chat");
      console.error(error);
    }
  }

  const handleSavePost = async () => {
    const postId = post.id
    console.log(postId)
    try {
      const savedpost = await apiRequest.post("/posts/savepost/" + postId)
      setSave((prev) => !prev)
      console.log(savedpost.data);
      toast.success(savedpost.data.message)
    } catch (error) {
      console.error("Error saving post:", error);      
    }
  }

  const { postdetail, user, ...body } = post


  return (
    <div className="singlePage">
      <div className="wrapper">
        <div className="details">
          <Slider images={body.images} />
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
                <h2>{body.title}</h2>
                <span><img src="pin.png" />{body.address}</span>
                <div className="price">₹ {body.price}</div>
              </div>
              <div className="owner-info">
                <img
                  src={user.avatar || "default-profile.avif"}
                  alt=""
                />
                <span>{user.username}</span>
              </div>
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postdetail.desc) }}>
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
                  <p>{postdetail.utilities}</p>
                </div>
              </div>
              <div className="utility">
                <img src="pet.png" />
                <div className="description">
                  <h5>Pet Policy</h5>
                  <p>{postdetail.pet}</p>
                </div>
              </div>
              <div className="utility">
                <img src="fee.png" />
                <div className="description">
                  <h5>Property fees</h5>
                  <p>{postdetail.income}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="room-sizes">
            <h4>Room Sizes</h4>
            <div className="specifications">
              <div className="specs">
                <img src="size.png" />
                <span>{postdetail.size} sqft</span>
              </div>
              <div className="specs">
                <img src="bed.png" />
                <span>{body.bedroom} bed</span>
              </div>
              <div className="specs">
                <img src="bath.png" />
                <span>{body.bathroom} bathroom</span>
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
                  <p>{postdetail.school}m away</p>
                </div>
              </div>
              <div className="place">
                <img src="bus.png" />
                <div className="desc">
                  <h5>Bus Stop</h5>
                  <p>{postdetail.bus}m away</p>
                </div>
              </div>
              <div className="place">
                <img src="restaurant.png" />
                <div className="desc">
                  <h5>Restaurant</h5>
                  <p>{postdetail.restaurant}m away</p>
                </div>
              </div>
            </div>
          </div>
          <div className="location">
            <SingleMap item={body}/>
          </div>
          <div className="actions">
            <button className="send" onClick={handleCreateChat} ><img src="chat.png" />Send a message</button>
            
            {save ? 
              <button className="save" onClick={handleSavePost} ><img src="save.png" />Place Saved</button> 
            : <button className="save" onClick={handleSavePost} style={{backgroundColor:"rgb(249, 230, 108)"}} ><img src="save.png" />Save the place</button>}
            
          </div>

        </div>

      </div>
    </div>
  )
}

export default SinglePage