import React from "react";
import {useParams} from "react-router-dom";

export default () => {
    const {n, title} = useParams();
    return <>
        <h1>Fake page {n}</h1>
        <strong>{title}</strong>
    </>
}