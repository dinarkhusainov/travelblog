import React, { useState, useEffect, useContext } from "react";
import {useParams, Link, useNavigate, Navigate} from "react-router-dom";
import {Trash3} from "react-bootstrap-icons";
import Comments from "../components/Comments/Comments";
import Ctx from "../Ctx";

export default function Post ({}) {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    // По id товара получаются данные о товаре для отрисовки страницы с товаром
    const {api, PATH, user, setPosts} = useContext(Ctx);
    const navigate = useNavigate();
    useEffect(() => {
        api.getPost(id)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
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
        api.delProduct(id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    setPosts(prev => prev.filter(g => g._id !== data._id))
                    navigate(`${PATH}/posts`);
                }
            })
    }
    return <>
    <Link to={PATH + "posts"}>Назад</Link>
        {product && product.author && product.author._id === user._id && <button 
            onClick={remove} 
            className="btn" 
            style={btnSt}
        >
            <Trash3/>
        </button>}
        <h1>{product.title || "Страница товара"}</h1>
        <img
            className="product-block__image"
            src={product.image}
            alt="product"
        />
        <p>{product.text}</p>
        <h2>Комментарии</h2>
        <div className="reviews">
            {product.comments && product.comments.length > 0 && product.comments.map((el, i) => <Comments {...el} key={i}/>)}
        </div>
    </>
}