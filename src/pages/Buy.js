import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";

const Buy = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [adsForSell, setAdsForSell] = useState();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads-for-sale");
      setAdsForSell(data.adsForSell);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <SearchForm />
      <h1 className="display-1 bg-primary text-light p-5">For Sale</h1>
      <div className="container">
        <div className="row">
          {adsForSell?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Buy;
