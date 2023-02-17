import React, {useContext} from "react";
import Card from "../components/Card/Card";
import {Link} from "react-router-dom";
import {EmojiFrown,ArrowLeftSquare} from "react-bootstrap-icons";
import Ctx from "../Ctx";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination/";

export default () => {
    const {favorites, PATH} = useContext(Ctx);
    const paginate = usePagination(favorites, 3);
    return <>
        {favorites.length > 0 
            ? <>
                    <div className="back" >
            <Link to={PATH + "posts"}>
                <button className="btn">
                    <ArrowLeftSquare style={{fontSize: "20px"}}/> Назад
                </button>
            </Link>
        </div>
                <h1>Любимые посты</h1>
                <Pagination hook={paginate}/>
                <div className="cards">
                    {paginate.setPageData().map((el, i) => <Link to={`/posts/${el._id}`} key={el._id}>
                        <Card key={"card_" + i} {...el}/>
                    </Link>)}
                </div>
            </>
            : <div className="empty-block">
                <EmojiFrown/>
                <p>Вы еще не добавили ни одного любимого товара</p>
                <Link to={PATH+"posts"} className="btn">Вcе посты</Link>
            </div>
        }
    </>
}