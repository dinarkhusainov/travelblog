import React from "react";
import { Link } from "react-router-dom";
import "./ads.css";
import pic1 from "../../assets/img/girl.jpg";
import pic2 from "../../assets/img/boatle.jpg";
import pic3 from "../../assets/img/palatka.jpg";
import pic4 from "../../assets/img/gory.jpg";
import pic5 from "../../assets/img/sea.jpg";

export default function Ads () {
    return <> <div className="promo">
        <img src={pic1} alt="Девушка и самолет" />
    </div>
    <div className="promo">
        <Link to={"/"}><img src={pic2} alt="Лодка" /></Link>
    </div>
    <div className="promo">
        <Link to={"/"}><img src={pic3} alt="Палатка" /></Link>
    </div>
    <div className="promo">
        <Link to={"/"}><img src={pic4} alt="Горы" /></Link>
    </div>
    <div className="promo">
        <Link to={"/"}><img src={pic5} alt="Пляж" /></Link>
    </div>
</>}