import React, { useState, useEffect, useContext } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {Trash3, ArrowLeftSquare,PlusCircle} from "react-bootstrap-icons";
import Comments from "../components/Comments/Comments";
import Ctx from "../Ctx";

const Post = () => {
    const {id} = useParams();
    const {api, PATH, user, setPosts, message, setMessage} = useContext(Ctx);
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    
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
                if (!data.error) {
                    setPosts(prev => prev.filter(g => g._id !== data._id))
                    navigate(`${PATH}posts`);
                }
            })
    }

    const addComment = (e) => {
            e.preventDefault();
            api.addComment(id, {text:comment})
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                    setMessage(data);
                    setComment("")
                    }
                }
            )}

    return <>
        <div className="back" >
            <Link to={PATH + "posts"}>
                <button className="btn">
                    <ArrowLeftSquare style={{fontSize: "20px"}}/> Назад
                </button>
            </Link>
        </div>
        {message && message.author && message.author._id === user._id && <button 
            onClick={remove} 
            className="btn" 
            style={btnSt}
        >
            <Trash3/>
        </button>}
        <h1 style={{paddingTop:"1rem"}}>{message.title || "Пост"}</h1>
        <div className="post">
            <img
                src={message.image}
                alt="message"
            />
            {/* {message.author.name ? <p>{message.author.name}</p> : ""} */}
            <p>{message.text}</p>
        </div>
        <h2>Комментарии</h2>
        <div className="comments">
            {message.comments && message.comments.length > 0 && message.comments.map((el, i) => <Comments {...el} id={id} key={i}/>)}
        </div>
        <div className='comment__container'>
            <h2>Оставить комментарий</h2>
            <form onSubmit={addComment}>
                <textarea className='add__input' 
                    rows="4"
                    type="text" 
                    placeholder='Ваш комментарий'
                    required
                    value={comment}
                    onInput={e => setComment(e.target.value)}
                />
                 <button style={{border: "solid 1px"}} className="btn" type="submit">Добавить отзыв </button>
            </form>
        </div>
    </>
}
export default Post;