import React from "react";

export default ({author, text, created_at}) => {
   
    return <>
        <h3>{author || ""}</h3>
        <div>{text}</div>
        <div>{new Date(created_at).toLocaleString()}</div>
    </>
}