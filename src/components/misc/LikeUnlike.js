import React from "react";
import { useAuth } from "../../context/auth";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LikeUnlike = ({ ad }) => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLike = async (req, res) => {
    try {
      if (auth.user === null) {
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }
      const { data } = await axios.post("/wishlist", { adId: ad._id });
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      setAuth({ ...auth, user: data });
      toast.success("Added to wishlist");
    } catch (error) {}
  };

  const handleUnlike = async (req, res) => {
    try {
      if (auth.user === null) {
        navigate("/login");
        return;
      }
      const { data } = await axios.delete(`/wishlist/${ad._id}`);
      console.log("data", data);
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      setAuth({ ...auth, user: data });
      toast.success("Removed from wishlist");
    } catch (error) {}
  };
  return (
    <div>
      {auth.user?.wishlist?.includes(ad?._id) ? (
        <span>
          <FcLike className="h2 mt-3 pointer" onClick={handleUnlike} />
        </span>
      ) : (
        <span>
          <FcLikePlaceholder className="h2 mt-3 pointer" onClick={handleLike} />
        </span>
      )}
    </div>
  );
};

export default LikeUnlike;
