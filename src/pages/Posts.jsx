import React, {useContext, useEffect, useState} from "react";
import Card from "../components/Card/Card";
import {Link} from "react-router-dom";
import {EmojiFrown, PlusCircle, SortAlphaDown, SortAlphaUp} from "react-bootstrap-icons";
import Ctx from "../Ctx";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

function Posts ({data})  {
    const {visiblePosts, user, PATH} = useContext(Ctx);
    const [sortPosts, setSortPosts] = useState(visiblePosts);
    const paginate = usePagination(sortPosts, 12);
    const [btnType, setBtnType] = useState("");
    let st = {
        display: "flex",
        gap: "10px"
    }
    
    const updSort = (e) => {
        let el = e.currentTarget;
        let flag = false;
        if (el.classList.contains("sort")) {
            el.classList.remove("sort");
            setBtnType("");
            flag = true;
        } else {
            el.classList.add("sort");
            setBtnType(el.title);
        }
        if (flag) {
            setSortPosts(visiblePosts);
        } else {
            
            let data = [...visiblePosts];
            
            switch (el.title) {
                case "down": 
                    data.sort((a,b) => a.title > b.title? -1 : 1 );
                    break;
                case "up": 
                    data.sort((a,b) => a.title > b.title ? 1 : -1);
                    break;
                case "new": 
                    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    break;
            }
            setSortPosts(data);
        }
    }
    useEffect(() => {
            setSortPosts(visiblePosts);
    }, [visiblePosts]); 
    return <>
        {user && <>
            {visiblePosts.length > 0 
                ? <>
                    <h1>Все посты</h1>
                    <div className="posts__top">
                        <div style={st}>
                            <button className={`btn ${btnType === "up" ? "sort" : ""}`} title="up" onClick={updSort}><SortAlphaDown/> А-Я</button>
                            <button className={`btn ${btnType === "down" ? "sort" : ""}`} title="down" onClick={updSort}><SortAlphaUp /> Я-А </button>
                            <button className={`btn ${btnType === "new" ? "sort" : ""}`} title="new" onClick={updSort}>Новинки</button>
                        </div>
                        {user && <Link to={PATH + "add"}><button className="btn"><PlusCircle style={{fontSize: "20px"}}/> Создать пост</button></Link>}
                    </div>
                    <Pagination hook={paginate}/>
                    <div className="cards">
                        {paginate.setPageData().map((el, i) => <Link to={`/posts/${el._id}`} key={el._id}>
                            <Card key={"card_" + i} {...el}/>
                        </Link>)}
                    </div>
                </>
                : <div className="empty-block">
                    <EmojiFrown/>
                    <p>Простите, по вашему запросу товаров не найдено</p>
                    <Link to={PATH} className="btn">На главную</Link>
                </div>
            }
        </>}
        {!user && 
            <div className="empty-block">
                <EmojiFrown/>
                <p>Простите, у вас нет доступа к товарам без авторизации</p>
                <Link to={PATH} className="btn">На главную</Link>
            </div>
            
        }
    </>
}
export default Posts;