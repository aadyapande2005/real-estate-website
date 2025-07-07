import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";
import { useRef } from "react";

function Pin({ item }) {
  const markerRef = useRef(null);

  const handleMouseOver = () => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  };

  const handleMouseOut = () => {
    if (markerRef.current) {
      setTimeout(() => {
        markerRef.current.closePopup();
      }, 1500);
    }
  };

  return (
    <Marker position={[item.latitude, item.longitude]} eventHandlers={{
        mouseover: handleMouseOver,
        mouseout: handleMouseOut,
      }} ref={markerRef}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>₹ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;