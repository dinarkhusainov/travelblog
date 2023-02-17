import React from "react";
import { Link } from "react-router-dom";
import "./ads.css";
import pic1 from "../../assets/img/timeToTravel.png";
import pic2 from "../../assets/img/boatle.jpg";
import pic3 from "../../assets/img/palatka.jpg";
import pic4 from "../../assets/img/gory.jpg";
import pic5 from "../../assets/img/sea.jpg";

export default function Ads () {
    return <> 
    <div className="promo">
    <Link to="/posts"><img src={pic1} alt="Перейти к постам" /></Link>
    </div>
    <div className="promo">
        <iframe width="100%" height="500" 
            src="https://www.youtube.com/embed/hz6-zU3Ud4M" 
            title="YouTube video player"  
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;">
        </iframe>
    </div>
    <div className="promo">
        <iframe width="100%" height="500" 
            src="https://www.youtube.com/embed/oX4KcY0A9Nc" 
            title="YouTube video player"  
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; " >
        </iframe>
    </div>
    <div className="promo">
        <Link to={"/"}><img src={pic4} alt="Горы" /></Link>
    </div>
    <div className="promo">
        <Link to={"/"}><img src={pic5} alt="Пляж" /></Link>
    </div>
</>}