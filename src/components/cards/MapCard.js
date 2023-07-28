import React from "react";
import GoogleMapReact from "google-map-react";
// import { GOOGLE_PLACES_KEY } from "../../config";
import { BsFillPinFill } from "react-icons/bs";

const MapCard = ({ ad }) => {
  const defaultProps = {
    center: {
      lat: ad?.location?.coordinates[1],
      lng: ad?.location?.coordinates[0],
    },
    zoom: 11,
  };
  return (
    <div>
      {ad?.location?.coordinates.length > 0 && (
        <div style={{ width: "100%", height: "350px", marginTop: "20px" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.GOOGLE_PLACES_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <div
              lat={ad?.location?.coordinates[1]}
              lng={ad?.location?.coordinates[0]}
            >
              <span className="lead">
                <BsFillPinFill style={{ color: "red", fontSize: "25px" }} />
              </span>
            </div>
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
};

export default MapCard;
