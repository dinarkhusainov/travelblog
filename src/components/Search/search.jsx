import React, {useState, useContext} from "react";
import "./search.css";
import {useNavigate} from "react-router-dom";
import {ReactComponent as SearchImg} from "./img/magnifying-glass-solid.svg";
import {ReactComponent as CloseImg} from "./img/circle-xmark-regular.svg";
import Ctx from "../../Ctx";

export default () => {
    // data => posts
    // searchPosts => setVisiblePosts
    const navigate = useNavigate();
    const {posts, setVisiblePosts, PATH} = useContext(Ctx);
    const [text, updateText] = useState("");
    const [searchData, setSearchData] = useState(posts);
    const clearSearch = () => {
        updateText("");
        setSearchData(posts);
        setVisiblePosts(posts);
    }
    const search = (e) => {
        navigate(PATH +"posts");
        updateText(e.target.value);
        let arr = posts.filter(el => el.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchData(arr);
        setVisiblePosts(arr);
    }
    return <div className="search-block">
        <input placeholder="Поиск..." value={text} onChange={search}/>
        <button>{text ? <CloseImg onClick={clearSearch}/> : <SearchImg/>}</button>
        {text && <div className="search-result">
            По запросу <b>{text}</b>&nbsp; 
            {searchData.length > 0 ? `найдено ${searchData.length} товаров` : "не найдено ни одного товара"}
        </div>}
    </div>
}