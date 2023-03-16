import React, { useContext } from "react";
import { Trash3 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Ctx from "../../Ctx";

function Comments ({author, text, created_at, id, _id})  {
   
    const { api, users, user, PATH, setMessage} = useContext(Ctx)

    const setName = (us, au) => {
        let nameAuthor = "";
            for (let i=0; i<us.length; i++) {
                if ( us[i]._id === au) { 
                    nameAuthor = us[i].name
                } else {}
            } 
        return nameAuthor;
    }
    const remove = (e) => {
        api.deleteComment(id, _id) 
            .then(res => res.json())
            .then(data => {
                if(!data.error) {
                  console.log(data)
                  setMessage(data);
                }
            })
    }

         
    return <>
        <hr></hr>
        {author && author === user._id ? 
        <Link to={PATH + "profile"}><h4>{setName(users, author)}</h4></Link> : 
        <h4>{setName(users, author)}</h4>}
        <div>{text}</div>
        <div>{new Date(created_at).toLocaleString()}</div>
        {author && author === user._id &&<button 
        className="button" 
        onClick={remove}
        > 
            <Trash3 />
        </button>}
    </>
}
export default Comments;