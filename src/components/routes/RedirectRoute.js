import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectRoute = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 && navigate("/");

    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="d-flex justify-content0center align-items-center vh-100 ">
      Redirecting to login page {count} secs
    </div>
  );
};

export default RedirectRoute;
