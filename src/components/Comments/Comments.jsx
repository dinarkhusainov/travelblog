import React from "react";

function Comments ({author, text, created_at})  {
   
    return <>
        <h3>{author || ""}</h3>
        <div>{text}</div>
        <div>{new Date(created_at).toLocaleString()}</div>
    </>
}
export default Comments;