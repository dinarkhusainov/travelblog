import React, {useContext, useState, useEffect} from "react";
import "./index.css";
import Ctx from "../../Ctx";

function Card ({name, image, likes, title, text, _id}) {
    const {user, setFavorites, api, setGoods, setBasket, setVisibleGoods} = useContext(Ctx);
    const [like, setLike] = useState(likes && likes.includes(user._id));
    const [flag, setFlag] = useState(false);
    const update = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setFlag(true);
        setLike(!like); // false => true
        api.setLike(_id, like) // false
            .then(res => res.json())
            .then(data => {
                setFavorites(prev => {
                    let arr = prev.filter(el => el._id === _id);
                    return arr.length > 0 ? 
                        prev.filter(el => el._id !== _id) : 
                        [...prev, data]
                })
                setGoods(prev => prev.map(el => {
                    if (el._id === data._id) {
                        return data;
                    } else {
                        return el;
                    }
                }));
                setVisibleGoods(prev => prev.map(el => {
                    if (el._id === data._id) {
                        return data;
                    } else {
                        return el;
                    }
                }));
            })
    }

    const buy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setBasket(prev => {
            const test = prev.filter(el => el.id === _id)
            if (test.length) {
                return prev.map(el => {
                    if (el.id === _id) {
                        el.cnt++;
                    }
                    return el;
                })
            } else {
                return [...prev, {id: _id, cnt: 1}]
            }
        })
    }

    // useEffect(() => {
    //     console.log(like, flag);
    //     if (flag) {
    //         api.getProducts()
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             if (!data.error) {
    //                 setGoods(data.products);
    //             }
    //         })
    //     }
    // }, [like]) // true

    return <div className="card">
        <img src={image} alt={name} style={{height: "100px"}}/>
        {title}
        <p>{text}</p>
        {/* <button className="btn" onClick={buy}>Купить</button> */}
        <span className="card__heart" onClick={update}>
            {
                like 
                ? <i className="fa-solid fa-heart"></i>
                : <i className="fa-regular fa-heart"></i>
            }
        </span>
    </div>
}
export default Card