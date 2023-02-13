import React from "react";
import {useParams} from "react-router-dom";

export default () => {
    const {n, title} = useParams();
    return <>
        <h1>Fake page {n}</h1>
        <strong>{title}</strong>
    </>
    // https://cats.petiteweb.dev/doc?name=cat&title=hello&id=2
}