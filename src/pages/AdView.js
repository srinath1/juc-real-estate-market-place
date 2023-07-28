import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from "../components/misc/ImageGallery";
import Logo from "../logo.svg";
import { BsFillBackspaceReverseFill } from "react-icons/bs";
import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
import AdFeatures from "../components/cards/AdFeatures";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeUnlike from "../components/misc/LikeUnlike";
import MapCard from "../components/cards/MapCard";
import HTMLRenderer from "react-html-renderer";
import AdCard from "../components/cards/AdCard";
import ContactSeller from "../components/forms/ContactSeller";
dayjs.extend(relativeTime);

export default function AdView() {
  let newPrice = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });
  // state
  const [ad, setAd] = useState({});
  const [related, setRelated] = useState([]);
  // hooks
  const params = useParams();
  console.log("RAd", ad);

  useEffect(() => {
    if (params?.slug) fetchAd();
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      setAd(data?.ad);
      setRelated(data?.related);
    } catch (err) {
      console.log(err);
    }
  };

  const generatePhotosArray = (photos) => {
    if (photos?.length > 0) {
      const x = photos?.length === 1 ? 2 : 4;
      let arr = [];

      photos.map((p) =>
        arr.push({
          src: p.Location,
          width: x,
          height: x,
        })
      );
      return arr;
    } else {
      return [
        {
          src: Logo,
          width: 2,
          height: 1,
        },
      ];
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-lg-4">
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary disabled mt-2">
                {ad.type} for {ad.action}
              </button>
              <LikeUnlike ad={ad} />
            </div>
            <div className="mt-4 ">
              <h5 className="  w-30  h-10">
                {" "}
                {ad?.sold ? (
                  <>
                    <AiOutlineClose />
                    "Sold Out"
                  </>
                ) : (
                  <>
                    <span className="text-success">
                      <AiFillCheckCircle /> In Market
                    </span>
                  </>
                )}
              </h5>
              <h2>{ad.address}</h2>
              <AdFeatures ad={ad} />
              <h3 className="mt-4 h2 mb-2">
                Price:{newPrice.format(ad?.price)}
              </h3>
              <p className="text-muted">
                Posted :{dayjs(ad?.createdAt).fromNow()}
              </p>
            </div>
          </div>
          <div className="col-lg-8">
            <ImageGallery photos={generatePhotosArray(ad?.photos)} />
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <MapCard ad={ad} />
            <br />
            <h2>
              {ad?.type} in {ad?.address} for Sale at
              <span> Price:{newPrice.format(ad?.price)}</span>
            </h2>
            <AdFeatures ad={ad} />
            <h3 className="fw-bold">{ad?.title}</h3>
            <p className="lead">
              {
                <HTMLRenderer
                  html={ad?.description?.replaceAll(".", "<br/><br/>")}
                />
              }{" "}
            </p>
          </div>{" "}
        </div>
      </div>

      <div className="container">
        <ContactSeller ad={ad} />
      </div>
      <div className="container-fluid">
        <h4 className="d-flex justify-content-center mb-3">
          Related Properties
        </h4>

        <div className="row">
          {related?.map((ad) => (
            <AdCard key={ad._id} ad={ad} />
          ))}
        </div>
      </div>
    </>
  );
}
