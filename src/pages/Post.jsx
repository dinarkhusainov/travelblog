import React, { useState, useEffect, useContext } from "react";
import {useParams, Link, useNavigate, Navigate} from "react-router-dom";
import {Trash3, ArrowLeftSquareFill} from "react-bootstrap-icons";
import Comments from "../components/Comments/Comments";
import Ctx from "../Ctx";

export default function Post ({}) {
    const {id} = useParams();
    const [message, setMessage] = useState({});
    const {api, PATH, user, setPosts} = useContext(Ctx);
    const navigate = useNavigate();
    useEffect(() => {
        api.getPost(id)
            .then(res => res.json())
            .then(data => {
                setMessage(data);
            })
    }, []);
    const btnSt = {
        position: "absolute",
        right: "20px",
        top: "120px",
        cursor: "pointer",
        height: "auto"
    }
    const remove = () => {
        api.deletePost(id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    setPosts(prev => prev.filter(g => g._id !== data._id))
                    navigate(`${PATH}posts`);
                }
            })
    }
    return <>
        <div className="back" >
            <Link to={PATH + "posts"}><ArrowLeftSquareFill/> Назад</Link>
        </div>
        {message && message.author && message.author._id === user._id && <button 
            onClick={remove} 
            className="btn" 
            style={btnSt}
        >
            <Trash3/>
        </button>}
        <h1 style={{paddingTop:"1rem"}}>{message.title || "Пост"}</h1>
        {/* <p>Автор: {message.author.name}</p> */}
        <div className="post">
            <img
                src={message.image}
                alt="message"
            />
            <p>{message.text}</p>
        </div>
        <h2>Комментарии</h2>
        <div className="reviews">
            {message.comments && message.comments.length > 0 && message.comments.map((el, i) => <Comments {...el} key={i}/>)}
        </div>
    </>
}