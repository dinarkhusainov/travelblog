import React, {useContext, useState, } from "react";
import "./card.css";
import Ctx from "../../Ctx";
import {BookmarkHeart,BookmarkHeartFill} from "react-bootstrap-icons"

function Card ({name, image, likes, title, text, _id}) {
    const {user, setFavorites, api, setPosts, setVisiblePosts} = useContext(Ctx);
    const [like, setLike] = useState(likes && likes.includes(user._id));
    const [flag, setFlag] = useState(false);
    const update = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setFlag(true);
        setLike(!like); // false => true
        api.setLikePost(_id, like) // false
            .then(res => res.json())
            .then(data => {
                setFavorites(prev => {
                    let arr = prev.filter(el => el._id === _id);
                    return arr.length > 0 ? 
                        prev.filter(el => el._id !== _id) : 
                        [...prev, data]
                })
                setPosts(prev => prev.map(el => {
                    if (el._id === data._id) {
                        return data;
                    } else {
                        return el;
                    }
                }));
                setVisiblePosts(prev => prev.map(el => {
                    if (el._id === data._id) {
                        return data;
                    } else {
                        return el;
                    }
                }));
            })
    }


    return <div className="card">
        <img  src={image} alt={name} />
        <h1>{title}</h1>
        <span className="card__heart" onClick={update}>
            {
                like 
                 ? <BookmarkHeartFill/>
                : <BookmarkHeart/>
            }
        </span>
    </div>
}
export default Card