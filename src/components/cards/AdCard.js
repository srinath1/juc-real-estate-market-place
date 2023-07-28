import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "./AdFeatures";

export default function AdCard({ ad }) {
  //   function formatNumber(x) {
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   }
  let newPrice = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });
  console.log("Ad", ad);

  return (
    <div className="col-lg-4 p-4 ">
      <Link to={`/ad/${ad.slug}`}>
        <Badge.Ribbon
          text={`${ad?.type} for ${ad?.action === "Sell" ? "Sale" : "Rent"}`}
          color={`${ad?.action === "Sell" ? "blue" : "red"}`}
        >
          <div className="card hoverable shadow">
            <img
              src={ad?.photos?.[0].Location}
              alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
              style={{ height: "250px", objectFit: "cover" }}
            />

            <div className="card-body">
              <h3> {newPrice.format(ad?.price)}</h3>
              <p className="card-text">{ad?.address}</p>

              <AdFeatures ad={ad} />
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}
