import React from "react";
import Ads from "../components/Ads/ads";
import {Link} from "react-router-dom";

export default ({data}) => {
    return <>
        <h1>Главная страница</h1>
        <Link to="/posts">Перейти к постам </Link>
        <Ads/>
    </>
}